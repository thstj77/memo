import type { Block, Inline } from "@/data/memos";

// 편집 칸(contenteditable)의 내용을 저장용 블록으로 바꾼다.
function inlineOf(node: Node, bold: boolean, out: Inline[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (text) out.push(bold ? { bold: text } : text);
    return;
  }
  if (!(node instanceof HTMLElement)) return;
  if (node.tagName === "BR") {
    out.push("\n");
    return;
  }
  const isBold = bold || node.tagName === "B" || node.tagName === "STRONG";
  node.childNodes.forEach((child) => inlineOf(child, isBold, out));
}

function trimInline(parts: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const part of parts) {
    const last = merged[merged.length - 1];
    if (typeof part === "string" && typeof last === "string") {
      merged[merged.length - 1] = last + part;
    } else if (typeof part !== "string" && last && typeof last !== "string") {
      merged[merged.length - 1] = { bold: last.bold + part.bold };
    } else {
      merged.push(part);
    }
  }
  const text = merged
    .map((part) => (typeof part === "string" ? part : part.bold))
    .join("");
  return text.trim() ? merged : [];
}

const BLOCK_SELECTOR = "ul, ol, h1, h2, h3, h4, p, div";

// 브라우저는 목록을 <p> 안에 넣기도 하므로, 블록이 든 요소는 안으로 들어가 나눠 읽는다.
function collect(parent: Node, blocks: Block[]) {
  let inline: Node[] = [];
  const flush = () => {
    const parts: Inline[] = [];
    inline.forEach((node) => inlineOf(node, false, parts));
    const content = trimInline(parts);
    if (content.length > 0) blocks.push({ type: "paragraph", content });
    inline = [];
  };

  parent.childNodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      const text = node.textContent?.trim() ?? "";
      switch (node.tagName) {
        case "H1":
        case "H2":
          flush();
          if (text) blocks.push({ type: "heading", text });
          return;
        case "H3":
        case "H4":
          flush();
          if (text) blocks.push({ type: "subheading", text });
          return;
        case "UL":
        case "OL": {
          flush();
          const items = Array.from(node.querySelectorAll("li"))
            .map((li) => li.textContent?.trim() ?? "")
            .filter(Boolean);
          if (items.length > 0) blocks.push({ type: "list", items });
          return;
        }
      }
      if (node.querySelector(BLOCK_SELECTOR)) {
        flush();
        collect(node, blocks);
        return;
      }
      if (node.tagName === "P" || node.tagName === "DIV") {
        flush();
        inline = [node];
        flush();
        return;
      }
    }
    inline.push(node);
  });
  flush();
}

export function serializeEditor(root: HTMLElement): Block[] {
  const blocks: Block[] = [];
  collect(root, blocks);
  return blocks;
}
