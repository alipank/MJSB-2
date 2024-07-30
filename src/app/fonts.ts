import { Alegreya_Sans, Source_Sans_3 } from "next/font/google";
import localFont from 'next/font/local'

export const alegreya = Alegreya_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["900", "700","500"],
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  weight: ["500",'700']
})