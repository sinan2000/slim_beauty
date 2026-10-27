import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/company";
import { legalPageMeta } from "@/lib/metadatas";

export const metadata = legalPageMeta(
  "Politica de confidențialitate | Slim & Beauty",
  "Cum prelucrează Slim & Beauty by MC datele tale personale când faci o programare online sau vizitezi site-ul și ce drepturi ai conform GDPR.",
  "/politica-de-confidentialitate"
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Politica de confidențialitate">
      <p>
        Această politică explică ce date personale prelucrăm când vizitezi site-ul www.slimandbeauty.ro sau faci o
        programare online, de ce le prelucrăm, cât timp le păstrăm și ce drepturi ai, conform Regulamentului (UE)
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

      <h3>Programarea online</h3>
      <p>
        Când trimiți formularul de programare colectăm: numele, numărul de telefon, serviciul ales, data și ora
        programării și mesajul opțional. Le folosim pentru a înregistra programarea, pentru a te contacta în legătură
        cu ea și pentru a-ți oferi serviciul solicitat.
      </p>
      <p>
        Temeiul legal este încheierea și executarea contractului de prestări servicii, la cererea ta (art. 6 alin. (1)
        lit. b) GDPR). Fără aceste date nu putem confirma programarea.
      </p>
      <p>
        Te rugăm să nu incluzi în mesaj informații despre sănătatea ta. Dacă un tratament necesită o evaluare, o
        discutăm la salon.
      </p>

      <h3>Protecția formularului</h3>
      <p>
        Pentru a limita programările false, păstrăm temporar adresa IP de la care este trimis formularul, împreună cu
        numărul de încercări. Temeiul este interesul nostru legitim de a proteja serviciul de programări (art. 6 alin.
        (1) lit. f) GDPR). Adresa IP se șterge automat după 24 de ore.
      </p>

      <h3>Statistici de vizitare (doar cu acordul tău)</h3>
      <p>
        Dacă accepți cookie-urile de analiză, folosim Google Analytics (prin Google Tag Manager) pentru a afla, în mod
        agregat, câte persoane vizitează site-ul și ce pagini citesc. Temeiul este consimțământul tău (art. 6 alin. (1)
        lit. a) GDPR), pe care îl poți retrage oricând din „Setări cookie”, în subsolul paginii. Detalii în{" "}
        <Link href="/politica-cookies">Politica de cookies</Link>.
      </p>

      <h3>Când ne contactezi direct</h3>
      <p>
        Dacă ne suni, ne scrii pe e-mail sau pe rețelele sociale, folosim datele pe care ni le trimiți doar pentru a-ți
        răspunde.
      </p>

      <h2>3. Cui transmitem datele</h2>
      <p>Nu vindem datele tale. Le transmitem doar furnizorilor care ne ajută să funcționăm, în calitate de împuterniciți:</p>
      <ul>
        <li>
          <strong>Google</strong> (Google Calendar, unde se înregistrează programările; Google Analytics și Google Tag
          Manager, doar cu acordul tău; Google Maps, doar dacă alegi să afișezi harta);
        </li>
        <li>
          <strong>Vonage</strong>, care ne trimite un SMS de notificare cu detaliile programării;
        </li>
        <li>
          <strong>Vercel</strong>, furnizorul de găzduire al site-ului;
        </li>
        <li>
          <strong>Upstash</strong>, unde se păstrează temporar contorul de programări per adresă IP.
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
        <li>Datele programărilor: cel mult 3 ani de la ultima programare, apoi le ștergem.</li>
        <li>Adresa IP folosită pentru protecția formularului: 24 de ore.</li>
        <li>Datele Google Analytics: cel mult 14 luni.</li>
        <li>Mesajele primite direct: cât este necesar pentru a-ți răspunde.</li>
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
        Site-ul folosește conexiune criptată (HTTPS), iar accesul la programări este limitat la personalul salonului.
      </p>

      <h2>7. Minori</h2>
      <p>
        Programările online sunt destinate persoanelor de peste 16 ani. Pentru minori, programarea se face de către
        părinte sau tutore.
      </p>

      <h2>8. Modificări</h2>
      <p>
        Putem actualiza această politică. Data ultimei actualizări este afișată la începutul paginii.
      </p>
    </LegalPage>
  );
}
