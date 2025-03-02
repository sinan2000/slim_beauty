"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, Info, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Service data
const servicesData = {
  'remodelare-corporala': {
    title: 'Remodelare Corporală',
    services: {
      'emslim-neo': {
        name: 'EMSlim Neo RF',
        shortDescription: 'Tehnologie avansată pentru tonifierea musculară și reducerea grăsimii simultan.',
        longDescription: `
          <p>EMSlim Neo RF este un tratament revoluționar care combină tehnologia HIFEM (High-Intensity Focused Electromagnetic) cu radiofrecvența pentru a oferi rezultate remarcabile în tonifierea musculară și reducerea grăsimii.</p>
          
          <p>Acest tratament non-invaziv stimulează contracțiile musculare supramaximale, care nu pot fi obținute prin exerciții fizice obișnuite. În timpul unei singure sesiuni de 30 de minute, mușchii din zona tratată efectuează echivalentul a mii de contracții, ceea ce duce la creșterea densității și volumului muscular.</p>
          
          <p>Simultan, radiofrecvența încălzește țesutul adipos la temperaturi care declanșează apoptoza (moartea celulară programată) a celulelor de grăsime, care sunt apoi eliminate natural de organism în săptămânile următoare tratamentului.</p>
        `,
        images: [
          'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1518310952931-b1de897abd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        prices: [
          { sessions: 1, price: '€150', description: 'Sesiune unică pentru testare' },
          { sessions: 6, price: '€750', description: 'Pachet recomandat pentru rezultate optime', recommended: true },
          { sessions: 10, price: '€1200', description: 'Pachet intensiv pentru rezultate maxime' }
        ],
        benefits: [
          'Creșterea masei musculare cu până la 25%',
          'Reducerea grăsimii cu până la 30%',
          'Îmbunătățirea tonusului și fermității pielii',
          'Tratament non-invaziv, fără timp de recuperare',
          'Rezultate vizibile după doar 2-3 sesiuni',
          'Eficient pentru abdomen, fese, coapse și brațe'
        ],
        didYouKnow: 'O singură sesiune de EMSlim Neo RF este echivalentă cu efectuarea a aproximativ 20.000 de abdomene sau genuflexiuni, ceva imposibil de realizat într-un antrenament obișnuit.',
        faq: [
          {
            question: 'Este tratamentul EMSlim Neo RF dureros?',
            answer: 'Nu, tratamentul nu este dureros. Veți simți contracții musculare intense și o senzație de căldură datorită radiofrecvenței, dar majoritatea clienților descriu experiența ca fiind confortabilă.'
          },
          {
            question: 'Cât timp durează o sesiune?',
            answer: 'O sesiune standard durează aproximativ 30 de minute per zonă tratată.'
          },
          {
            question: 'Când voi vedea rezultatele?',
            answer: 'Mulți clienți raportează că simt zona mai tonifiată imediat după tratament. Rezultatele vizibile încep să apară după 2-3 sesiuni, iar rezultatele optime sunt vizibile la 2-3 luni după finalizarea pachetului recomandat de 6 sesiuni.'
          },
          {
            question: 'Cât timp durează rezultatele?',
            answer: 'Rezultatele pot dura 6-12 luni sau chiar mai mult, în funcție de stilul de viață. Recomandăm sesiuni de întreținere la fiecare 3-6 luni pentru menținerea rezultatelor pe termen lung.'
          },
          {
            question: 'Este tratamentul potrivit pentru oricine?',
            answer: 'Deși este sigur pentru majoritatea persoanelor, tratamentul nu este recomandat pentru femeile însărcinate, persoanele cu implanturi metalice în zona tratată, pacienții cu afecțiuni cardiace severe sau persoanele cu epilepsie.'
          }
        ]
      },
      'cryolipolysis': {
        name: 'Cryolipolysis',
        shortDescription: 'Tehnologie non-invazivă de înghețare a celulelor adipoase pentru reducerea grăsimii localizate.',
        longDescription: `
          <p>Cryolipolysis, cunoscută și sub numele de "slăbire prin înghețare", este o procedură non-invazivă care utilizează temperaturi scăzute controlate pentru a elimina celulele de grăsime rezistente la dietă și exerciții fizice.</p>
          
          <p>Această tehnologie inovatoare se bazează pe principiul că celulele de grăsime sunt mai sensibile la frig decât țesuturile înconjurătoare. În timpul tratamentului, zona vizată este aspirată într-un aplicator care răcește țesutul adipos la temperaturi care declanșează apoptoza (moartea celulară programată) a celulelor de grăsime, fără a afecta pielea sau alte țesuturi.</p>
          
          <p>După tratament, organismul elimină natural celulele de grăsime moarte prin sistemul limfatic în decurs de câteva săptămâni până la câteva luni, rezultând o reducere vizibilă a stratului de grăsime din zona tratată.</p>
        `,
        images: [
          'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        prices: [
          { sessions: 1, price: '€180', description: 'Sesiune unică pentru o zonă' },
          { sessions: 3, price: '€480', description: 'Pachet recomandat pentru rezultate optime', recommended: true },
          { sessions: 6, price: '€900', description: 'Pachet intensiv pentru multiple zone' }
        ],
        benefits: [
          'Reducerea grăsimii localizate cu până la 25% per sesiune',
          'Tratament non-invaziv, fără injecții sau intervenții chirurgicale',
          'Fără timp de recuperare, puteți reveni imediat la activitățile zilnice',
          'Rezultate naturale și de lungă durată',
          'Eficient pentru abdomen, flanc, spate, brațe și coapse',
          'Îmbunătățirea conturului corporal'
        ],
        didYouKnow: 'Tehnologia Cryolipolysis a fost descoperită accidental când cercetătorii au observat că copiii care consumau înghețată pe băț dezvoltau adesea gropi în obraji - un fenomen numit "popsicle panniculitis" care demonstrează că frigul poate elimina celulele de grăsime.',
        faq: [
          {
            question: 'Este tratamentul Cryolipolysis dureros?',
            answer: 'În primele minute, veți simți un disconfort intens datorită frigului și aspirației, dar această senzație dispare rapid pe măsură ce zona se amorțește. După tratament, pot apărea roșeață, vânătăi ușoare sau amorțeală temporară.'
          },
          {
            question: 'Cât timp durează o sesiune?',
            answer: 'O sesiune standard durează aproximativ 35-60 de minute per zonă tratată.'
          },
          {
            question: 'Când voi vedea rezultatele?',
            answer: 'Rezultatele încep să fie vizibile după aproximativ 3 săptămâni, cu îmbunătățiri continue timp de până la 3 luni după tratament, pe măsură ce organismul elimină celulele de grăsime moarte.'
          },
          {
            question: 'Câte sesiuni sunt necesare?',
            answer: 'Pentru majoritatea clienților, recomandăm 1-3 sesiuni per zonă, în funcție de cantitatea de grăsime și de rezultatele dorite. Sesiunile sunt programate la intervale de 4-6 săptămâni.'
          },
          {
            question: 'Celulele de grăsime vor reveni după tratament?',
            answer: 'Celulele de grăsime eliminate prin Cryolipolysis nu revin. Cu toate acestea, celulele rămase pot crește în dimensiune dacă nu mențineți un stil de viață sănătos.'
          }
        ]
      },
      'vacuum-therapy': {
        name: 'Vacuum Therapy',
        shortDescription: 'Masaj cu vacuum pentru îmbunătățirea circulației și reducerea celulitei.',
        longDescription: `
          <p>Terapia cu vacuum este o metodă non-invazivă de modelare corporală care utilizează presiune negativă (vacuum) pentru a stimula țesuturile profunde și a îmbunătăți aspectul pielii afectate de celulită.</p>
          
          <p>În timpul tratamentului, un dispozitiv special cu ventuze creează un vacuum care ridică pielea și țesutul subcutanat, stimulând circulația sanguină și limfatică. Acest proces ajută la eliminarea toxinelor, reducerea retenției de apă și îmbunătățirea metabolismului celular în zonele tratate.</p>
          
          <p>Masajul cu vacuum este deosebit de eficient pentru tratarea celulitei, deoarece descompune depozitele de grăsime, stimulează producția de colagen și elastină, și îmbunătățește textura și fermitatea pielii.</p>
        `,
        images: [
          'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
          'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        prices: [
          { sessions: 1, price: '€90', description: 'Sesiune unică pentru testare' },
          { sessions: 5, price: '€400', description: 'Pachet recomandat pentru rezultate vizibile', recommended: true },
          { sessions: 10, price: '€750', description: 'Pachet intensiv pentru rezultate maxime' }
        ],
        benefits: [
          'Reducerea vizibilă a celulitei',
          'Îmbunătățirea circulației sanguine și limfatice',
          'Eliminarea toxinelor și a retenției de apă',
          'Tonifierea și fermitatea pielii',
          'Reducerea circumferinței în zonele tratate',
          'Tratament relaxant și non-invaziv'
        ],
        didYouKnow: 'Terapia cu vacuum a fost folosită inițial în medicina tradițională chineză sub forma "cupping therapy" (terapia cu ventuze) pentru a trata diverse afecțiuni. Versiunea modernă pentru tratamente estetice a fost dezvoltată în anii 1970.',
        faq: [
          {
            question: 'Este terapia cu vacuum dureroasă?',
            answer: 'Tratamentul nu este dureros, dar puteți simți o senzație intensă de aspirare și masaj. Intensitatea poate fi ajustată în funcție de confortul dumneavoastră.'
          },
          {
            question: 'Cât timp durează o sesiune?',
            answer: 'O sesiune standard durează aproximativ 30-45 de minute, în funcție de zona tratată.'
          },
          {
            question: 'Când voi vedea rezultatele?',
            answer: 'Mulți clienți observă o îmbunătățire a texturii pielii și o reducere a retenției de apă chiar după prima sesiune. Pentru rezultate optime în reducerea celulitei, sunt recomandate 5-10 sesiuni.'
          },
          {
            question: 'Cât de des pot face tratamentul?',
            answer: 'Recomandăm sesiuni de 1-2 ori pe săptămână pentru rezultate optime. După atingerea rezultatelor dorite, sesiuni lunare de întreținere pot ajuta la menținerea acestora.'
          },
          {
            question: 'Există efecte secundare?',
            answer: 'Efectele secundare sunt minime și temporare, putând include roșeață, vânătăi ușoare sau sensibilitate în zona tratată. Acestea dispar de obicei în câteva ore până la câteva zile.'
          }
        ]
      }
    }
  },
  'dermatocosmetica': {
    title: 'Dermatocosmetică',
    services: {
      'hydrafacial': {
        name: 'Hydrafacial Deluxe',
        shortDescription: 'Tratament facial avansat pentru curățare, exfoliere, extracție și hidratare.',
        longDescription: `
          <p>HydraFacial Deluxe este un tratament facial avansat, non-invaziv, care combină curățarea, exfolierea, extracția, hidratarea și protecția antioxidantă într-o singură sesiune, oferind rezultate imediate și fără timp de recuperare.</p>
          
          <p>Acest tratament revoluționar utilizează tehnologia Vortex-Fusion® pentru a curăța în profunzime porii și a furniza seruri hidratante bogate în antioxidanți, peptide și acid hialuronic direct în piele.</p>
          
          <p>HydraFacial Deluxe este personalizat pentru toate tipurile de piele și abordează numeroase probleme, inclusiv linii fine, riduri, elasticitate, textură, porozitate, congestie și pete pigmentare.</p>
        `,
        images: [
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
          'https://images.unsplash.com/photo-1612908689356-3c2a2d0c2e58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        prices: [
          { sessions: 1, price: '€120', description: 'Sesiune unică pentru strălucire imediată' },
          { sessions: 3, price: '€330', description: 'Pachet recomandat pentru rezultate optime', recommended: true },
          { sessions: 6, price: '€600', description: 'Pachet intensiv pentru transformare completă' }
        ],
        benefits: [
          'Curățare profundă și desfundarea porilor',
          'Exfoliere blândă și eficientă',
          'Hidratare intensă și strălucire imediată',
          'Reducerea liniilor fine și a ridurilor',
          'Uniformizarea tonului și texturii pielii',
          'Tratament relaxant, fără durere sau timp de recuperare'
        ],
        didYouKnow: 'HydraFacial este atât de popular încât, la nivel global, se efectuează un tratament la fiecare 15 secunde. Celebrități precum Beyoncé, Kate Winslet și Paris Hilton sunt fane declarate ale acestui tratament.',
        faq: [
          {
            question: 'Este HydraFacial potrivit pentru toate tipurile de piele?',
            answer: 'Da, HydraFacial poate fi personalizat pentru toate tipurile de piele, inclusiv piele sensibilă, uscată, grasă, matură sau predispusă la acnee.'
          },
          {
            question: 'Cât timp durează o sesiune?',
            answer: 'Un tratament HydraFacial Deluxe durează aproximativ 45-60 de minute.'
          },
          {
            question: 'Când voi vedea rezultatele?',
            answer: 'Veți observa rezultate imediate după tratament - pielea va fi mai hidratată, mai luminoasă și mai fermă. Pentru probleme specifice precum hiperpigmentarea sau liniile fine, rezultatele optime apar după mai multe sesiuni.'
          },
          {
            question: 'Cât timp durează rezultatele?',
            answer: 'Rezultatele unui singur tratament pot dura 5-7 zile sau mai mult. Pentru beneficii pe termen lung și îmbunătățirea calității pielii, recomandăm tratamente lunare.'
          },
          {
            question: 'Există efecte secundare sau timp de recuperare?',
            answer: 'HydraFacial este un tratament blând, fără timp de recuperare. Puteți aplica machiaj și reveni la activitățile normale imediat după tratament. Unii clienți pot prezenta o ușoară roșeață care dispare în câteva ore.'
          }
        ]
      },
      'led-therapy': {
        name: 'LED Light Therapy',
        shortDescription: 'Terapie cu lumină LED pentru tratarea acneei, reducerea inflamației și stimularea colagenului.',
        longDescription: `
          <p>Terapia cu lumină LED (Light Emitting Diode) este un tratament non-invaziv care utilizează diferite lungimi de undă ale luminii pentru a trata diverse probleme ale pielii și pentru a stimula procesele naturale de regenerare.</p>
          
          <p>Această tehnologie avansată folosește lumini de diferite culori, fiecare având efecte specifice asupra pielii:</p>
          
          <ul>
            <li><strong>Lumina roșie (630-660 nm)</strong>: Stimulează producția de colagen și elastină, reduce liniile fine și ridurile, și îmbunătățește fermitatea pielii.</li>
            <li><strong>Lumina albastră (415-430 nm)</strong>: Are proprietăți antibacteriene, fiind eficientă în tratarea acneei prin eliminarea bacteriilor P. acnes.</li>
            <li><strong>Lumina galbenă (580-590 nm)</strong>: Reduce roșeața, calmează pielea sensibilă și tratează rozaceea.</li>
            <li><strong>Lumina verde (520-530 nm)</strong>: Uniformizează tonul pielii și reduce hiperpigmentarea.</li>
            <li><strong>Lumina infraroșie (830-850 nm)</strong>: Penetrează mai adânc în piele, stimulând circulația și accelerând vindecarea.</li>
          </ul>
          
          <p>Tratamentul este complet nedureros, relaxant și nu necesită timp de recuperare, făcându-l ideal pentru întreținerea regulată a pielii.</p>
        `,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5
        ]
      }
    }
  }
}