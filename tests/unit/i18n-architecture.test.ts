import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getLanguagePaths, getLocalizedPath } from "@/i18n/paths";
import {
  getLocaleDirection,
  localeDirections,
  routing,
  type AppLocale,
} from "@/i18n/routing";
import { testMessages } from "../helpers/render-with-intl";

type Catalog = (typeof testMessages)[AppLocale];

function valueKind(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function expectExactSchema(
  reference: unknown,
  candidate: unknown,
  path = "$",
): void {
  expect(valueKind(candidate), `${path} has a different value kind`).toBe(
    valueKind(reference),
  );

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) return;

    expect(candidate, `${path} has a different array length`).toHaveLength(
      reference.length,
    );
    reference.forEach((item, index) =>
      expectExactSchema(item, candidate[index], `${path}[${index}]`),
    );
    return;
  }

  if (reference !== null && typeof reference === "object") {
    if (candidate === null || typeof candidate !== "object") return;

    const referenceObject = reference as Record<string, unknown>;
    const candidateObject = candidate as Record<string, unknown>;
    const referenceKeys = Object.keys(referenceObject).sort();
    const candidateKeys = Object.keys(candidateObject).sort();

    expect(candidateKeys, `${path} has different keys`).toEqual(referenceKeys);
    for (const key of referenceKeys) {
      expectExactSchema(
        referenceObject[key],
        candidateObject[key],
        `${path}.${key}`,
      );
    }
  }
}

function collectStrings(value: unknown, path = "$", result: string[] = []) {
  if (typeof value === "string") {
    result.push(`${path}: ${value}`);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectStrings(item, `${path}[${index}]`, result),
    );
    return result;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      collectStrings(item, `${path}.${key}`, result);
    }
  }

  return result;
}

function ids(items: ReadonlyArray<{ id: string }>): string[] {
  return items.map(({ id }) => id);
}

function expectContentIdentity(reference: Catalog, candidate: Catalog): void {
  expect(ids(candidate.Portfolio.navigation)).toEqual(
    ids(reference.Portfolio.navigation),
  );
  expect(ids(candidate.Portfolio.about.principles)).toEqual(
    ids(reference.Portfolio.about.principles),
  );
  expect(ids(candidate.Portfolio.experience)).toEqual(
    ids(reference.Portfolio.experience),
  );
  expect(ids(candidate.Portfolio.projects)).toEqual(
    ids(reference.Portfolio.projects),
  );
  expect(ids(candidate.Portfolio.capabilities)).toEqual(
    ids(reference.Portfolio.capabilities),
  );
  expect(ids(candidate.Portfolio.socialLinks)).toEqual(
    ids(reference.Portfolio.socialLinks),
  );
  expect(ids(candidate.XoArena.signals)).toEqual(
    ids(reference.XoArena.signals),
  );
  expect(ids(candidate.XoArena.gallery.items)).toEqual(
    ids(reference.XoArena.gallery.items),
  );

  expect(candidate.Portfolio.signals).toHaveLength(
    reference.Portfolio.signals.length,
  );
  expect(candidate.Portfolio.about.paragraphs).toHaveLength(
    reference.Portfolio.about.paragraphs.length,
  );
  expect(candidate.Portfolio.education.languages).toHaveLength(
    reference.Portfolio.education.languages.length,
  );
}

function stableAssetPolicy(catalog: Catalog) {
  return {
    resumeUrl: catalog.Portfolio.identity.resumeUrl,
    resumePreview: catalog.Portfolio.identity.resumePreview,
    navigationHrefs: catalog.Portfolio.navigation.map(({ id, href }) => ({
      id,
      href,
    })),
    projects: catalog.Portfolio.projects.map(
      ({ id, image, href, featured, accent }) => ({
        id,
        image,
        href,
        featured,
        accent,
      }),
    ),
    socialHrefs: catalog.Portfolio.socialLinks.map(({ id, href }) => ({
      id,
      href,
    })),
  };
}

