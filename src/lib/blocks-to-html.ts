import type { Block, Inline } from "@/data/memos";

// 저장된 블록을 편집 칸(contenteditable)에 넣을 HTML로 바꾼다. serialize-editor.ts의 반대 방향이다.
function escape(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function inline(parts: Inline[]) {
  return parts
    .map((part) =>
      typeof part === "string" ? escape(part) : `<b>${escape(part.bold)}</b>`,
    )
    .join("");
}

export function blocksToHtml(blocks: Block[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `<h2>${escape(block.text)}</h2>`;
        case "subheading":
          return `<h3>${escape(block.text)}</h3>`;
        case "paragraph":
          return `<p>${inline(block.content)}</p>`;
        case "list":
          return `<ul>${block.items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
      }
    })
    .join("");
}
