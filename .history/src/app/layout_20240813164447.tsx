import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/Theme";
import Leftpage from "@/components/Left";
import View from "@/components/View";
import Head from "next/head";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="max-w-[78rem] mx-auto">
            <div className=" md:space-x-4  flex md:mt-5 flex-col md:flex-row">
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
