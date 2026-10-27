import { Fraunces, Instrument_Sans } from "next/font/google";
import "./editorial.css";
import { Hero } from "./_components/hero";
import { Nav, Marquee, MobileContactBar, Footer } from "./_components/chrome";
import { Featured } from "./_components/featured";
import { ServiceIndex } from "./_components/service-index";
import { BeforeAfter } from "./_components/before-after";
import { Reassure, Reviews, Contact } from "./_components/sections";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-ed-display",
});

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ed-sans",
});

export const metadata = {
  title: "Direcția C · Editorial | Slim & Beauty",
};

export default function EditorialPreview() {
  return (
    <div className={`ed-root ${display.variable} ${sans.variable} min-h-dvh`}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Featured />
        <ServiceIndex />
        <BeforeAfter />
        <Reassure />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
