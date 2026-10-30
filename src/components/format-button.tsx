type FormatButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function FormatButton({ label, active, onClick }: FormatButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      // 눌러도 편집 칸의 선택이 풀리지 않게 한다.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-[36px] items-center justify-center rounded-sm px-space-12 text-label-md whitespace-nowrap ${
        active ? "bg-label-blue-soft text-primary" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