describe("internationalization architecture", () => {
  it.each(["fa", "de"] as const)(
    "keeps the %s catalog in exact recursive schema parity with English",
    (locale) => {
      expectExactSchema(testMessages.en, testMessages[locale]);
    },
  );

  it("defines the supported locale, direction, and prefix policy", () => {
    expect(routing.locales).toEqual(["en", "fa", "de"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("as-needed");
    expect(localeDirections).toEqual({ en: "ltr", fa: "rtl", de: "ltr" });
    expect(getLocaleDirection("en")).toBe("ltr");
    expect(getLocaleDirection("fa")).toBe("rtl");
    expect(getLocaleDirection("de")).toBe("ltr");
  });

  it("builds canonical and language-alternate paths with an unprefixed English default", () => {
    expect(getLocalizedPath("en")).toBe("/");
    expect(getLocalizedPath("fa")).toBe("/fa");
    expect(getLocalizedPath("de")).toBe("/de");
    expect(getLocalizedPath("en", "/projects/xo-arena")).toBe(
      "/projects/xo-arena",
    );
    expect(getLocalizedPath("fa", "projects/xo-arena")).toBe(
      "/fa/projects/xo-arena",
    );
    expect(getLocalizedPath("de", "/projects/xo-arena")).toBe(
      "/de/projects/xo-arena",
    );
    expect(getLanguagePaths("/projects/xo-arena")).toEqual({
      en: "/projects/xo-arena",
      fa: "/fa/projects/xo-arena",
      de: "/de/projects/xo-arena",
      "x-default": "/projects/xo-arena",
    });
  });

  it.each(["fa", "de"] as const)(
    "preserves ordered content IDs and collection counts for %s",
    (locale) => {
      expectContentIdentity(testMessages.en, testMessages[locale]);
    },
  );

  it.each(Object.entries(testMessages) as Array<[AppLocale, Catalog]>)(
    "contains no empty localized strings in the %s catalog",
    (_locale, catalog) => {
      const emptySignals = collectStrings(catalog).filter(
        (entry) => entry.slice(entry.indexOf(":") + 1).trim().length === 0,
      );

      expect(emptySignals).toEqual([]);
    },
  );

  it("contains recognizable Persian and German localized signals", () => {
    expect(testMessages.fa.LocaleSwitcher.label).toMatch(/[\u0600-\u06ff]/u);
    expect(testMessages.fa.Hero.titleLine1).toMatch(/[\u0600-\u06ff]/u);
    expect(testMessages.fa.Portfolio.identity.role).toMatch(/[\u0600-\u06ff]/u);
    expect(testMessages.de.LocaleSwitcher.label).toBe("Sprache wechseln");
    expect(testMessages.de.Hero.titleLine1).not.toBe(
      testMessages.en.Hero.titleLine1,
    );
    expect(testMessages.de.Portfolio.identity.shortRole).not.toBe(
      testMessages.en.Portfolio.identity.shortRole,
    );
  });

  it.each(["fa", "de"] as const)(
    "keeps the locale-independent asset and destination policy for %s",
    (locale) => {
      expect(stableAssetPolicy(testMessages[locale])).toEqual(
        stableAssetPolicy(testMessages.en),
      );
      expect(
        testMessages[locale].Portfolio.projects.map(({ imageAlt }) => imageAlt),
      ).not.toEqual(
        testMessages.en.Portfolio.projects.map(({ imageAlt }) => imageAlt),
      );
    },
  );

  it("points every portfolio image and résumé artifact at a real public file", () => {
    const assetPaths = [
      testMessages.en.Portfolio.identity.resumeUrl,
      testMessages.en.Portfolio.identity.resumePreview,
      ...testMessages.en.Portfolio.projects.map(({ image }) => image),
    ];

    for (const assetPath of assetPaths) {
      expect(
        assetPath.startsWith("/"),
        `${assetPath} must be root-relative`,
      ).toBe(true);
      expect(
        existsSync(join(process.cwd(), "public", assetPath.slice(1))),
        `${assetPath} must resolve inside public/`,
      ).toBe(true);
    }
  });
});
