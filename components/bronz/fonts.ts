import { Bodoni_Moda, Manrope } from "next/font/google";

const display = Bodoni_Moda({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-bodoni" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });

/** CSS variables for the bronz display and body faces; put on the `.bronz` root. */
export const bronzFonts = `${display.variable} ${body.variable}`;
