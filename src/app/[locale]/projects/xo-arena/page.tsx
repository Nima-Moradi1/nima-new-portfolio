import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { XoArenaVideo } from "@/components/projects/xo-arena-video";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  localizedProjectPath,
  projectLanguages,
  projectOgLocales,
} from "@/lib/project-paths";
import styles from "@/components/projects/evidence-case-study.module.css";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonical = localizedProjectPath(locale, "xo-arena");
  const images = [
    {
      url: "/assets/projects/xo-arena/game-room.webp",
      alt: "XO Arena actual game room",
    },
  ];
  return {
    title: t("xoTitle"),
    description: t("xoDescription"),
    alternates: { canonical, languages: projectLanguages("xo-arena") },
    openGraph: {
      title: t("xoTitle"),
      description: t("xoDescription"),
      url: canonical,
      type: "article",
      locale: projectOgLocales[locale],
      images,
    },
    twitter: { card: "summary_large_image", images },
  };
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [t, labels, routes] = await Promise.all([
    getTranslations("XoArena"),
    getTranslations("Employer"),
    getTranslations("Routes"),
  ]);
  const gallery = t.raw("gallery.items") as {
    id: string;
    alt: string;
    title: string;
    description: string;
  }[];
  return (
    <>
      <a href="#case-study-main" className="skip-link">
        {routes("skipMain")}
      </a>
      <SiteHeader />
      <main className={styles.root} id="case-study-main" tabIndex={-1}>
        <div className={styles.shell}>
          <Link className={styles.back} href="/#work">
            {labels("back")}
          </Link>
          <p className={styles.kind}>XO Arena</p>
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.intro}>{t("hero.intro")}</p>
          <p className={styles.status}>{t("hero.availability")}</p>
          <div className={styles.links}>
            <a
              href="https://github.com/Nima-Moradi1/xo-arena"
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels("source")}
            </a>
          </div>
          <XoArenaVideo />
          <section className={styles.prose} lang="en" dir="ltr">
            {locale !== "en" ? (
              <p lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
                {labels("englishNotice")}
              </p>
            ) : null}
            <h2>My contribution</h2>
            <p>
              I built the multiplayer application across its Next.js client,
              Express/Socket.IO server, shared TypeScript contracts, and
              Prisma/MySQL persistence. The recorded walkthrough and actual
              interface captures show the local product without requiring a
              reviewer to create an account.
            </p>
            <h2>Problem and constraints</h2>
            <p>
              Both players need a consistent board, identity, and result.
              Browser state alone cannot decide whether a move is legal: an
              authenticated player can still submit an out-of-turn move or act
              on an outdated view. Rooms also need to keep private game state
              scoped to participating users.
            </p>
            <h2>Engineering decisions</h2>
            <p>
              The server owns move validation and the persisted game state.
              Socket.IO publishes the resulting game state to the room after the
              move service accepts it. This gives both clients the same
              authoritative result instead of trusting a client-supplied board.
            </p>
            <p>
              Socket authentication looks up a hashed session token and rejects
              missing or expired sessions. Joining a game checks access before
              placing the socket in its room and sending the current state. A
              subsequent join can therefore obtain a fresh snapshot; automatic
              recovery across every reconnect condition has not been
              established.
            </p>
            <p>
              The move service checks participation, game status, and whose turn
              it is inside the database transaction. Rejected moves are returned
              as game errors rather than broadcast as successful updates. Shared
              TypeScript contracts keep event payloads consistent while server
              checks enforce the actual trust boundary.
            </p>
            <div className={styles.links}>
              <a
                href="https://github.com/Nima-Moradi1/xo-arena/blob/main/apps/server/src/services/games.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect move validation
              </a>
              <a
                href="https://github.com/Nima-Moradi1/xo-arena/blob/main/apps/server/src/socket/index.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect sessions and room events
              </a>
            </div>
            <h2>Verification and outcome</h2>
            <p>
              The local recording and screenshots demonstrate the lobby, a
              completed match, and persistent player history. Source inspection
              confirms the NOT_YOUR_TURN rejection path and session checks. This
              review does not claim a freshly executed multiplayer failure test,
              production traffic, measured latency, or an externally deployed
              service.
            </p>
            <h2>Limitations and next improvement</h2>
            <p>
              A public deployment would require the application server,
              database, sessions, and media storage to be provisioned together.
              The next useful verification is a reproducible two-client test
              covering rejected moves, interrupted connections, and state
              recovery. The recording remains available independently of those
              services.
            </p>
          </section>
          <section aria-labelledby="gallery-title">
            <h2 className={styles.title} id="gallery-title">
              {t("gallery.title")}
            </h2>
            {gallery.map((item) => (
              <figure className={styles.figure} key={item.id}>
                <a href={`/assets/projects/xo-arena/${item.id}.webp`}>
                  <Image
                    src={`/assets/projects/xo-arena/${item.id}.webp`}
                    alt={item.alt}
                    width={1480}
                    height={880}
                    sizes="(max-width:768px) 90vw, 1100px"
                    className={styles.image}
                  />
                </a>
                <figcaption>
                  {item.title}: {item.description}
                </figcaption>
              </figure>
            ))}
          </section>
          <section className={styles.prose}>
            <h2>{t("deployment.title")}</h2>
            <p>{t("deployment.paragraph1")}</p>
            <p>{t("deployment.paragraph2")}</p>
          </section>
          <Link className={styles.back} href="/#contact">
            {labels("contact")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
