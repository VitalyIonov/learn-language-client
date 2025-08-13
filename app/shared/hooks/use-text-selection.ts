import { useEffect, useState } from "react";

type TextSelection = {
  selectedText: string;
  position: { x: number; y: number } | null;
};

export function useTextSelection(): TextSelection {
  const [selection, setSelection] = useState<TextSelection>({
    selectedText: "",
    position: null,
  });

  useEffect(() => {
    const handler = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();

      if (text && sel?.rangeCount) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelection({
          selectedText: text,
          position: {
            x: rect.right + window.scrollX,
            y: rect.bottom + window.scrollY + 20,
          },
        });
      } else {
        setSelection({ selectedText: "", position: null });
      }
    };

    document.addEventListener("mouseup", handler);
    document.addEventListener("touchend", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
      document.removeEventListener("touchend", handler);
    };
  }, []);

  return selection;
}
