import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Database,
  Gamepad2,
  Radio,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { XoArenaGalleryImage } from "@/components/projects/xo-arena-gallery-image";
import { XoArenaVideo } from "@/components/projects/xo-arena-video";

export const metadata: Metadata = {
  title: "XO Arena · Real-time multiplayer PWA",
  description:
    "A product case study for XO Arena: a type-safe real-time Tic-Tac-Toe platform with Socket.IO matchmaking, secure sessions, server-validated turns, profiles, and installable PWA support.",
  alternates: { canonical: "/projects/xo-arena" },
  openGraph: {
    title: "XO Arena · Real-time multiplayer PWA",
    description:
      "A recorded product walkthrough and engineering case study for a modular, real-time multiplayer platform.",
    images: ["/assets/projects/xo-arena/landing.webp"],
  },
};

const engineeringSignals = [
  {
    icon: ShieldCheck,
    title: "Secure identity",
    text: "httpOnly sessions, protected user flows, avatar uploads, and validation at trust boundaries.",
  },
  {
    icon: Radio,
    title: "Live rooms",
    text: "Socket.IO matchmaking and room events keep both players synchronized through every turn.",
  },
  {
    icon: Gamepad2,
    title: "Authoritative play",
    text: "A shared, type-safe game engine supports server-validated moves and dependable match state.",
  },
  {
    icon: Bot,
    title: "Adaptive opponents",
    text: "Four computer difficulty modes turn the same game model into progressively stronger challenges.",
  },
  {
    icon: Smartphone,
    title: "Installable client",
    text: "Responsive, touch-friendly PWA behavior keeps the complete product usable on mobile surfaces.",
  },
  {
    icon: Database,
    title: "Persistent history",
    text: "Prisma and MySQL retain profiles, match outcomes, move counts, and recent activity.",
  },
] as const;

const technologies = [
  "Next.js",
  "TypeScript",
  "Express",
  "Socket.IO",
  "Prisma",
  "MySQL",
  "Zod",
  "PWA",
] as const;

export default function XoArenaPage() {
  return (
    <>
      <a className="skip-link" href="#xo-main">
        Skip to case study
      </a>
      <SiteHeader />

      <main className="xo-case" id="xo-main">
        <section className="xo-case__hero" id="top">
          <div className="xo-case__grid" aria-hidden="true" />
          <div className="page-shell">
            <Link className="xo-case__back" href="/#work">
              <ArrowLeft aria-hidden="true" size={16} />
              Back to selected work
            </Link>

            <div className="xo-case__hero-copy">
              <div>
                <p className="xo-case__eyebrow">
                  <span>01</span>
                  Product case study · Real-time systems
                </p>
                <h1>Real-time play, engineered end to end.</h1>
              </div>
              <div className="xo-case__intro">
                <p>
                  XO Arena is a modular, type-safe Tic-Tac-Toe product built
                  around secure identity, server-authoritative matches, live
                  matchmaking, persistent profiles, and installable mobile
                  behavior.
                </p>
                <div className="xo-case__availability">
                  <span aria-hidden="true" />
                  Complete local product · Recorded walkthrough
                </div>
              </div>
            </div>

            <XoArenaVideo />
          </div>
        </section>

        <section className="xo-system" aria-labelledby="xo-system-title">
          <div className="page-shell">
            <div className="xo-section-heading">
              <p>System map · 02</p>
              <div>
                <h2 id="xo-system-title">
                  A small game with production-shaped systems.
                </h2>
                <p>
                  The board is deliberately simple. The engineering around it
                  handles the harder product concerns: identity, concurrency,
                  authority, persistence, responsive delivery, and clear
                  feedback.
                </p>
              </div>
            </div>

            <div className="xo-system__grid">
              {engineeringSignals.map(({ icon: Icon, title, text }, index) => (
                <article key={title}>
                  <div>
                    <Icon aria-hidden="true" size={21} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>

            <div className="xo-tech" aria-label="XO Arena technology stack">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="xo-gallery" aria-labelledby="xo-gallery-title">
          <div className="page-shell">
            <div className="xo-section-heading">
              <p>Product surfaces · 03</p>
              <div>
                <h2 id="xo-gallery-title">
                  The complete flow, captured in context.
                </h2>
                <p>
                  Each image is served as a compact WebP and loaded only as it
                  approaches the viewport. The frames document the real local
                  product rather than a reconstructed mockup.
                </p>
              </div>
            </div>

            <div className="xo-gallery__grid">
              <XoArenaGalleryImage
                index="01"
                src="/assets/projects/xo-arena/landing.webp"
                alt="XO Arena landing page with product introduction, a live board preview, and feature cards"
                title="Product entry"
                description="A theme-aware landing experience explains the game and establishes auth, multiplayer, PWA, and design-system signals before entry."
                width={1475}
                height={919}
              />
              <XoArenaGalleryImage
                index="02"
                src="/assets/projects/xo-arena/lobby.webp"
                alt="XO Arena lobby showing four computer difficulty levels, quick online matchmaking, and room creation"
                title="Matchmaking lobby"
                description="Players can choose four computer difficulties, enter quick matchmaking, or create an online room from one responsive surface."
                width={1485}
                height={851}
              />
              <XoArenaGalleryImage
                index="03"
                src="/assets/projects/xo-arena/game-room.webp"
                alt="XO Arena completed match with a Tic-Tac-Toe board, players, match actions, and a seven-turn move log"
                title="Authoritative game room"
                description="The match view combines board state, player identity, replay actions, outcome messaging, and an auditable turn-by-turn move log."
                width={1486}
                height={862}
              />
              <XoArenaGalleryImage
                index="04"
                src="/assets/projects/xo-arena/profile.webp"
                alt="XO Arena profile showing nickname and avatar controls alongside a persistent recent-game history table"
                title="Persistent player history"
                description="Profile editing and recent match history make identity and persistence visible, including mode, opponent, outcome, and move count."
                width={1474}
                height={885}
              />
            </div>
          </div>
        </section>

        <section
          className="xo-deployment"
          aria-labelledby="xo-deployment-title"
        >
          <div className="page-shell xo-deployment__layout">
            <div>
              <p>Deployment note · 04</p>
              <h2 id="xo-deployment-title">
                Why this is a case study—not a temporary demo.
              </h2>
            </div>
            <div>
              <p>
                XO Arena’s complete experience depends on persistent services:
                secure sessions, an application server, Socket.IO rooms, a
                relational database, and uploaded-media storage. Rather than
                publish a partially provisioned build that misrepresents the
                product, this page documents the complete local system through
                its actual recorded flows and product captures.
              </p>
              <p>
                The implementation is shaped for deployment; the presentation is
                intentionally honest about the infrastructure a reliable
                real-time product requires.
              </p>
            </div>
          </div>
        </section>

        <section className="xo-next">
          <div className="page-shell">
            <p>Continue the portfolio</p>
            <h2>Explore the systems behind the surfaces.</h2>
            <div>
              <Link href="/#work">
                Selected work
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link href="/#contact">
                Start a conversation
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
