// eslint-plugin-cn-classname/index.js
"use strict";

/**
 * Группирует классы Tailwind по mental model (как у prettier-plugin-tailwindcss)
 * в аргументы вызова cn()/clsx(), и следит, чтобы классы не «забредали»
 * в чужие группы. Поддерживает:
 *  - Преобразование длинной строки в cn("…","…",…)
 *  - Реформатирование уже существующих cn(...)/clsx(...) (перекладывает классы)
 *
 * Опции:
 * {
 *   functionName: "cn",              // во что конвертировать строковые className
 *   importSource: "@/lib/cn",        // откуда импортировать functionName при конверсии
 *   minClasses: 8,                   // с какого количества классов запускать группировку
 *   tailwindFunctions: ["cn","clsx"] // функции, внутри которых следует проверять/править
 * }
 */

const DEFAULTS = {
  functionName: "cn",
  importSource: "@/lib/cn",
  minClasses: 8,
  tailwindFunctions: ["cn", "clsx"],
};

// Детектор модификаторов и брейкпоинтов
const RX = {
  responsive: /^(sm|md|lg|xl|2xl):/,
  variant:
    /^(hover|focus|focus-visible|active|visited|disabled|checked|open|closed|first|last|only|odd|even|first-of-type|last-of-type|placeholder-shown|autofill|required|invalid|in-range|out-of-range|read-only|empty|enabled|loading|current|motion-safe|motion-reduce|portrait|landscape|rtl|ltr|dark|aria-[^:]+|data-[^:]+|group(-[^:]+)?:|peer(-[^:]+)?:)/,
};

// Порядок групп (укрупнённые разделы Tailwind/Prettier)
const GROUPS = [
  {
    key: "positioning",
    tests: [
      /^(static|fixed|absolute|relative|sticky|inset|top-|right-|bottom-|left-|z-)/,
    ],
  },
  {
    key: "layout",
    tests: [
      /^(container|box-|block|inline|flow-root|float-|clear-|isolation|object-|overflow-|overscroll-)/,
      /^(display|table$)/,
    ],
  },
  {
    key: "flexGridAlign",
    tests: [
      /^(flex$|inline-flex$|grid$|inline-grid$)/,
      /^(flex-|grid-|col-|row-|place-|content-|items-|justify-|gap-|order-)/,
    ],
  },
  {
    key: "spacing",
    tests: [/^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|space-[xy]-)/],
  },
  { key: "sizing", tests: [/^(w-|h-|size-|min-|max-|aspect-)/] },
  {
    key: "typography",
    tests: [
      /^(font-|text-|tracking-|leading-|list-|placeholder-|align-|whitespace|break-|hyphens|tabular-nums|ordinal|slashed-zero)/,
    ],
  },
  { key: "backgrounds", tests: [/^(bg-|from-|via-|to-)/] },
  { key: "borders", tests: [/^(border-|rounded-|divide-|outline-|ring-)/] },
  { key: "effects", tests: [/^(shadow|opacity)/] },
  {
    key: "filters",
    tests: [
      /^(blur-|brightness-|contrast-|drop-shadow-|grayscale|hue-rotate|invert|saturate|sepia|backdrop-)/,
    ],
  },
  { key: "tables", tests: [/^(table-|caption-)/] },
  {
    key: "transforms",
    tests: [/^(transform$|scale-|rotate-|translate-|skew-|origin-)/],
  },
  {
    key: "transitions",
    tests: [/^(transition|duration-|delay-|ease-|animate-)/],
  },
  {
    key: "interactivity",
    tests: [
      /^(appearance-|cursor-|caret-|pointer-events|resize|scroll-|snap-|touch-|select-|will-change)/,
    ],
  },
  { key: "svg", tests: [/^(fill-|stroke-)/] },
  { key: "accessibility", tests: [/^(sr-only|not-sr-only|aria-)/] },
];

// базовая часть класса после последнего ':'
const base = (cls) => {
  const i = cls.lastIndexOf(":");
  return i >= 0 ? cls.slice(i + 1) : cls;
};

