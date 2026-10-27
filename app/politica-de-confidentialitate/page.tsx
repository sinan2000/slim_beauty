import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/company";
import { legalPageMeta } from "@/lib/metadatas";

export const metadata = legalPageMeta(
  "Politica de confidențialitate | Slim & Beauty",
  "Cum prelucrează Slim & Beauty by MC datele tale personale când vizitezi site-ul sau ne contactezi pentru o programare și ce drepturi ai conform GDPR.",
  "/politica-de-confidentialitate"
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Politica de confidențialitate">
      <p>
        Această politică explică ce date personale prelucrăm când vizitezi site-ul www.slimandbeauty.ro sau ne
        contactezi pentru o programare, de ce le prelucrăm, cât timp le păstrăm și ce drepturi ai, conform Regulamentului (UE)
        2016/679 (GDPR).
      </p>

      <h2>1. Cine suntem</h2>
      <p>
        Operatorul datelor este <strong>{company.legalName}</strong>, CUI {company.cui}, Nr. Reg. Com.{" "}
        {company.regCom}, cu sediul în {company.address} („Slim & Beauty”, „noi”).
      </p>
      <p>
        Ne poți contacta pentru orice întrebare despre datele tale la telefon{" "}
        <a href={company.phoneHref}>{company.phone}</a> sau la e-mail{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>2. Ce date prelucrăm și de ce</h2>

      <p>
        Site-ul nu are formulare și nu îți cere date personale. Programările se fac telefonic sau prin mesaj.
      </p>

      <h3>Programări și mesaje</h3>
      <p>
        Când ne suni, ne scrii pe e-mail, pe WhatsApp sau pe rețelele sociale pentru o programare, folosim datele pe
        care ni le dai (de obicei numele, numărul de telefon și serviciul dorit) ca să stabilim programarea, să te
        contactăm în legătură cu ea și să îți oferim serviciul. Temeiul legal este încheierea și executarea
        contractului de prestări servicii, la cererea ta (art. 6 alin. (1) lit. b) GDPR).
      </p>
      <p>
        Te rugăm să nu ne trimiți în scris informații despre sănătatea ta. Dacă un tratament necesită o evaluare, o
        discutăm la salon.
      </p>

      <h3>Funcționarea site-ului</h3>
      <p>
        Ca orice site, serverul primește tehnic adresa IP și tipul browserului tău pentru a afișa paginile și a le
        proteja de abuzuri. Temeiul este interesul nostru legitim de a avea un site funcțional și sigur (art. 6 alin. (1)
        lit. f) GDPR).
      </p>

      <h3>Statistici de vizitare (doar cu acordul tău)</h3>
      <p>
        Dacă accepți cookie-urile de analiză, folosim Google Analytics (prin Google Tag Manager) pentru a afla, în mod
        agregat, câte persoane vizitează site-ul și ce pagini citesc. Temeiul este consimțământul tău (art. 6 alin. (1)
        lit. a) GDPR), pe care îl poți retrage oricând din „Setări cookie”, în subsolul paginii. Detalii în{" "}
        <Link href="/politica-cookies">Politica de cookies</Link>.
      </p>

      <h2>3. Cui transmitem datele</h2>
      <p>Nu vindem datele tale. Le transmitem doar furnizorilor care ne ajută să funcționăm, în calitate de împuterniciți:</p>
      <ul>
        <li>
          <strong>Google</strong> (Google Analytics și Google Tag Manager, doar cu acordul tău; Google Maps, doar dacă
          alegi să afișezi harta);
        </li>
        <li>
          <strong>Vercel</strong>, furnizorul de găzduire al site-ului.
        </li>
      </ul>
      <p>
        Putem transmite date autorităților doar atunci când legea ne obligă.
      </p>
      <p>
        Unii dintre acești furnizori pot prelucra date în afara Spațiului Economic European (de exemplu, în SUA). În
        aceste cazuri, transferul se face pe baza Cadrului UE–SUA privind protecția datelor sau a clauzelor contractuale
        standard aprobate de Comisia Europeană.
      </p>

      <h2>4. Cât timp păstrăm datele</h2>
      <ul>
        <li>Datele programărilor și mesajele: cât este necesar pentru programare și pentru a-ți răspunde.</li>
        <li>Datele Google Analytics: cel mult 14 luni.</li>
      </ul>
      <p>Putem păstra datele mai mult doar dacă o lege ne obligă.</p>

      <h2>5. Drepturile tale</h2>
      <p>Conform GDPR, ai dreptul:</p>
      <ul>
        <li>să afli ce date avem despre tine și să primești o copie (dreptul de acces);</li>
        <li>să ceri corectarea datelor greșite (dreptul la rectificare);</li>
        <li>să ceri ștergerea datelor (dreptul la ștergere);</li>
        <li>să ceri restricționarea prelucrării;</li>
        <li>să primești datele într-un format structurat (dreptul la portabilitate);</li>
        <li>să te opui prelucrării bazate pe interesul nostru legitim;</li>
        <li>să îți retragi oricând consimțământul, fără a afecta prelucrarea făcută până atunci.</li>
      </ul>
      <p>
        Pentru oricare dintre aceste drepturi, scrie-ne la <a href={`mailto:${company.email}`}>{company.email}</a> sau
        sună-ne la <a href={company.phoneHref}>{company.phone}</a>. Îți răspundem în cel mult o lună.
      </p>
      <p>
        Dacă consideri că ți-au fost încălcate drepturile, poți depune o plângere la Autoritatea Națională de
        Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP),{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">
          www.dataprotection.ro
        </a>
        .
      </p>

      <h2>6. Securitatea datelor</h2>
      <p>
        Site-ul folosește conexiune criptată (HTTPS), iar datele programărilor sunt accesibile doar personalului
        salonului.
      </p>

      <h2>7. Modificări</h2>
      <p>
        Putem actualiza această politică. Data ultimei actualizări este afișată la începutul paginii.
      </p>
    </LegalPage>
  );
}
