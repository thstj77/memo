type ChipProps = {
  label: string;
  selected?: boolean;
  // 고른 칩을 진한 파랑 대신 연한 파랑으로 보인다 (메모 작성 화면)
  soft?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected = false, soft = false, onClick }: ChipProps) {
  const selectedStyle = soft
    ? "bg-label-blue-soft text-primary"
    : "bg-primary text-text-on-primary";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-[36px] shrink-0 items-center rounded-full px-space-16 text-label-md whitespace-nowrap ${
        selected ? selectedStyle : "bg-surface-card text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