// распределяем классы по корзинам и формируем строки-аргументы
function bucketize(all) {
  const plain = [];
  const variants = [];
  const responsive = { sm: [], md: [], lg: [], xl: [], "2xl": [] };

  for (const c of all) {
    if (RX.responsive.test(c)) {
      const bp = c.split(":")[0];
      (responsive[bp] || (responsive[bp] = [])).push(c);
    } else if (RX.variant.test(c)) {
      variants.push(c);
    } else {
      plain.push(c);
    }
  }

  const gmap = new Map(GROUPS.map((g) => [g.key, []]));
  const misc = [];
  for (const c of plain) {
    const b = base(c);
    const g = GROUPS.find((G) => G.tests.some((rx) => rx.test(b)));
    (g ? gmap.get(g.key) : misc).push(c);
  }

  const lines = [];
  for (const g of GROUPS) {
    const items = gmap.get(g.key) || [];
    if (items.length) lines.push(items.join(" "));
  }
  if (misc.length) lines.push(misc.join(" "));
  if (variants.length) lines.push(variants.join(" "));
  for (const bp of ["sm", "md", "lg", "xl", "2xl"]) {
    if (responsive[bp].length) lines.push(responsive[bp].join(" "));
  }

  return lines;
}

// --- утилиты AST/текста ---

function getClassTextFromAttribute(attr) {
  const v = attr.value;
  if (!v) return null;
  if (v.type === "Literal" && typeof v.value === "string") return v.value;
  if (
    v.type === "JSXExpressionContainer" &&
    v.expression.type === "Literal" &&
    typeof v.expression.value === "string"
  )
    return v.expression.value;
  if (
    v.type === "JSXExpressionContainer" &&
    v.expression.type === "TemplateLiteral" &&
    v.expression.expressions.length === 0
  ) {
    return v.expression.quasis.map((q) => q.value.cooked).join("");
  }
  return null;
}

function isCallToAllowedFn(expr, fns) {
  return (
    expr &&
    expr.type === "CallExpression" &&
    expr.callee.type === "Identifier" &&
    fns.includes(expr.callee.name)
  );
}

