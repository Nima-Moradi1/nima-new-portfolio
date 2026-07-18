import { cn } from "@/lib/cn";
import { bookFallbackClassNames as styles } from "./book-fallback.class-names";
import artwork from "./book-fallback.module.css";

export function BookFallback() {
  return (
    <div className={cn(styles.root, artwork.root)} aria-hidden="true">
      <span
        className={cn(
          styles.layer,
          styles.cover,
          styles.leftCover,
          artwork.leftCover,
        )}
      />
      <span
        className={cn(
          styles.layer,
          styles.cover,
          styles.rightCover,
          artwork.rightCover,
        )}
      />
      <span
        className={cn(
          styles.layer,
          styles.page,
          styles.leftPage,
          artwork.page,
          artwork.leftPage,
        )}
      />
      <span
        className={cn(
          styles.layer,
          styles.page,
          styles.rightPage,
          artwork.page,
          artwork.rightPage,
        )}
      />
      <span className={cn(styles.spine, artwork.spine)} />
    </div>
  );
}
