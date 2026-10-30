import { IconButton } from "./icon-button";
import { ScreenShell } from "./screen-shell";

export function MemoNotFound() {
  return (
    <ScreenShell className="pt-space-48">
      <nav>
        <IconButton icon="chevron-left" label="뒤로가기" href="/" />
      </nav>
      <p className="px-space-8 text-body-md text-text-secondary">메모를 찾을 수 없어요.</p>
    </ScreenShell>
  );
}
