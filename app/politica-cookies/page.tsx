import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { company } from "@/lib/company";
import { legalPageMeta } from "@/lib/metadatas";

export const metadata = legalPageMeta(
  "Politica de cookies | Slim & Beauty",
  "Ce cookie-uri folosește site-ul Slim & Beauty by MC, de ce le folosim și cum îți poți da sau retrage oricând acordul pentru cookie-urile de analiză.",
  "/politica-cookies"
);

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Politica de cookies">
      <p>
        Cookie-urile sunt fișiere mici pe care un site le salvează în browserul tău. Site-ul www.slimandbeauty.ro,
        administrat de {company.legalName}, folosește cât mai puține: doar cele necesare și, numai dacă accepți,
        cookie-uri de analiză.
      </p>

      <h2>1. Cookie-uri și stocare necesare</h2>
      <p>Acestea fac site-ul să funcționeze și nu pot fi dezactivate din banner.</p>
      <div className="overflow-x-auto mb-4">
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Scop</th>
              <th>Durată</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sb_consent</td>
              <td>Reține dacă ai acceptat sau ai refuzat cookie-urile de analiză.</td>
              <td>6 luni</td>
            </tr>
            <tr>
              <td>announcement:… (stocare locală)</td>
              <td>Reține că ai închis anunțul despre un serviciu nou, ca să nu-l mai afișăm.</td>
              <td>Până o ștergi din browser</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Cookie-uri de analiză (doar cu acordul tău)</h2>
      <p>
        Dacă apeși „Accept”, încărcăm Google Tag Manager și Google Analytics, care ne arată în mod agregat câte persoane
        vizitează site-ul și ce pagini citesc. Dacă apeși „Refuz”, aceste servicii nu se încarcă deloc.
      </p>
      <div className="overflow-x-auto mb-4">
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Furnizor</th>
              <th>Scop</th>
              <th>Durată</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Google</td>
              <td>Deosebește vizitatorii între ei, fără a-i identifica.</td>
              <td>2 ani</td>
            </tr>
            <tr>
              <td>_ga_*</td>
              <td>Google</td>
              <td>Păstrează starea sesiunii de vizitare.</td>
              <td>2 ani</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Nu folosim cookie-uri de publicitate sau de urmărire pentru reclame.
      </p>

      <h3>Harta Google Maps</h3>
      <p>
        Harta din secțiunea „Contact &amp; Locație” se încarcă doar când apeși „Afișează harta”. Din acel moment, Google
        poate seta cookie-uri proprii, conform politicii sale de confidențialitate.
      </p>

      <h2>3. Cum îți schimbi alegerea</h2>
      <p>
        Îți poți da sau retrage acordul oricând, de aici sau din „Setări cookie”, în subsolul fiecărei pagini. Când
        retragi acordul, ștergem cookie-urile de analiză și reîncărcăm pagina.
      </p>
      <p>
        <CookieSettingsButton className="rounded-full border border-pink-500 px-5 py-2.5 font-medium text-pink-600 transition-colors hover:bg-pink-50" />
      </p>
      <p>
        Poți șterge sau bloca cookie-urile și din setările browserului tău. Dacă blochezi toate cookie-urile, site-ul va
        funcționa, dar îți vom cere din nou acordul la fiecare vizită.
      </p>

      <h2>4. Mai multe informații</h2>
      <p>
        Cum prelucrăm datele personale afli din{" "}
        <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>. Pentru întrebări, scrie-ne la{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  );
}
