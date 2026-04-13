export const tenantConfig = {
  brand: {
    name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Liga CUBB",
    subtitle:
      process.env.NEXT_PUBLIC_BRAND_SUBTITLE ??
      "Club Universitario de Bahía Blanca",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR ?? "#A60000",
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
      process.env.NEXT_PUBLIC_HERO_VIDEO_PATH ?? "/assets/video-home.mp4",
    categoryBannerPath:
      process.env.NEXT_PUBLIC_CATEGORY_BANNER_PATH ??
      "/assets/category_banner.jpg",
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
}

function parseSlides(raw: string | undefined): HomeSlide[] {
  if (raw) {
    try {
      return JSON.parse(raw) as HomeSlide[];
    } catch {
      console.warn("NEXT_PUBLIC_HOME_SLIDES is not valid JSON — using defaults");
    }
  }
  return [
    {
      title: "Categoria A - Masculina",
      imagePath: "/assets/cat_a_mas.jpg",
      categoryName: "A",
      gender: "male",
    },
    {
      title: "Categoria A - Femenina",
      imagePath: "/assets/cat_a_fem.jpg",
      categoryName: "A",
      gender: "female",
    },
    {
      title: "Categoria B - Masculina",
      imagePath: "/assets/cat_b_mas.jpg",
      categoryName: "B",
      gender: "male",
    },
    {
      title: "Categoria B - Femenina",
      imagePath: "/assets/cat_b_fem.jpg",
      categoryName: "B",
      gender: "female",
    },
    {
      title: "Categoria C - Masculina",
      imagePath: "/assets/cat_c_mas.jpg",
      categoryName: "C",
      gender: "male",
    },
    {
      title: "Categoria C - Femenina",
      imagePath: "/assets/cat_c_fem.jpg",
      categoryName: "C",
      gender: "female",
    },
    {
      title: "Categoria D - Masculina",
      imagePath: "/assets/cat_d_mas.jpg",
      categoryName: "D",
      gender: "male",
    },
    {
      title: "Categoria E - Masculina",
      imagePath: "/assets/cat_e_mas.jpg",
      categoryName: "E",
      gender: "male",
    },
  ];
}
