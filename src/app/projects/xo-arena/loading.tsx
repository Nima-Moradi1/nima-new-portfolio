export default function XoArenaLoading() {
  return (
    <div className="xo-route-loading" role="status" aria-live="polite">
      <div aria-hidden="true">
        <span>X</span>
        <span />
        <span>O</span>
        <span />
        <span>X</span>
        <span>O</span>
        <span />
        <span>X</span>
        <span>O</span>
      </div>
      <p>Opening XO Arena case study…</p>
    </div>
  );
}
