import type { MemoLabel } from "@/data/memos";
import { labelStyles } from "@/lib/label-styles";

type GlowProps = {
  color?: MemoLabel;
  className?: string;
};

// 부모(relative)의 한가운데에 놓이는 빛. 부모 안에서 카드보다 먼저 그려 카드 뒤로 깐다.
// 빛 파일의 투명도를 마스크로 쓰고 색은 글자색(currentColor)을 따른다.
export function Glow({ color = "blue", className = "" }: GlowProps) {
  const mask = "url(/icons/glow-background.svg) center / 100% 100% no-repeat";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[440px] -translate-x-1/2 -translate-y-1/2 bg-current ${labelStyles[color].text} ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
