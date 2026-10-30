import { Suspense } from "react";
import { HomeScreen } from "@/components/home-screen";
import { getMemos } from "@/lib/memo-store";

async function HomeMemos() {
  const memos = await getMemos();
  return <HomeScreen memos={memos} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeMemos />
    </Suspense>
  );
}
