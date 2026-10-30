"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Block, Category, Memo, MemoLabel } from "@/data/memos";
import { labelOrder, labelStyles } from "@/lib/label-styles";
import { saveMemo, updateMemo } from "@/app/actions";
import { ButtonPrimary } from "./button-primary";
import { Chip } from "./chip";
import { Editor } from "./editor";
import { IconButton } from "./icon-button";
import { ScreenShell } from "./screen-shell";

const categories: Category[] = ["업무", "개인", "아이디어"];

type WriteScreenProps = {
  // 있으면 이 메모를 고쳐 쓰는 화면이 된다.
  initial?: Memo;
};

export function WriteScreen({ initial }: WriteScreenProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "업무");
  const [label, setLabel] = useState<MemoLabel>(initial?.label ?? "blue");
  const [body, setBody] = useState<Block[]>(initial?.body ?? []);

  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (saving) return;
    setSaving(true);
    const memo = { title: title.trim(), category, label, body };
    try {
      if (initial) {
        await updateMemo(initial.id, memo);
        router.replace(`/memos/${initial.id}`);
      } else {
        await saveMemo(memo);
        router.push("/");
      }
    } catch {
      setSaving(false);
    }
  };

  return (
    <ScreenShell className="pt-space-48">
      <nav className="flex items-center justify-between">
        <IconButton
          icon="chevron-left"
          label="뒤로가기"
          href={initial ? `/memos/${initial.id}` : "/"}
          plain
        />
      </nav>
      <main className="flex flex-1 flex-col gap-space-12">
        <label className="flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/45">
          <span className="text-caption-sm text-text-muted">제목</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요"
            className="bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
          />
        </label>
        <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm whitespace-nowrap text-text-muted">분류</span>
            {categories.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={category === name}
                soft
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm whitespace-nowrap text-text-muted">색</span>
            {labelOrder.map((id) => (
              <button
                key={id}
                type="button"
                aria-label={labelStyles[id].name}
                aria-pressed={label === id}
                onClick={() => setLabel(id)}
                className={`flex size-[32px] items-center justify-center rounded-full border-2 ${
                  label === id ? "border-primary/45" : "border-transparent"
                }`}
              >
                <span className={`size-[22px] rounded-full ${labelStyles[id].dot}`} />
              </button>
            ))}
          </div>
        </div>
        <Editor initialBlocks={initial?.body} onChange={setBody} />
      </main>
      <div className="sticky bottom-[0px] pb-space-34 pt-space-8">
        <ButtonPrimary label="저장하기" onClick={save} disabled={!title.trim() || saving} />
      </div>
    </ScreenShell>
  );
}
