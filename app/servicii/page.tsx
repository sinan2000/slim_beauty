'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const services = [
    {
        category: "Proceduri Corporale",
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

interface Service {
    icon: JSX.Element;
    title: string;
    shortDescription: string;
    longDescription: string;
    fact: string;
}

const ServiceCard = ({ service, index, category }: { service: Service; index: number; category: string }) => {
    const isBodyTreatment = category === "Proceduri Corporale"
    
    return (
        <motion.div
            initial={{ opacity: 0, x: isBodyTreatment ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col lg:flex-row items-center ${isBodyTreatment ? '' : 'lg:flex-row-reverse'} mb-16`}
        >
            <div className={`lg:w-2/3 ${isBodyTreatment ? 'lg:pr-8' : 'lg:pl-8'}`}>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/10">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            {service.icon}
                            <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                        </div>
                        <CardDescription className="text-lg text-gray-600">{service.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-4">{service.longDescription}</p>
                        <div className="bg-secondary/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-primary mb-2">Știați că?</h4>
                            <p className="text-sm text-gray-600">{service.fact}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={`lg:w-1/3 flex justify-center items-center ${isBodyTreatment ? 'lg:justify-end' : 'lg:justify-start'} mt-8 lg:mt-0`}>
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {service.icon}
                </div>
            </div>
        </motion.div>
    )
}

const CategoryHeader = ({ category }: { category: string }) => (
    <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16"
    >
        <h2 className="text-3xl font-semibold text-center text-primary">{category}</h2>
    </motion.div>
)

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EBE6] to-[#FDF8F5] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
                >
                    Serviciile Noastre
                </motion.h1>
                {services.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                        <CategoryHeader category={category.category} />
                        {category.items.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} category={category.category} />
                        ))}
                        {categoryIndex < services.length - 1 && (
                            <div className="flex justify-center my-16">
                                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}