function uniqueStable(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

function extractFromCall(expr, sourceCode) {
  // Собираем все строковые аргументы (Literal, TemplateLiteral без выражений)
  const stringParts = [];
  const otherArgs = [];
  for (const a of expr.arguments) {
    if (a.type === "Literal" && typeof a.value === "string") {
      stringParts.push(a.value);
    } else if (a.type === "TemplateLiteral" && a.expressions.length === 0) {
      stringParts.push(a.quasis.map((q) => q.value.cooked).join(""));
    } else {
      otherArgs.push(sourceCode.getText(a));
    }
  }
  const classes = stringParts
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const deduped = uniqueStable(classes);
  return { classes: deduped, otherArgs, callee: expr.callee.name };
}

function hasImport(sourceCode, fn, from) {
  const body = sourceCode.ast.body || [];
  return body.some(
    (n) =>
      n.type === "ImportDeclaration" &&
      n.source.value === from &&
      n.specifiers.some(
        (s) => s.type === "ImportSpecifier" && s.imported.name === fn,
      ),
  );
}

function firstNode(sourceCode) {
  const b = sourceCode.ast.body || [];
  return b[0] || null;
}

export default {
  rules: {
    "prefer-cn": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Group Tailwind classes into cn(...)/clsx(...) by Tailwind/Prettier mental model and fix misplaced classes",
        },
        fixable: "code",
        schema: [
          {
            type: "object",
            properties: {
              functionName: { type: "string" },
              importSource: { type: "string" },
              minClasses: { type: "number" },
              tailwindFunctions: {
                type: "array",
                items: { type: "string" },
                uniqueItems: true,
              },
            },
            additionalProperties: false,
          },
        ],
        messages: {
          toCn: "Convert long className into grouped cn(...).",
          regroup: "Regroup Tailwind classes to the correct groups.",
        },
      },

      create(context) {
        const opts = { ...DEFAULTS, ...(context.options?.[0] || {}) };

        return {
          JSXAttribute(node) {
            if (node.name?.name !== "className") return;

            const source = context.getSourceCode();

            // a) Уже вызов cn/clsx — валидируем и фиксируем
            if (
              node.value?.type === "JSXExpressionContainer" &&
              isCallToAllowedFn(node.value.expression, opts.tailwindFunctions)
            ) {
              const expr = node.value.expression;
              const { classes, otherArgs, callee } = extractFromCall(
                expr,
                source,
              );
              if (classes.length < opts.minClasses) return;

              const desiredLines = bucketize(classes);
              const desiredStrings = desiredLines; // массив строк "… …"

              // Текущие строковые аргументы из AST
              const currentStrings = expr.arguments
                .filter(
                  (a) => a.type === "Literal" && typeof a.value === "string",
                )
                .map((a) => a.value.trim());

              const needFix =
                desiredStrings.length !== currentStrings.length ||
                desiredStrings.some((s, i) => s !== currentStrings[i]);

              if (needFix) {
                const stringArgs = desiredStrings.map((s) => `"${s}"`);
                const newArgs = [...stringArgs, ...otherArgs].join(", ");
                const newCall = `${callee}(${newArgs})`;

                context.report({
                  node: node.value, // подсветим всё значение
                  messageId: "regroup",
                  fix: (fixer) => fixer.replaceText(node.value, `{${newCall}}`),
                });
              }

              return;
            }

            // b) Простая строка — конвертируем в cn(...)
            const txt = getClassTextFromAttribute(node);
            if (!txt) return;

            const list = txt.trim().split(/\s+/).filter(Boolean);
            const deduped = uniqueStable(list);
            if (deduped.length < opts.minClasses) return;

            const lines = bucketize(deduped);
            const args = lines.map((s) => `"${s}"`).join(", ");
            const replacement = `{${opts.functionName}(${args})}`;

            context.report({
              node,
              messageId: "toCn",
              fix: (fixer) => {
                const fixes = [fixer.replaceText(node.value, replacement)];

                if (!hasImport(source, opts.functionName, opts.importSource)) {
                  const importLine = `import { ${opts.functionName} } from "${opts.importSource}";\n`;
                  const first = firstNode(source);
                  fixes.push(
                    first
                      ? fixer.insertTextBefore(first, importLine)
                      : fixer.insertTextBeforeRange([0, 0], importLine),
                  );
                }
                return fixes;
              },
            });
          },

          // Новое: поддержка стилей внутри объектных литералов, например const styles = { main: clsx("...") }
          Property(node) {
            // Интересуют только простые значения-свойства вида key: <value>
            const val = node.value;
            if (!val) return;

            const source = context.getSourceCode();

            // a) Значение — вызов cn/clsx(...): проверяем и при необходимости перегруппируем
            if (isCallToAllowedFn(val, opts.tailwindFunctions)) {
              const { classes, otherArgs, callee } = extractFromCall(val, source);
              if (classes.length < opts.minClasses) return;

              const desiredStrings = bucketize(classes);

              // Текущие строковые аргументы
              const currentStrings = val.arguments
                .filter((a) => a.type === "Literal" && typeof a.value === "string")
                .map((a) => a.value.trim());

              const needFix =
                desiredStrings.length !== currentStrings.length ||
                desiredStrings.some((s, i) => s !== currentStrings[i]);

              if (needFix) {
                const stringArgs = desiredStrings.map((s) => `"${s}"`);
                const newArgs = [...stringArgs, ...otherArgs].join(", ");
                const newCall = `${callee}(${newArgs})`;

                context.report({
                  node: val,
                  messageId: "regroup",
                  fix: (fixer) => fixer.replaceText(val, newCall),
                });
              }
            }

            // b) При желании можно конвертировать длинные строки в cn(...), но чтобы вне JSX не навязывать импорт,
            //    оставляем как есть для минимальности изменения поведения
          },
        };
      },
    },
  },
};
