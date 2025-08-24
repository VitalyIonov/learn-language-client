// eslint-plugin-cn-classname/index.js
"use strict";

/**
 * Группирует className в cn("…", "…", …) по тем же крупным разделам,
 * которые использует prettier-plugin-tailwindcss (mental model):
 * Positioning → Layout → Flex/Grid/Box Alignment → Spacing → Sizing →
 * Typography → Backgrounds → Borders → Effects → Filters → Tables →
 * Transforms → Transitions & Animation → Interactivity → SVG → Accessibility
 *
 * Затем отдельные корзины:
 * - variants (hover:/focus:/active:/disabled:/dark:/aria:/data:/group-/peer-…)
 * - responsive (sm:/md:/lg:/xl:/2xl:) — в порядке от меньшего к большему.
 *
 * Дальше Prettier (с плагином) отсортирует КАЖДЫЙ аргумент cn() внутри.
 */

const DEFAULTS = {
  functionName: "cn",
  importSource: "@/lib/cn",
  minClasses: 8,
};

// Детектор модификаторов и брейкпоинтов
const RX = {
  responsive: /^(sm|md|lg|xl|2xl):/,
  variant:
    /^(hover|focus|focus-visible|active|visited|disabled|checked|open|closed|first|last|only|odd|even|first-of-type|last-of-type|placeholder-shown|autofill|required|invalid|in-range|out-of-range|read-only|empty|enabled|loading|current|motion-safe|motion-reduce|portrait|landscape|rtl|ltr|dark|aria-[^:]+|data-[^:]+|group(-[^:]+)?:|peer(-[^:]+)?:)/,
};

// Порядок групп (соответствует «высокоуровневым» разделам Tailwind/Prettier)
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
      /^(flex$|grid$)/,
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

// вспомогательное — «базовая часть» после последнего :
const base = (cls) => {
  const i = cls.lastIndexOf(":");
  return i >= 0 ? cls.slice(i + 1) : cls;
};

function bucketize(all) {
  const plain = [];
  const variants = [];
  const responsive = { sm: [], md: [], lg: [], xl: [], "2xl": [] };

  for (const c of all) {
    if (RX.responsive.test(c)) {
      const bp = c.split(":")[0]; // sm/md/…
      responsive[bp]?.push(c);
    } else if (RX.variant.test(c)) {
      variants.push(c);
    } else {
      plain.push(c);
    }
  }

  // сначала раскладываем plain по «точным» группам в нужном порядке
  const gmap = new Map(GROUPS.map((g) => [g.key, []]));
  const misc = [];
  for (const c of plain) {
    const b = base(c);
    const g = GROUPS.find((G) => G.tests.some((rx) => rx.test(b)));
    (g ? gmap.get(g.key) : misc).push(c);
  }
  const orderedPlain = [
    ...GROUPS.flatMap((g) => gmap.get(g.key) || []),
    ...misc,
  ];

  // затем просто добавляем корзину variants и потом responsive (по порядку bp)
  const ordered = [
    ...orderedPlain,
    ...variants,
    ...responsive.sm,
    ...responsive.md,
    ...responsive.lg,
    ...responsive.xl,
    ...responsive["2xl"],
  ];

  // теперь порежем на строки: одна строка = одна «верхнеуровневая» группа/корзина
  const lines = [];
  // 1) plain-группы
  for (const g of GROUPS) {
    const items = gmap.get(g.key) || [];
    if (items.length) lines.push(items.join(" "));
  }
  if (misc.length) lines.push(misc.join(" "));
  // 2) variants одной строкой
  if (variants.length) lines.push(variants.join(" "));
  // 3) responsive — одна строка на каждый bp, если есть
  for (const bp of ["sm", "md", "lg", "xl", "2xl"]) {
    if (responsive[bp].length) lines.push(responsive[bp].join(" "));
  }

  return { lines, ordered }; // ordered не используется для вывода, но оставлено на будущее
}

function getClassText(attr) {
  const v = attr.value;
  if (!v) return null;
  if (v.type === "Literal" && typeof v.value === "string") return v.value;
  if (v.type === "JSXExpressionContainer" && v.expression.type === "Literal")
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

function isAlreadyCn(attr, fn) {
  return (
    attr.value &&
    attr.value.type === "JSXExpressionContainer" &&
    attr.value.expression.type === "CallExpression" &&
    attr.value.expression.callee.type === "Identifier" &&
    attr.value.expression.callee.name === fn
  );
}

function hasCnImport(sourceCode, fn, from) {
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

module.exports = {
  rules: {
    "prefer-cn": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Group Tailwind classes into cn(...) by Tailwind/Prettier mental model",
        },
        fixable: "code",
        schema: [
          {
            type: "object",
            properties: {
              functionName: { type: "string" },
              importSource: { type: "string" },
              minClasses: { type: "number" },
            },
            additionalProperties: false,
          },
        ],
        messages: { toCn: "Convert long className into grouped cn(...)." },
      },
      create(context) {
        const opts = { ...DEFAULTS, ...(context.options?.[0] || {}) };
        return {
          JSXAttribute(node) {
            if (
              node.name?.name !== "className" ||
              isAlreadyCn(node, opts.functionName)
            )
              return;

            const txt = getClassText(node);
            if (!txt) return;

            const list = txt.trim().split(/\s+/).filter(Boolean);
            if (list.length < opts.minClasses) return;

            context.report({
              node,
              messageId: "toCn",
              fix: (fixer) => {
                const { lines } = bucketize(list);
                const args = lines.map((s) => `"${s}"`).join(", ");
                const replacement = `{${opts.functionName}(${args})}`;

                const source = context.getSourceCode();
                const fixes = [fixer.replaceText(node.value, replacement)];

                if (
                  !hasCnImport(source, opts.functionName, opts.importSource)
                ) {
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
        };
      },
    },
  },
};
