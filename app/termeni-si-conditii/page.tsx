import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/company";
import { legalPageMeta } from "@/lib/metadatas";

export const metadata = legalPageMeta(
  "Termeni și condiții | Slim & Beauty",
  "Termenii de utilizare a site-ului Slim & Beauty by MC: programări online, prețuri, tratamente, reclamații și soluționarea alternativă a litigiilor.",
  "/termeni-si-conditii"
);

export default function TermsPage() {
  return (
    <LegalPage title="Termeni și condiții">
      <p>
        Folosind site-ul www.slimandbeauty.ro accepți termenii de mai jos. Te rugăm să îi citești înainte de a face o
        programare.
      </p>

      <h2>1. Cine suntem</h2>
      <p>
        Site-ul este administrat de <strong>{company.legalName}</strong>, CUI {company.cui}, Nr. Reg. Com.{" "}
        {company.regCom}, cu sediul în {company.address}. Telefon: <a href={company.phoneHref}>{company.phone}</a>,
        e-mail: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>2. Programări online</h2>
      <p>
        Prin formularul de pe site poți solicita o programare pentru unul dintre serviciile salonului. Programarea este
        gratuită și nu presupune nicio plată online. Este înregistrată după ce primești pe ecran mesajul de confirmare.
      </p>
      <p>
        Dacă este nevoie, te putem contacta telefonic pentru a confirma, muta sau completa programarea. Te rugăm să
        introduci un număr de telefon corect.
      </p>
      <p>
        Dacă nu poți ajunge, te rugăm să ne anunți telefonic cât mai din timp, ca să putem oferi intervalul altei
        persoane.
      </p>

      <h2>3. Prețuri și plată</h2>
      <p>
        Prețurile afișate pe site sunt în lei (RON) și sunt prețurile finale.{" "}
        {company.vatPayer ? "Prețurile includ TVA." : `${company.legalName} nu este plătitoare de TVA.`}
      </p>
      <p>
        Pentru unele tratamente prețul se stabilește după o evaluare la salon; în aceste cazuri afișăm „La evaluare”.
        Plata se face la salon. Putem modifica prețurile, dar prețul comunicat la
        programare rămâne valabil pentru acea programare.
      </p>

      <h2>4. Tratamente și rezultate</h2>
      <p>
        Informațiile despre tratamente de pe site au caracter general și nu înlocuiesc sfatul unui medic. Înaintea
        tratamentelor facem o evaluare și te întrebăm despre eventualele contraindicații. Te rugăm să ne spui sincer
        orice problemă de sănătate relevantă.
      </p>
      <p>
        Rezultatele diferă de la o persoană la alta și depind de numărul de ședințe, de stilul de viață și de
        particularitățile fiecăruia. Fotografiile „înainte și după” ilustrează rezultatele unor cliente și nu reprezintă
        o garanție.
      </p>

      <h2>5. Conținutul site-ului</h2>
      <p>
        Textele, fotografiile și logo-ul de pe site aparțin {company.legalName} sau sunt folosite cu acordul
        proprietarilor lor. Nu le poți copia sau folosi în scop comercial fără acordul nostru scris.
      </p>
      <p>
        Ne străduim ca informațiile de pe site să fie corecte și actuale, dar pot apărea erori. Site-ul conține
        link-uri către alte site-uri (de exemplu, rețele sociale), pentru al căror conținut nu răspundem.
      </p>

      <h2>6. Date personale și cookie-uri</h2>
      <p>
        Cum prelucrăm datele tale este descris în{" "}
        <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link> și în{" "}
        <Link href="/politica-cookies">Politica de cookies</Link>.
      </p>

      <h2>7. Reclamații și soluționarea litigiilor</h2>
      <p>
        Dacă nu ești mulțumit(ă) de un serviciu, spune-ne la salon, la telefon{" "}
        <a href={company.phoneHref}>{company.phone}</a> sau la{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>. Încercăm să găsim împreună o soluție.
      </p>
      <p>
        Te poți adresa și Autorității Naționale pentru Protecția Consumatorilor (
        <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">
          anpc.ro
        </a>
        ) sau poți folosi procedura de soluționare alternativă a litigiilor (SAL):{" "}
        <a href="https://reclamatiisal.anpc.ro" target="_blank" rel="noopener noreferrer">
          reclamatiisal.anpc.ro
        </a>
        .
      </p>

      <h2>8. Legea aplicabilă</h2>
      <p>
        Acești termeni sunt guvernați de legea română. Litigiile care nu se rezolvă pe cale amiabilă sunt soluționate de
        instanțele competente din România.
      </p>
    </LegalPage>
  );
}
