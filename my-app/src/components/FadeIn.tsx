export const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <div className="animate-fadein opacity-0 translate-y-2">
    {children}
  </div>
);
