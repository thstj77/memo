import { Suspense } from "react";
import { MemoNotFound } from "@/components/memo-not-found";
import { WriteScreen } from "@/components/write-screen";
import { getMemo } from "@/lib/memo-store";

async function EditMemoPage({ params }: { params: PageProps<"/memos/[id]/edit">["params"] }) {
  const { id } = await params;
  const memo = await getMemo(id);
  if (!memo) return <MemoNotFound />;
  return <WriteScreen initial={memo} />;
}

export default function MemoEditPage({ params }: PageProps<"/memos/[id]/edit">) {
  return (
    <Suspense fallback={null}>
      <EditMemoPage params={params} />
    </Suspense>
  );
}
