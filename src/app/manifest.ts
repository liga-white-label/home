import { MetadataRoute } from "next";
import { tenantConfig } from "@/config/tenant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: tenantConfig.brand.name,
    short_name: tenantConfig.brand.name,
    icons: [
      {
        src: tenantConfig.brand.logoPath,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: tenantConfig.brand.logoPath,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: tenantConfig.brand.primaryColor,
    background_color: "#ffffff",
    display: "standalone",
  };
}
