import Link from "next/link";
import { Icon } from "./icon";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function ButtonPrimary({
  label,
  icon = false,
  href,
  onClick,
  disabled = false,
}: ButtonPrimaryProps) {
  const style = `flex h-[56px] w-full items-center justify-center gap-space-8 rounded-full px-space-24 text-button-md ${
    disabled ? "bg-border-default text-text-muted" : "bg-primary text-text-on-primary"
  }`;
  const content = (
    <>
      {icon && <Icon name="plus" size={20} />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={style}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={style}>
      {content}
    </button>
  );
}
