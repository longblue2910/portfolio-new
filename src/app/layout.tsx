import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Rimdasilva Blog",
  description: "Rimdasilva Blog",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
