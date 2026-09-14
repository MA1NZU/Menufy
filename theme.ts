import type { Density, ResolvedTheme, SectionKey, Theme, ThemePresetId } from "./types";

export const FONT_OPTIONS = [
  { id: "ui-sans", label: "Sans (UI)", heading: "'Segoe UI', system-ui, sans-serif", body: "'Segoe UI', system-ui, sans-serif" },
  { id: "serif", label: "Classic Serif", heading: "Georgia, 'Times New Roman', serif", body: "Georgia, 'Times New Roman', serif" },
  { id: "mono", label: "Mono", heading: "ui-monospace, 'SF Mono', Menlo, monospace", body: "ui-monospace, 'SF Mono', Menlo, monospace" },
  { id: "display", label: "Display", heading: "'Trebuchet MS', 'Segoe UI', sans-serif", body: "Georgia, serif" },
] as const;

export type FontId = (typeof FONT_OPTIONS)[number]["id"];

export const DEFAULT_THEME: Theme = {
  preset: "classic",
  overrides: {},
};

export interface PresetDef {
  id: ThemePresetId;
  label: string;
  description: string;
  values: Required<Omit<Theme["overrides"], "heroImage">> & { heroImage: string | null };
}

export const PRESETS: Record<ThemePresetId, PresetDef> = {
  classic: {
    id: "classic",
    label: "Classic",
    description: "Warm paper, serif headings, dotted price leaders. Fits traditional cafés.",
    values: {
      accent: "#9a3412",
      accentText: "#fffaf5",
      background: "#faf6ef",
      surface: "#fffdf8",
      text: "#241c14",
      muted: "#7d6f5f",
      border: "#e7ddcd",
      fontHeading: "Georgia, 'Times New Roman', serif",
      fontBody: "Georgia, 'Times New Roman', serif",
      radius: 6,
      density: "normal",
      heroImage: null,
      heroTitle: "Our Menu",
      heroSubtitle: "Made fresh every morning",
      showHero: true,
      showPrices: true,
      showDescriptions: true,
      showImages: true,
      stickyNav: true,
      visibleSections: ["about", "hours", "location"],
    },
  },
  modern: {
    id: "modern",
    label: "Modern",
    description: "Clean grid, big type, generous whitespace. Works for brunch and bistros.",
    values: {
      accent: "#4f46e5",
      accentText: "#ffffff",
      background: "#f7f7f8",
      surface: "#ffffff",
      text: "#16161a",
      muted: "#6b7280",
      border: "#e6e6ea",
      fontHeading: "'Segoe UI', system-ui, sans-serif",
      fontBody: "'Segoe UI', system-ui, sans-serif",
      radius: 18,
      density: "airy",
      heroImage: null,
      heroTitle: "The Menu",
      heroSubtitle: "Seasonal, local, simple",
      showHero: true,
      showPrices: true,
      showDescriptions: true,
      showImages: true,
      stickyNav: true,
      visibleSections: ["about", "hours", "location"],
    },
  },
  noir: {
    id: "noir",
    label: "Noir",
    description: "Dark, moody and cinematic. Great for coffee bars and late-night spots.",
    values: {
      accent: "#f0b429",
      accentText: "#15130f",
      background: "#121013",
      surface: "#1c191d",
      text: "#f4f1ec",
      muted: "#a49b91",
      border: "#2e2a2f",
      fontHeading: "'Trebuchet MS', 'Segoe UI', sans-serif",
      fontBody: "Georgia, serif",
      radius: 10,
      density: "normal",
      heroImage: null,
      heroTitle: "Menu",
      heroSubtitle: "Slow roasts & long nights",
      showHero: true,
      showPrices: true,
      showDescriptions: true,
      showImages: true,
      stickyNav: true,
      visibleSections: ["hours", "location"],
    },
  },
  fresh: {
    id: "fresh",
    label: "Fresh",
    description: "Bright greens and soft cards. Ideal for juice bars and healthy kitchens.",
    values: {
      accent: "#0f9d58",
      accentText: "#ffffff",
      background: "#f2fbf5",
      surface: "#ffffff",
      text: "#0f2a1c",
      muted: "#5c7566",
      border: "#d8ecdf",
      fontHeading: "'Trebuchet MS', 'Segoe UI', sans-serif",
      fontBody: "'Segoe UI', system-ui, sans-serif",
      radius: 22,
      density: "airy",
      heroImage: null,
      heroTitle: "Eat Well",
      heroSubtitle: "Cold pressed, never pressed for time",
      showHero: true,
      showPrices: true,
      showDescriptions: true,
      showImages: true,
      stickyNav: true,
      visibleSections: ["about", "hours", "location"],
    },
  },
  editorial: {
    id: "editorial",
    label: "Editorial",
    description: "High-contrast magazine layout with a strong masthead. Fine dining feel.",
    values: {
      accent: "#111111",
      accentText: "#ffffff",
      background: "#ffffff",
      surface: "#fafafa",
      text: "#0b0b0b",
      muted: "#6f6f6f",
      border: "#111111",
      fontHeading: "Georgia, 'Times New Roman', serif",
      fontBody: "'Segoe UI', system-ui, sans-serif",
      radius: 0,
      density: "airy",
      heroImage: null,
      heroTitle: "La Carte",
      heroSubtitle: "Tasting menu available on request",
      showHero: true,
      showPrices: true,
      showDescriptions: true,
      showImages: false,
      stickyNav: true,
      visibleSections: ["about", "hours"],
    },
  },
};

