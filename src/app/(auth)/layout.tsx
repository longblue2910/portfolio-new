import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Rimdasilva Blog - Đăng nhập",
  viewport: "width=device-width, initial-scale=1.0", // Thêm meta viewport tại đây
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
