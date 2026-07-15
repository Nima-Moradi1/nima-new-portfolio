export function BookFallback() {
  return (
    <div className="book-fallback" aria-hidden="true">
      <span className="book-fallback__cover book-fallback__cover--left" />
      <span className="book-fallback__cover book-fallback__cover--right" />
      <span className="book-fallback__page book-fallback__page--left" />
      <span className="book-fallback__page book-fallback__page--right" />
      <span className="book-fallback__spine" />
    </div>
  );
}
