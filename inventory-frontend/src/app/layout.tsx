import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';


const inter = Inter({ subsets: ["latin"], display:"swap",weight:["100","200","300","400","500","600","700","800","900"] });

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
