"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Block } from "@/data/memos";
import { blocksToHtml } from "@/lib/blocks-to-html";
import { serializeEditor } from "@/lib/serialize-editor";
import { FormatButton } from "./format-button";

type Format = "bold" | "heading" | "subheading" | "list";

const formats: { id: Format; label: string }[] = [
  { id: "bold", label: "B" },
  { id: "heading", label: "제목" },
  { id: "subheading", label: "소제목" },
  { id: "list", label: "목록" },
];

const noneActive: Record<Format, boolean> = {
  bold: false,
  heading: false,
  subheading: false,
  list: false,
};

type EditorProps = {
  initialBlocks?: Block[];
  onChange: (blocks: Block[]) => void;
};

export function Editor({ initialBlocks = [], onChange }: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  // 고쳐 쓸 때 처음 한 번만 기존 내용을 넣는다. 이후 편집 내용은 브라우저가 관리한다.
  const [initialHtml] = useState(() => blocksToHtml(initialBlocks));
  const [empty, setEmpty] = useState(initialBlocks.length === 0);
  const [active, setActive] = useState(noneActive);

  const syncActive = useCallback(() => {
    const anchor = document.getSelection()?.anchorNode;
    if (!anchor || !ref.current?.contains(anchor)) return;
    const block = document.queryCommandValue("formatBlock").toLowerCase();
    setActive({
      bold: document.queryCommandState("bold"),
      heading: block === "h2",
      subheading: block === "h3",
      list: document.queryCommandState("insertUnorderedList"),
    });
  }, []);

  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, "p");
    document.addEventListener("selectionchange", syncActive);
    return () => document.removeEventListener("selectionchange", syncActive);
  }, [syncActive]);

  const handleInput = () => {
    const element = ref.current;
    if (!element) return;
    setEmpty(!element.textContent?.trim() && !element.querySelector("li"));
    onChange(serializeEditor(element));
    syncActive();
  };

  const apply = (format: Format) => {
    ref.current?.focus();
    if (format === "bold") document.execCommand("bold");
    if (format === "list") document.execCommand("insertUnorderedList");
    if (format === "heading") {
      document.execCommand("formatBlock", false, active.heading ? "p" : "h2");
    }
    if (format === "subheading") {
      document.execCommand("formatBlock", false, active.subheading ? "p" : "h3");
    }
    handleInput();
  };

  return (
    <div className="flex flex-1 flex-col overflow-clip rounded-lg bg-surface-card focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/45">
      <div
        role="toolbar"
        aria-label="서식"
        className="flex h-[52px] shrink-0 items-center gap-space-4 px-space-12"
      >
        {formats.map(({ id, label }) => (
          <FormatButton
            key={id}
            label={label}
            active={active[id]}
            onClick={() => apply(id)}
          />
        ))}
      </div>
      <hr className="h-px shrink-0 border-0 bg-border-default" />
      <div className="relative flex-1 px-space-20 py-space-16">
        {empty && (
          <p
            aria-hidden
            className="pointer-events-none absolute text-body-md text-text-muted"
          >
            내용을 입력하세요
          </p>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: initialHtml }}
          role="textbox"
          aria-multiline
          aria-label="메모 내용"
          onInput={handleInput}
          onPaste={(event) => {
            event.preventDefault();
            document.execCommand(
              "insertText",
              false,
              event.clipboardData.getData("text/plain"),
            );
          }}
          className="memo-editor min-h-[160px] outline-none"
        />
      </div>
    </div>
  );
}
