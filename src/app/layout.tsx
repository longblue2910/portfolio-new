import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/Theme";
import Leftpage from "@/components/Left";
import View from "@/components/View";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rimdasilva Portfolio",
  description: "Rimdasilva Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="max-w-[78rem] mx-auto">
            <div className=" gap-4 flex md:mt-5 flex-col md:flex-row  ">
              <Leftpage />
              {children}
              <View />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
