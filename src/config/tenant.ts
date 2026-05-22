export const tenantConfig = {
  brand: {
    name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Liga CUBB",
    subtitle:
      process.env.NEXT_PUBLIC_BRAND_SUBTITLE ??
      "Club Universitario de Bahía Blanca",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR ?? "#A60000",
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR ?? "#0C0C0C",
    gradientColor: process.env.NEXT_PUBLIC_GRADIENT_COLOR ?? "180,0,0",
    logoPath:
      process.env.NEXT_PUBLIC_LOGO_PATH ?? "/assets/logo_2025.png",
    logoWidth: Number(process.env.NEXT_PUBLIC_LOGO_WIDTH ?? 200),
    logoHeight: Number(process.env.NEXT_PUBLIC_LOGO_HEIGHT ?? 100),
  },
  contact: {
    instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "ligacubb",
    instagramUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/ligacubb",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "ligacubb@gmail.com",
  },
  home: {
    heroVideoPath:
      process.env.NEXT_PUBLIC_HERO_VIDEO_PATH ?? null,
    categoryBannerPath:
      process.env.NEXT_PUBLIC_CATEGORY_BANNER_PATH ??
      "/assets/category_banner.jpg",
    seasonLabel:
      process.env.NEXT_PUBLIC_SEASON_LABEL ?? "Temporada",
    /**
     * Slides shown on the home page carousel.
     * Each entry maps to a category by name + gender as they come from the API.
     * Set NEXT_PUBLIC_HOME_SLIDES to a JSON array to override, e.g.:
     * '[{"title":"Cat A Masculina","imagePath":"/assets/cat_a_mas.jpg","categoryName":"A","gender":"male"}]'
     */
    slides: parseSlides(process.env.NEXT_PUBLIC_HOME_SLIDES),
  },
  meta: {
    siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Liga CUBB",
    copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2025",
  },
};

export interface HomeSlide {
  title: string;
  imagePath: string;
  categoryName: string;
  gender: "male" | "female";
  link?: string;
}

function parseSlides(raw: string | undefined): HomeSlide[] {
  if (raw) {
    try {
      return JSON.parse(raw) as HomeSlide[];
    } catch {
      console.warn("NEXT_PUBLIC_HOME_SLIDES is not valid JSON — using category defaults");
    }
  }
  return [];
}
