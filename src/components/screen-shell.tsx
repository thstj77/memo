type ScreenShellProps = {
  // 화면마다 다른 위쪽 여백
  className: string;
  children: React.ReactNode;
};

export function ScreenShell({ className, children }: ScreenShellProps) {
  return (
    <div
      className={`relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col gap-space-16 overflow-x-clip px-space-16 ${className}`}
    >
      {children}
    </div>
  );
}
