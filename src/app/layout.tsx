import { Metadata } from "next";
import RootLayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Liga CUBB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}