export const DENSITY: Record<Density, { gap: number; pad: number; scale: number }> = {
  cozy: { gap: 12, pad: 12, scale: 0.94 },
  normal: { gap: 20, pad: 18, scale: 1 },
  airy: { gap: 32, pad: 26, scale: 1.06 },
};

export function resolveTheme(theme: Theme | null | undefined): ResolvedTheme {
  const preset = PRESETS[theme?.preset ?? "classic"] ?? PRESETS.classic;
  const merged = { ...preset.values, ...(theme?.overrides ?? {}) };
  return {
    preset: preset.id,
    accent: merged.accent,
    accentText: merged.accentText,
    background: merged.background,
    surface: merged.surface,
    text: merged.text,
    muted: merged.muted,
    border: merged.border,
    fontHeading: merged.fontHeading,
    fontBody: merged.fontBody,
    radius: clamp(merged.radius ?? 6, 0, 32),
    density: (DENSITY[merged.density] ? merged.density : "normal") as Density,
    heroImage: merged.heroImage ?? null,
    heroTitle: merged.heroTitle ?? preset.values.heroTitle,
    heroSubtitle: merged.heroSubtitle ?? preset.values.heroSubtitle,
    showHero: merged.showHero ?? true,
    showPrices: merged.showPrices ?? true,
    showDescriptions: merged.showDescriptions ?? true,
    showImages: merged.showImages ?? true,
    stickyNav: merged.stickyNav ?? true,
    visibleSections: (merged.visibleSections ?? preset.values.visibleSections).filter((s): s is SectionKey =>
      ["about", "hours", "location", "gallery"].includes(s),
    ),
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Inline style block that turns a resolved theme into CSS variables. */
export function themeCssVars(t: ResolvedTheme): Record<string, string> {
  const d = DENSITY[t.density] ?? DENSITY.normal;
  return {
    "--ml-accent": t.accent,
    "--ml-accent-text": t.accentText,
    "--ml-bg": t.background,
    "--ml-surface": t.surface,
    "--ml-text": t.text,
    "--ml-muted": t.muted,
    "--ml-border": t.border,
    "--ml-radius": `${t.radius}px`,
    "--ml-font-heading": t.fontHeading,
    "--ml-font-body": t.fontBody,
    "--ml-gap": `${d.gap}px`,
    "--ml-pad": `${d.pad}px`,
    "--ml-scale": String(d.scale),
  };
}
