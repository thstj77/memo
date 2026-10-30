"use server";

import { revalidatePath } from "next/cache";
import { insertMemo, patchMemo, type NewMemo } from "@/lib/memo-store";

export async function saveMemo(memo: NewMemo): Promise<string> {
  const id = await insertMemo(memo);
  revalidatePath("/");
  return id;
}

export async function updateMemo(id: string, memo: NewMemo): Promise<boolean> {
  const ok = await patchMemo(id, memo);
  revalidatePath("/");
  revalidatePath(`/memos/${id}`);
  return ok;
}
