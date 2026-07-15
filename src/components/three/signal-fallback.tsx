export function SignalFallback() {
  return (
    <div
      className="signal-fallback"
      role="img"
      aria-label="Abstract signal core"
    >
      <span className="signal-fallback__halo signal-fallback__halo--one" />
      <span className="signal-fallback__halo signal-fallback__halo--two" />
      <span className="signal-fallback__core" />
      <span className="signal-fallback__node signal-fallback__node--one" />
      <span className="signal-fallback__node signal-fallback__node--two" />
      <span className="signal-fallback__node signal-fallback__node--three" />
    </div>
  );
}
