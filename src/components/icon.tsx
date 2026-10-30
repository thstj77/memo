type IconName =
  | "plus"
  | "note"
  | "pin"
  | "pin-24"
  | "chevron-right"
  | "chevron-left"
  | "share"
  | "more";

type IconProps = {
  name: IconName;
  size: number;
};

// 아이콘 파일을 마스크로 써서 색이 주변 글자색(currentColor)을 따른다.
export function Icon({ name, size }: IconProps) {
  const mask = `url(/icons/icon-${name}.svg) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{ width: size, height: size, mask, WebkitMask: mask }}
    />
  );
}
