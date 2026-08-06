import { MetadataRoute } from "next";
import { tenantConfig } from "@/config/tenant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: tenantConfig.brand.name,
    short_name: tenantConfig.brand.name,
    icons: [
      {
        src: tenantConfig.brand.pwaIcon192Path,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: tenantConfig.brand.pwaIcon512Path,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
