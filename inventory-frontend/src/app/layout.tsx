import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"], display:"swap" });

export const metadata: Metadata = {
  title: "MJSB",
  description: "THIS MADAFAKA MAKES ME SO fCKng CONFUSED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          {children}
        </NextUIProvider>

      </body>
    </html>
  );
}
