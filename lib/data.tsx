import { Icon } from '@mdi/react'
import {
    mdiWaveform,
    mdiSnowflakeAlert,
    mdiArmFlex,
    mdiWifi,
    mdiVacuum,
    mdiBloodBag,
    mdiSignalVariant,
    mdiRadioboxMarked,
    mdiWhiteBalanceSunny,
    mdiNeedle,
    mdiWaterCircle,
    mdiFaceWomanOutline
} from '@mdi/js'

export const services = [
    {
        category: "Remodelare Corporală",
        items: [
            {
                icon: <Icon path={mdiWaveform} size={2} className="text-primary mb-4" />,
                title: "VShape Anticelulitic",
                shortDescription: "Tratamente pentru reducerea celulitei.",
                longDescription: "VShape Anticelulitic utilizează tehnologie avansată pentru a combate celulita eficient. Acest tratament non-invaziv stimulează producția de colagen, îmbunătățește circulația și reduce aspectul de coajă de portocală al pielii, oferind rezultate vizibile și de lungă durată pentru un contur corporal mai neted și mai ferm.",
                fact: "Știați că 90% dintre femei experimentează celulită la un moment dat în viața lor? Celulita apare atunci când celulele adipoase împing țesutul conjunctiv al pielii, iar tratamentele anticelulitice ajută la netezirea pielii."
            },
            {
                icon: <Icon path={mdiSnowflakeAlert} size={2} className="text-primary mb-4" />,
                title: "Criolipoliză",
                shortDescription: "Sculptură corporală cu tehnologie avansată de răcire.",
                longDescription: "Criolipoliza este o metodă revoluționară de sculptare corporală care folosește tehnologia de răcire pentru a elimina celulele grase în mod natural. Acest tratament non-chirurgical vizează zonele specifice de grăsime rezistentă, oferind o reducere semnificativă a țesutului adipos și conturând corpul fără timp de recuperare.",
                fact: "Celulele grase sunt mai vulnerabile la frig decât alte celule din corp, motiv pentru care criolipoliza elimină grăsimea fără a afecta țesuturile din jur."
            },
            {
                icon: <Icon path={mdiArmFlex} size={2} className="text-primary mb-4" />,
                title: "EMSlim Neo RF",
                shortDescription: "Tonifiere musculară și slăbire.",
                longDescription: "EMSlim Neo RF combină stimularea electromagnetică cu radiofrecvența pentru a oferi rezultate remarcabile în tonifierea musculară și slăbire. Această tehnologie inovatoare induce contracții musculare puternice, echivalente cu mii de exerciții fizice, simultan cu topirea grăsimilor, rezultând într-o siluetă mai tonifiată și mai suplă.",
                fact: "O ședință EMSlim echivalează cu contracțiile musculare obținute din 20.000 de abdomene!"
            },
            {
                icon: <Icon path={mdiWifi} size={2} className="text-primary mb-4" />,
                title: "Radiofrecvență Bipolară",
                shortDescription: "Lifting și regenerare celulară.",
                longDescription: "Radiofrecvența Bipolară este un tratament avansat pentru lifting și regenerare celulară. Prin încălzirea controlată a țesuturilor profunde ale pielii, stimulează producția naturală de colagen și elastină, rezultând într-o piele mai fermă, mai netedă și cu un aspect mai tânăr, fără necesitatea intervențiilor chirurgicale.",
                fact: "Tratamentul stimulează producția de colagen, proteina responsabilă pentru structura și elasticitatea pielii, care scade odată cu înaintarea în vârstă."
            },
            {
                icon: <Icon path={mdiVacuum} size={2} className="text-primary mb-4" />,
                title: "Masaj Vacuum Anticelulitic",
                shortDescription: "Reducerea celulitei și tonifierea pielii.",
                longDescription: "Masajul Vacuum Anticelulitic este o tehnică eficientă pentru combaterea celulitei și tonifierea pielii. Prin stimularea circulației sanguine și limfatice, acest tratament ajută la eliminarea toxinelor, reducerea retenției de apă și îmbunătățirea texturii pielii, oferind un aspect mai neted și mai tonic zonelor predispuse la celulită.",
                fact: "Masajul cu vacuum ajută la îmbunătățirea drenajului limfatic, care elimină toxinele și reduc retenția de apă."
            },
            {
                icon: <Icon path={mdiBloodBag} size={2} className="text-primary mb-4" />,
                title: "Presoterapie (Drenaj Limfatic)",
                shortDescription: "Eliminarea toxinelor și reducerea retenției de apă.",
                longDescription: "Presoterapia este un tratament de drenaj limfatic care utilizează presiune controlată pentru a stimula circulația limfatică. Acest proces ajută la eliminarea toxinelor, reduce retenția de apă și ameliorează senzația de picioare grele. Rezultatul este o îmbunătățire a circulației, reducerea edemelor și o senzație generală de ușurință și bună dispoziție.",
                fact: "Sistemul limfatic ajută corpul să elimine toxinele și deșeurile, iar stimularea acestuia prin presoterapie poate întări imunitatea."
            },
            {
                icon: <Icon path={mdiSignalVariant} size={2} className="text-primary mb-4" />,
                title: "Cavitatie",
                shortDescription: "Ultrasunete pentru eliminarea celulitei.",
                longDescription: "Cavitația utilizează tehnologia ultrasunetelor pentru a targeta și elimina celulele grase și celulita. Acest tratament non-invaziv creează microbule în țesutul adipos, care implodează și distrug celulele grase, permițând corpului să le elimine în mod natural. Rezultatul este o reducere vizibilă a circumferinței și o îmbunătățire a texturii pielii.",
                fact: "Celulele grase pot fi eliminate în mod natural de corp după ce sunt dezmembrate prin cavitație."
            },
            {
                icon: <Icon path={mdiRadioboxMarked} size={2} className="text-primary mb-4" />,
                title: "Împachetări Tunel IR",
                shortDescription: "Tratament pentru detoxifiere și pierdere în greutate.",
                longDescription: "Împachetările Tunel IR combină beneficiile termoterapiei cu acțiunea infraroșiilor pentru o detoxifiere profundă și pierdere în greutate. Acest tratament stimulează metabolismul, crește circulația sanguină și ajută la eliminarea toxinelor, rezultând într-o piele mai fermă, reducerea celulitei și o siluetă mai zveltă.",
                fact: "Căldura infraroșie poate penetra până la 1.5 inci în țesuturi, stimulând metabolismul și detoxifierea."
            },
            {
                icon: <Icon path={mdiWhiteBalanceSunny} size={2} className="text-primary mb-4" />,
                title: "Bronzare Organică cu DHA",
                shortDescription: "Bronzare sănătoasă și naturală fără raze UV.",
                longDescription: "Bronzarea Organică cu DHA oferă o alternativă sigură și sănătoasă la expunerea la soare sau la solariu. Utilizând ingrediente naturale și DHA (dihydroxyacetone), acest tratament oferă un bronz uniform și natural, fără riscurile asociate cu expunerea la raze UV. Rezultatul este o piele frumos bronzată, hidratată și protejată.",
                fact: "DHA este derivat din trestie de zahăr și reacționează cu aminoacizii din piele pentru a produce un bronz temporar fără riscuri UV."
            }
        ]
    },
    {
        category: "Dermato Cosmetică",
        items: [
            {
                icon: <Icon path={mdiNeedle} size={2} className="text-primary mb-4" />,
                title: "Dermapen cu Microneedling",
                shortDescription: "Rejuvenare și regenerare cutanată.",
                longDescription: "Dermapen cu Microneedling este o tehnică avansată de rejuvenare a pielii care utilizează micro-ace fine pentru a stimula producția naturală de colagen și elastină. Acest tratament îmbunătățește textura pielii, reduce cicatricile și liniile fine, și promovează o piele mai luminoasă și mai tânără. Rezultatele includ o piele mai fermă, mai netedă și cu un aspect radiant.",
                fact: "Microneedling-ul stimulează producția naturală de colagen cu până la 400% în primele șase luni după tratament."
            },
            {
                icon: <Icon path={mdiWaterCircle} size={2} className="text-primary mb-4" />,
                title: "Microdermabraziune",
                shortDescription: "Exfoliere și curățare profundă a pielii.",
                longDescription: "Microdermabraziunea este o procedură de exfoliere mecanică care îndepărtează delicat stratul superior al pielii moarte. Acest tratament stimulează reînnoirea celulară, îmbunătățește textura pielii și reduce aspectul porilor dilatați, al liniilor fine și al hiperpigmentării. Rezultatul este o piele mai netedă, mai luminoasă și cu un aspect mai tânăr.",
                fact: "Pielea se regenerează complet la fiecare 28 de zile, iar microdermabraziunea accelerează acest proces natural."
            },
            {
                icon: <Icon path={mdiFaceWomanOutline} size={2} className="text-primary mb-4" />,
                title: "Tratament Clasic de Curățire",
                shortDescription: "Curățare facială în profunzime.",
                longDescription: "Tratamentul Clasic de Curățire oferă o îngrijire completă a pielii, combinând curățarea profundă cu hidratarea intensivă. Acest tratament elimină impuritățile, desfundă porii și echilibrează producția de sebum, lăsând pielea curată, catifelată și revitalizată. Ideal pentru toate tipurile de piele, acest tratament oferă o bază perfectă pentru o rutină de îngrijire eficientă.",
                fact: "Pielea produce în mod natural aproximativ 1 litru de sebum pe an, iar curățarea regulată ajută la menținerea echilibrului natural al pielii."
            }
        ]
    }
]