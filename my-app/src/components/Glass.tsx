export function Glass({ children, padding = true, className }: { children: React.ReactNode, padding?: boolean, className?: string }) {
  return (
    <div
      className={className + " rounded-lg border bg-white/10 backdrop-blur-sm " + (padding ? "p-6" : "")}
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--glass-border)"
      }}
    >
      {children}
    </div>
  );
}