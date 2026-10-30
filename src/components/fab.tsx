import Link from "next/link";
import { Icon } from "./icon";

type FabProps = {
  label: string;
  href: string;
};

// 화면 오른쪽 아래에 떠 있는 둥근 버튼. 글자는 접근성 이름으로만 쓴다.
export function Fab({ label, href }: FabProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex size-[56px] items-center justify-center rounded-full bg-primary text-text-on-primary shadow-fab"
    >
      <Icon name="plus" size={24} />
    </Link>
  );
}
