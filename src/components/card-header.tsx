import { Icon } from "./icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  action?: boolean;
};

export function CardHeader({ title, pin = false, action = false }: CardHeaderProps) {
  return (
    <div className="flex h-[40px] items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && (
        <span className="text-label-blue">
          <Icon name="pin" size={16} />
        </span>
      )}
      <p className="min-w-0 flex-1 text-label-md text-text-primary">{title}</p>
      {action && (
        <button
          type="button"
          className="flex items-center gap-space-4 text-caption-md whitespace-nowrap text-text-muted"
        >
          전체 보기
          <Icon name="chevron-right" size={16} />
        </button>
      )}
    </div>
  );
}
