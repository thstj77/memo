"use client";

import { useState } from "react";
import type { Memo } from "@/data/memos";
import { CardHeader } from "./card-header";
import { Chip } from "./chip";
import { Fab } from "./fab";
import { Glow } from "./glow";
import { MemoItem } from "./memo-item";
import { ScreenShell } from "./screen-shell";

const filters = ["전체", "업무", "개인", "아이디어"] as const;

type MemoCardProps = {
  memos: Memo[];
  title: string;
  pin?: boolean;
  action?: boolean;
};

function MemoCard({ memos, title, pin, action }: MemoCardProps) {
  if (memos.length === 0) return null;
  return (
    <section className="relative flex flex-col rounded-xl border border-surface-card bg-surface-card py-space-8 shadow-glass backdrop-blur-glass">
      <CardHeader title={title} pin={pin} action={action} />
      {memos.map((memo) => (
        <MemoItem key={memo.id} {...memo} />
      ))}
    </section>
  );
}

export function HomeScreen({ memos }: { memos: Memo[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("전체");
  const visible = memos.filter(
    (memo) => filter === "전체" || memo.category === filter,
  );

  return (
    <ScreenShell className="pt-space-64">
      <main className="relative flex flex-1 flex-col gap-space-16">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-muted">11월 1일</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">{memos.length}개</span> 남겼어요
          </h1>
        </header>
        <div className="flex gap-space-8 overflow-x-auto px-space-4">
          {filters.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={filter === name}
              onClick={() => setFilter(name)}
            />
          ))}
        </div>
        <div className="relative flex flex-col gap-space-16">
          <Glow />
          <MemoCard title="고정한 메모" pin memos={visible.filter((memo) => memo.pinned)} />
          <MemoCard title="최근 메모" action memos={visible.filter((memo) => !memo.pinned)} />
        </div>
      </main>
      <div className="pointer-events-none sticky bottom-[0px] flex justify-end pb-space-34 pt-space-8">
        <div className="pointer-events-auto">
          <Fab label="새 메모 쓰기" href="/write" />
        </div>
      </div>
    </ScreenShell>
  );
}
