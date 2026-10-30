import Link from "next/link";
import type { Memo } from "@/data/memos";
import { labelStyles } from "@/lib/label-styles";
import { Icon } from "./icon";

type MemoItemProps = Pick<Memo, "id" | "title" | "preview" | "date" | "label">;

export function MemoItem({ id, title, preview, date, label }: MemoItemProps) {
  return (
    <Link
      href={`/memos/${id}`}
      className="flex h-[72px] w-full items-center gap-space-16 px-space-20 py-space-12 transition-transform active:scale-[0.98] motion-reduce:transition-none"
    >
      <span
        className={`flex size-[44px] shrink-0 items-center justify-center rounded-sm ${labelStyles[label].soft}`}
      >
        <Icon name="note" size={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-space-4">
        <span className="text-title-md text-text-primary">{title}</span>
        <span className="truncate text-body-sm text-text-secondary">{preview}</span>
      </span>
      <span className="shrink-0 text-caption-sm whitespace-nowrap text-text-muted">
        {date}
      </span>
    </Link>
  );
}
