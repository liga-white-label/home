import { Metadata } from "next";
import RootLayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
  title: "Liga CUBB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}
