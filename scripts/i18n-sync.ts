import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import OpenAI from "openai";

type JSONValue = string | number | boolean | null | JSONObject;
interface JSONObject {
  [k: string]: JSONValue;
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ROOT = process.cwd();
const LOCALES_DIR = path.join(ROOT, "i18n");
const HASHES_DIR = path.join(LOCALES_DIR, "hashes");

const EN_PATH = path.join(LOCALES_DIR, "en.json");
const RU_PATH = path.join(LOCALES_DIR, "ru.json");
const ES_PATH = path.join(LOCALES_DIR, "es.json");
const EN_HASHES_PATH = path.join(HASHES_DIR, "en.hashes.json");

function readJSON<T = any>(p: string, fallback: T): T {
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function writeJSON(p: string, data: any) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function sha256(s: string) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

// --- простая "плоская" проекция: только объекты, без массивов ---
function flatten(obj: JSONObject, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v as JSONObject, key));
    } else if (typeof v === "string") {
      out[key] = v;
    }
  }
  return out;
}

function unflatten(flat: Record<string, string>): JSONObject {
  const root: JSONObject = {};
  for (const [p, val] of Object.entries(flat)) {
    const parts = p.split(".");
    let cur: any = root;
    parts.forEach((part, i) => {
      const last = i === parts.length - 1;
      if (last) {
        cur[part] = val;
      } else {
        if (!cur[part] || typeof cur[part] !== "object") cur[part] = {};
        cur = cur[part];
      }
    });
  }
  return root;
}

// простой перевод одной строки
async function translate(text: string, targetLang: "Russian" | "Spanish") {
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are a concise UI localizer. Output ONLY the translation, no quotes. Keep placeholders (e.g., {name}).",
      },
      { role: "user", content: `Translate to ${targetLang}:\n${text}` },
    ],
  });
  let out = resp.choices[0]?.message?.content?.trim() ?? "";
  if (
    (out.startsWith('"') && out.endsWith('"')) ||
    (out.startsWith("“") && out.endsWith("”"))
  ) {
    out = out.slice(1, -1);
  }
  return out;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    process.exit(1);
  }

  const enTree = readJSON<JSONObject>(EN_PATH, {});
  const ruTree = readJSON<JSONObject>(RU_PATH, {});
  const esTree = readJSON<JSONObject>(ES_PATH, {});
  const enFlat = flatten(enTree);
  const ruFlat = flatten(ruTree);
  const esFlat = flatten(esTree);

  // структура хэшей максимально простая:
  // { [keyPath]: { key_hash, text_hash } }
  const hashes = readJSON<
    Record<string, { key_hash: string; text_hash: string }>
  >(EN_HASHES_PATH, {});

  let changed = false;

  for (const [key, enText] of Object.entries(enFlat)) {
    const text_hash = sha256(enText);
    const key_hash = sha256(key);
    const prev = hashes[key];

    const textChanged = !prev || prev.text_hash !== text_hash;
    if (!prev) {
      hashes[key] = { key_hash, text_hash };
    } else if (textChanged) {
      hashes[key] = { key_hash, text_hash };
    }

    // RU
    if (ruFlat[key] === undefined || textChanged) {
      ruFlat[key] = await translate(enText, "Russian");
      changed = true;
    }
    // ES
    if (esFlat[key] === undefined || textChanged) {
      esFlat[key] = await translate(enText, "Spanish");
      changed = true;
    }
  }

  if (changed) {
    writeJSON(RU_PATH, unflatten(ruFlat));
    writeJSON(ES_PATH, unflatten(esFlat));
  }
  // Хэши всегда синхронизируем с en.json
  writeJSON(EN_HASHES_PATH, hashes);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
