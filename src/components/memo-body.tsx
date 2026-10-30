import type { Block, Inline } from "@/data/memos";

function renderInline(content: Inline[]) {
  return content.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <strong key={index} className="font-bold text-text-primary">
        {part.bold}
      </strong>
    ),
  );
}

export function MemoBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-space-12">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="text-title-lg text-text-primary">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={index} className="text-title-md text-text-primary">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="whitespace-pre-line text-body-md text-text-secondary">
                {renderInline(block.content)}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-space-4">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-space-8 text-body-md text-text-secondary"
                  >
                    <span aria-hidden>•</span>
                    <span className="min-w-0 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
