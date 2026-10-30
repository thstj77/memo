import type { Memo } from "@/data/memos";
import { Badge } from "./badge";
import { ButtonPrimary } from "./button-primary";
import { Glow } from "./glow";
import { IconButton } from "./icon-button";
import { MemoBody } from "./memo-body";
import { ScreenShell } from "./screen-shell";

export function DetailScreen({ memo }: { memo: Memo }) {
  return (
    <ScreenShell className="pt-space-48">
      <nav className="relative flex animate-fade-in items-center justify-between motion-reduce:animate-none">
        <IconButton icon="chevron-left" label="뒤로가기" href="/" />
        <div className="flex items-center gap-space-8">
          <IconButton icon="pin-24" label="고정" />
          <IconButton icon="share" label="공유" />
          <IconButton icon="more" label="더보기" />
        </div>
      </nav>
      <main className="flex flex-1 flex-col">
        <div className="relative">
          <Glow
            color={memo.label}
            className="animate-fade-in [animation-delay:150ms] motion-reduce:animate-none"
          />
          <article className="relative flex animate-rise-in motion-reduce:animate-none flex-col gap-space-12 rounded-xl border border-surface-card bg-surface-card px-space-20 py-space-24 shadow-glass backdrop-blur-glass">
            <div className="flex items-center gap-space-8">
              <Badge label={memo.category} color={memo.label} />
              <p className="text-caption-sm whitespace-nowrap text-text-muted">
                {memo.createdAt}
              </p>
            </div>
            <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
            <hr className="h-px border-0 bg-border-default" />
            <MemoBody blocks={memo.body} />
            <p className="text-caption-sm text-text-muted">{memo.updatedAt} 수정</p>
          </article>
        </div>
      </main>
      <div className="sticky bottom-[0px] animate-rise-in pb-space-34 pt-space-8 [animation-delay:100ms] motion-reduce:animate-none">
        <ButtonPrimary label="수정하기" href={`/memos/${memo.id}/edit`} />
      </div>
    </ScreenShell>
  );
}
