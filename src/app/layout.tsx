import { Metadata } from "next";
import RootLayoutWrapper from "./layoutWrapper";

const logoUrl = process.env.NEXT_PUBLIC_LOGO_PATH ?? "/assets/logo_2025.png";
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? "Liga CUBB";
const brandSubtitle = process.env.NEXT_PUBLIC_BRAND_SUBTITLE ?? "Club Universitario de Bahía Blanca";

export const metadata: Metadata = {
  title: siteTitle,
  description: brandSubtitle,
  icons: {
    icon: logoUrl,
    apple: logoUrl,
    shortcut: logoUrl,
  },
  openGraph: {
    title: siteTitle,
    description: brandSubtitle,
    images: [logoUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}
