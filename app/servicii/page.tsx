'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Snowflake, Zap, Radio, Wind, Droplet, Scissors, Sparkles, Star, Sun, SprayCan } from 'lucide-react'
import { Service } from '../types';

interface ServiceCardProps {
    service: Service
    index: number
}

interface CategoryProps {
    category: string
    icon: React.ReactNode
}

const services = [
    {
        category: "Proceduri Corporale",
        icon: <Waves className="w-16 h-16 text-primary" />,
        items: [
            {
                icon: <Waves className="w-10 h-10 text-primary" />,
                title: "VShape Anticelulitic",
                shortDescription: "Tratamente pentru reducerea celulitei.",
                longDescription: "VShape Anticelulitic utilizează tehnologie avansată pentru a combate celulita eficient. Acest tratament non-invaziv stimulează producția de colagen, îmbunătățește circulația și reduce aspectul de coajă de portocală al pielii, oferind rezultate vizibile și de lungă durată pentru un contur corporal mai neted și mai ferm."
            },
            {
                icon: <Snowflake className="w-10 h-10 text-primary" />,
                title: "Criolipoliză",
                shortDescription: "Sculptură corporală cu tehnologie avansată de răcire.",
                longDescription: "Criolipoliza este o metodă revoluționară de sculptare corporală care folosește tehnologia de răcire pentru a elimina celulele grase în mod natural. Acest tratament non-chirurgical vizează zonele specifice de grăsime rezistentă, oferind o reducere semnificativă a țesutului adipos și conturând corpul fără timp de recuperare."
            },
            {
                icon: <Zap className="w-10 h-10 text-primary" />,
                title: "EMSlim Neo RF",
                shortDescription: "Tonifiere musculară și slăbire.",
                longDescription: "EMSlim Neo RF combină stimularea electromagnetică cu radiofrecvența pentru a oferi rezultate remarcabile în tonifierea musculară și slăbire. Această tehnologie inovatoare induce contracții musculare puternice, echivalente cu mii de exerciții fizice, simultan cu topirea grăsimilor, rezultând într-o siluetă mai tonifiată și mai suplă."
            },
            {
                icon: <Radio className="w-10 h-10 text-primary" />,
                title: "Radiofrecvență Bipolară",
                shortDescription: "Lifting și regenerare celulară.",
                longDescription: "Radiofrecvența Bipolară este un tratament avansat pentru lifting și regenerare celulară. Prin încălzirea controlată a țesuturilor profunde ale pielii, stimulează producția naturală de colagen și elastină, rezultând într-o piele mai fermă, mai netedă și cu un aspect mai tânăr, fără necesitatea intervențiilor chirurgicale."
            },
            {
                icon: <Wind className="w-10 h-10 text-primary" />,
                title: "Masaj Vacuum Anticelulitic",
                shortDescription: "Reducerea celulitei și tonifierea pielii.",
                longDescription: "Masajul Vacuum Anticelulitic este o tehnică eficientă pentru combaterea celulitei și tonifierea pielii. Prin stimularea circulației sanguine și limfatice, acest tratament ajută la eliminarea toxinelor, reducerea retenției de apă și îmbunătățirea texturii pielii, oferind un aspect mai neted și mai tonic zonelor predispuse la celulită."
            },
            {
                icon: <Droplet className="w-10 h-10 text-primary" />,
                title: "Presoterapie (Drenaj Limfatic)",
                shortDescription: "Eliminarea toxinelor și reducerea retenției de apă.",
                longDescription: "Presoterapia este un tratament de drenaj limfatic care utilizează presiune controlată pentru a stimula circulația limfatică. Acest proces ajută la eliminarea toxinelor, reduce retenția de apă și ameliorează senzația de picioare grele. Rezultatul este o îmbunătățire a circulației, reducerea edemelor și o senzație generală de ușurință și bună dispoziție."
            },
            {
                icon: <Sun className="w-10 h-10 text-primary" />,
                title: "Cavitatie",
                shortDescription: "Ultrasunete pentru eliminarea celulitei.",
                longDescription: "Cavitația utilizează tehnologia ultrasunetelor pentru a targeta și elimina celulele grase și celulita. Acest tratament non-invaziv creează microbule în țesutul adipos, care implodează și distrug celulele grase, permițând corpului să le elimine în mod natural. Rezultatul este o reducere vizibilă a circumferinței și o îmbunătățire a texturii pielii."
            },
            {
                icon: <Sparkles className="w-10 h-10 text-primary" />,
                title: "Împachetări Tunel IR",
                shortDescription: "Tratament pentru detoxifiere și pierdere în greutate.",
                longDescription: "Împachetările Tunel IR combină beneficiile termoterapiei cu acțiunea infraroșiilor pentru o detoxifiere profundă și pierdere în greutate. Acest tratament stimulează metabolismul, crește circulația sanguină și ajută la eliminarea toxinelor, rezultând într-o piele mai fermă, reducerea celulitei și o siluetă mai zveltă."
            },
            {
                icon: <SprayCan className="w-10 h-10 text-primary" />,
                title: "Bronzare Organică cu DHA",
                shortDescription: "Bronzare sănătoasă și naturală fără raze UV.",
                longDescription: "Bronzarea Organică cu DHA oferă o alternativă sigură și sănătoasă la expunerea la soare sau la solariu. Utilizând ingrediente naturale și DHA (dihydroxyacetone), acest tratament oferă un bronz uniform și natural, fără riscurile asociate cu expunerea la raze UV. Rezultatul este o piele frumos bronzată, hidratată și protejată."
            }
        ]
    },
    {
        category: "Dermato Cosmetică",
        icon: <Sparkles className="w-16 h-16 text-primary" />,
        items: [
            {
                icon: <Scissors className="w-10 h-10 text-primary" />,
                title: "Dermapen cu Microneedling",
                shortDescription: "Rejuvenare și regenerare cutanată.",
                longDescription: "Dermapen cu Microneedling este o tehnică avansată de rejuvenare a pielii care utilizează micro-ace fine pentru a stimula producția naturală de colagen și elastină. Acest tratament îmbunătățește textura pielii, reduce cicatricile și liniile fine, și promovează o piele mai luminoasă și mai tânără. Rezultatele includ o piele mai fermă, mai netedă și cu un aspect radiant."
            },
            {
                icon: <Star className="w-10 h-10 text-primary" />,
                title: "Microdermabraziune",
                shortDescription: "Exfoliere și curățare profundă a pielii.",
                longDescription: "Microdermabraziunea este o procedură de exfoliere mecanică care îndepărtează delicat stratul superior al pielii moarte. Acest tratament stimulează reînnoirea celulară, îmbunătățește textura pielii și reduce aspectul porilor dilatați, al liniilor fine și al hiperpigmentării. Rezultatul este o piele mai netedă, mai luminoasă și cu un aspect mai tânăr."
            },
            {
                icon: <Sparkles className="w-10 h-10 text-primary" />,
                title: "Tratament Clasic de Curățire",
                shortDescription: "Curățare facială în profunzime.",
                longDescription: "Tratamentul Clasic de Curățire oferă o îngrijire completă a pielii, combinând curățarea profundă cu hidratarea intensivă. Acest tratament elimină impuritățile, desfundă porii și echilibrează producția de sebum, lăsând pielea curată, catifelată și revitalizată. Ideal pentru toate tipurile de piele, acest tratament oferă o bază perfectă pentru o rutină de îngrijire eficientă."
            }
        ]
    }
]

const ServiceCard = ({ service, index }: ServiceCardProps) => {
    const isEven = index % 2 === 0
    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''} mb-16`}
        >
            <div className={`lg:w-2/3 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            {service.icon}
                            <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                        </div>
                        <CardDescription className="text-lg text-gray-600">{service.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{service.longDescription}</p>
                    </CardContent>
                </Card>
            </div>
            <div className={`lg:w-1/3 flex justify-center items-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'} mt-8 lg:mt-0`}>
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {service.icon}
                </div>
            </div>
        </motion.div>
    )
}

const CategoryHeader = ({ category, icon }: CategoryProps) => (
    <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16"
    >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            {icon}
        </div>
        <h2 className="text-3xl font-semibold text-center text-primary">{category}</h2>
    </motion.div>
)

const Divider = () => (
    <div className="flex justify-center my-16">
        <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
    </div>
)

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] pt-[90px] py-16 px-4 sm:px-6 lg:px-8">
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
                        <CategoryHeader category={category.category} icon={category.icon} />
                        {category.items.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} />
                        ))}
                        {categoryIndex < services.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}