import type { MemoLabel } from "@/data/memos";

// 색 라벨(빨주노초파남보) 한 곳에서 관리한다. 클래스 이름은 Tailwind가 찾을 수 있게 글자 그대로 적는다.
type LabelStyle = {
  name: string;
  // 썸네일 칸, 배지 (연한 배경 + 진한 글자/아이콘)
  soft: string;
  // 글자색만 (빛, 아이콘이 글자색을 따른다)
  text: string;
  // 작성 화면의 색 선택 점 (80% 농도)
  dot: string;
};

export const labelOrder: MemoLabel[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

export const labelStyles: Record<MemoLabel, LabelStyle> = {
  red: {
    name: "빨강",
    soft: "bg-label-red-soft text-label-red",
    text: "text-label-red",
    dot: "bg-label-red/80",
  },
  orange: {
    name: "주황",
    soft: "bg-label-orange-soft text-label-orange",
    text: "text-label-orange",
    dot: "bg-label-orange/80",
  },
  yellow: {
    name: "노랑",
    soft: "bg-label-yellow-soft text-label-yellow",
    text: "text-label-yellow",
    dot: "bg-label-yellow/80",
  },
  green: {
    name: "초록",
    soft: "bg-label-green-soft text-label-green",
    text: "text-label-green",
    dot: "bg-label-green/80",
  },
  blue: {
    name: "파랑",
    soft: "bg-label-blue-soft text-label-blue",
    text: "text-label-blue",
    dot: "bg-label-blue/80",
  },
  indigo: {
    name: "남색",
    soft: "bg-label-indigo-soft text-label-indigo",
    text: "text-label-indigo",
    dot: "bg-label-indigo/80",
  },
  violet: {
    name: "보라",
    soft: "bg-label-violet-soft text-label-violet",
    text: "text-label-violet",
    dot: "bg-label-violet/80",
  },
};
