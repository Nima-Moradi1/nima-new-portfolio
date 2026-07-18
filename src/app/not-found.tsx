"use client";

import Link from "next/link";
import { routeStateClassNames as styles } from "@/app/route-state.class-names";

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr" data-theme="dark">
      <body>
        <main className={styles.message}>
          <p className={styles.eyebrow}>404 · No signal here</p>
          <h1 className={styles.title}>
            This coordinate is outside the known system.
          </h1>
          <Link className={styles.link} href="/">
            Return to the portfolio
          </Link>
        </main>
      </body>
    </html>
  );
}
