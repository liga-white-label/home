import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIGA CUBB 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <div className="h-20 bg-[#a60000] w-full z-50 flex items-center justify-center shadow-2xl">
            <Image
              src={"/assets/ligacubblogo.png"}
              alt={"LIGA CUBB 2024"}
              width={400}
              height={40}
            />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
