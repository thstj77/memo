import type { Block, Category, Memo, MemoLabel } from "@/data/memos";
import { supabase } from "./supabase";

type MemoRow = {
  id: string;
  title: string;
  body: Block[];
  category: Category;
  label: MemoLabel;
  pinned: boolean;
  created_at: string;
  updated_at: string;
};

export type NewMemo = Pick<MemoRow, "title" | "category" | "label" | "body">;

const DAY = 86_400_000;
const KST_OFFSET = 9 * 3_600_000;

// 서버 시간대와 상관없이 한국 시간으로 날짜를 만든다.
function kst(ms: number) {
  return new Date(ms + KST_OFFSET);
}

function startOfDay(ms: number) {
  return Math.floor((ms + KST_OFFSET) / DAY);
}

function dayLabel(ms: number) {
  const diff = startOfDay(Date.now()) - startOfDay(ms);
  if (diff <= 0) return "오늘";
  if (diff === 1) return "어제";
  const date = kst(ms);
  return `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일`;
}

function timeLabel(ms: number) {
  const date = kst(ms);
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일 ${hours < 12 ? "오전" : "오후"} ${hours % 12 || 12}:${minutes}`;
}

function previewOf(body: Block[]) {
  for (const block of body) {
    if (block.type === "list") {
      if (block.items.length > 0) return block.items.join(", ");
    } else if (block.type === "paragraph") {
      const text = block.content
        .map((part) => (typeof part === "string" ? part : part.bold))
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      if (text) return text;
    } else if (block.text) {
      return block.text;
    }
  }
  return "";
}

function toMemo(row: MemoRow): Memo {
  const created = new Date(row.created_at).getTime();
  const updated = new Date(row.updated_at).getTime();
  return {
    id: row.id,
    title: row.title,
    preview: previewOf(row.body),
    date: dayLabel(created),
    label: row.label,
    category: row.category,
    pinned: row.pinned,
    createdAt: timeLabel(created),
    updatedAt: timeLabel(updated),
    body: row.body,
  };
}

export async function getMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as MemoRow[]).map(toMemo);
}

export async function getMemo(id: string): Promise<Memo | null> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toMemo(data as MemoRow) : null;
}

export async function insertMemo(memo: NewMemo): Promise<string> {
  const { data, error } = await supabase
    .from("memos")
    .insert(memo)
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function patchMemo(id: string, memo: NewMemo): Promise<boolean> {
  const { data, error } = await supabase
    .from("memos")
    .update({ ...memo, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  return data.length > 0;
}
