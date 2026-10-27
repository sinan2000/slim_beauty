import { Geist, Instrument_Serif } from "next/font/google";
import { SculptHero } from "./hero";
import { Contact, Featured, Footer, MobileContactBar, Nav, Prices, Reassurance, Results, Reviews, styles } from "./sections";

const display = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--b-font-display" });
const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--b-font-sans" });

export default function PreviewSculpt() {
  return (
    <div className={`b-root ${display.variable} ${sans.variable}`}>
      <style>{styles}</style>
      <Nav />
      <main>
        <SculptHero />
        <Featured />
        <Prices />
        <Results />
        <Reassurance />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
