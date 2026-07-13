import { Metadata } from "next";
import RootLayoutWrapper from "./layoutWrapper";
import { tenantConfig } from "@/config/tenant";

export const metadata: Metadata = {
  title: tenantConfig.meta.siteTitle,
  description: tenantConfig.brand.subtitle,
  icons: {
    icon: tenantConfig.brand.logoPath,
    apple: tenantConfig.brand.logoPath,
    shortcut: tenantConfig.brand.logoPath,
  },
  openGraph: {
    title: tenantConfig.meta.siteTitle,
    description: tenantConfig.brand.subtitle,
    images: [tenantConfig.brand.logoPath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}
