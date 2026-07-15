type LampFallbackProps = {
  isDark: boolean;
};

export function LampFallback({ isDark }: LampFallbackProps) {
  return (
    <div className="lamp-fallback" data-lit={isDark} aria-hidden="true">
      <span className="lamp-fallback__glow" />
      <span className="lamp-fallback__shade" />
      <span className="lamp-fallback__arm" />
      <span className="lamp-fallback__stem" />
      <span className="lamp-fallback__base" />
    </div>
  );
}
