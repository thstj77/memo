import Link from "next/link";
import { Icon } from "./icon";

type IconButtonProps = {
  icon: "chevron-left" | "pin-24" | "share" | "more";
  label: string;
  href?: string;
  onClick?: () => void;
  // 카드 배경 없이 아이콘만 보이는 모양 (작성 화면의 뒤로가기)
  plain?: boolean;
};

const base = "flex size-[40px] shrink-0 items-center justify-center rounded-sm text-text-primary";
const card =
  "border border-surface-card bg-surface-card shadow-glass backdrop-blur-glass";

export function IconButton({ icon, label, href, onClick, plain = false }: IconButtonProps) {
  const style = plain ? base : `${base} ${card}`;
  if (href) {
    return (
      <Link href={href} aria-label={label} className={style}>
        <Icon name={icon} size={24} />
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={style}>
      <Icon name={icon} size={24} />
    </button>
  );
}
