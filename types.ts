export type ThemePresetId = "classic" | "modern" | "noir" | "fresh" | "editorial";

export type Density = "cozy" | "normal" | "airy";

export type SectionKey = "about" | "hours" | "location" | "gallery";

/** Everything the public menu site needs to render. */
export interface Theme {
  preset: ThemePresetId;
  /** Any value here overrides the preset's own value. */
  overrides: Partial<{
    accent: string;
    accentText: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    fontHeading: string;
    fontBody: string;
    radius: number;
    density: Density;
    heroImage: string | null;
    heroTitle: string;
    heroSubtitle: string;
    showHero: boolean;
    showPrices: boolean;
    showDescriptions: boolean;
    showImages: boolean;
    stickyNav: boolean;
    visibleSections: SectionKey[];
  }>;
}

/** Theme with every value resolved — what the renderer actually consumes. */
export type ResolvedTheme = Required<Omit<Theme["overrides"], "heroImage">> & {
  preset: ThemePresetId;
  heroImage: string | null;
};

export interface Restaurant {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  tagline: string | null;
  about: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  map_url: string | null;
  instagram: string | null;
  logo_url: string | null;
  cover_url: string | null;
  currency: string;
  hours: Record<string, string | null> | null;
  theme: Theme;
  published: boolean;
  status: "trial" | "active" | "past_due" | "canceled";
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  position: number;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  restaurant_id: string;
  plan: string;
  status: "trialing" | "active" | "past_due" | "canceled";
  amount_cents: number;
  currency: string;
  provider: "stripe" | "mock";
  provider_sub_id: string | null;
  current_period_end: string | null;
  created_at: string;
}

/** Menu + settings + items grouped by category, ready to render. */
export interface PublicMenu {
  restaurant: Omit<Restaurant, "owner_id">;
  theme: ResolvedTheme;
  groups: { category: Category; items: MenuItem[] }[];
}

export interface PlanDef {
  id: string;
  name: string;
  price_cents: number;
  yearly_cents: number | null;
  currency: string;
  tagline: string;
  features: string[];
  price_id: string | null;
}
