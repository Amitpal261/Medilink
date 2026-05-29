import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/ui/topnav";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PremiumCare — Doctor App",
  description: "Premium doctor appointments & clinic management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[--background] text-[--foreground] dark:bg-[--background]">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Fine gold highlight bottom border for luxury hint */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-300/40 via-yellow-100 to-yellow-500/70 opacity-65" />
      </body>
    </html>
  );
}
