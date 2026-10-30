import { Suspense } from "react";
import { DetailScreen } from "@/components/detail-screen";
import { MemoNotFound } from "@/components/memo-not-found";
import { getMemo } from "@/lib/memo-store";

async function MemoDetail({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const memo = await getMemo(id);
  if (!memo) return <MemoNotFound />;
  return <DetailScreen memo={memo} />;
}

export default function MemoDetailPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={null}>
      <MemoDetail params={params} />
    </Suspense>
  );
}
