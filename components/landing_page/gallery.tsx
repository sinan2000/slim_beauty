'use client'

import * as React from "react"
import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel"
import PostCard from "./post"

const posts = [
    {
        image: '/post1.jpg',
        date: '20 septembrie 2024',
        description: `🔥Bronzarea organica DHA este alegerea perfecta pentru un bronz stralucitor si natural100%!💥
Programari la ☎️0733407329`,
        alt: "Imagine Facebook despre bronzare organică DHA la Slim & Beauty by MC, postare din 20 septembrie 2024",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0335uA4TTHaPAsY3Fhabk2tfznqSkqfhS1hXJaCwg2kzy79AQKwiZCQEaoLvtu83Hjl'
    },
    {
        image: '/post2.jpg',
        date: '24 iulie 2024',
        description: 'Sfaturi utile inainte si dupa sesiunea de bronzare organica!❗️',
        alt: "Sfaturi pentru bronzae organică DHA la Slim & Beauty by MC, postare din 24 iulie 2024",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0gFGoTzLkaaycwNQSpJfgtrpwBpLAiHhDKEg6WBjzL64X7tyTYNR643Ee8xRsRTYMl'
    },
    {
        image: '/post3.jpg',
        date: '8 martie 2024',
        description: 'Dragi doamne, în această zi specială vă doresc să vă simțiți apreciate și iubite așa cum meritați. Să aveți parte de multe momente frumoase și de multă fericire alături de cei dragi. La mulți ani!🤍🤍',
        alt: "Mesaj pentru Ziua Femeii la Slim & Beauty by MC, postare din 8 martie 2024",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0T8WrrCrhZKciUmMSGjD8i49updLAfm1imX7wmkwFmz69jkh9TMxTGxDN6fTYLFE4l'
    },
    {
        image: '/post4.jpg',
        date: '8 ianuarie 2024',
        description: `Bronzare organică: metodă 100% sigură!💥
Tehnica de bronzare organică / bronzare cu DHA e simplă: în doar 10-15 minute, aproximativ 75 ml de soluție de bronzare cu DHA se pulverizează după o metodă specială pe corp, nefiind necesare mai multe ședințe pentru a ajunge la culoarea dorită. 💥Rezultatul: o culoare uniformă, în nuanță exotică, intensă, radiantă.💥`,
        alt: "Tehnica de bronzare organică DHA la Slim & Beauty by MC, postare din 8 ianuarie 2024",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0EVc7QsC5RrtSUoWD5tbDg9MNHAwZ9XeqHibnMYSw73dpYT3Z5Bydd8X227ovoc58l'
    },
    {
        image: '/post5.jpg',
        date: '8 decembrie 2023',
        description: `CE ESTE BRONZAREA ORGANICA DHA?
Bronzarea organica reprezinta un procedeu profesional de bronzare, care presupune aplicarea pe intreg corpul – prin pulverizare cu un pistol special – a unei solutii 100% organice, ce confera o culoare naturala pielii.

AVANTAJELE BRONZULUI ORGANIC :

– utilizeaza o solutie naturala, cu miros placut, pe baza de plante, antioxidanti si uleiuri esentiale;
– hidrateaza pielea, lasand-o supla si luminoasa;
– bronz de culoare naturala;
– rezultat imediat.`,
        alt: "Detalii despre bronzarea organică DHA la Slim & Beauty by MC, postare din 8 decembrie 2023",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0qh55ca6HHG8YBjS21BTQZ4Ce1VtnJ4tkXYPW5SpNo4dMd1TyXwmGx2DGXuE8YjhAl'
    },
    {
        image: '/post6.jpg',
        date: '26 octombrie 2023',
        description: `De ce să alegi VShape?
💥Este cea mai eficientă soluție avizată de specialiștii din întreaga lume pentru tratarea celulitei.
💥Tratamentul este nedureros, non-invaziv.
💥Vă puteți întoarce la activitățile cotidiene imediat după tratament.
💥Este o procedură eficienta cu rezultate satisfacatoare.`,
        alt: "Detalii despre tratamentul anticelulitic VShape la Slim & Beauty by MC, postare din 26 octombrie 2023",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0YcKKNjVmGqaE4DM5eVbbqGaXjNoUKbKKE8oSgSyYq8BPaWBM9RRRjvpmf4YFNZkzl'
    },
    {
        image: '/post7.jpg',
        date: '4 octombrie 2023',
        description: `EMSlim este o tehnologie de stimulare electromagnetica PASIVA de intensitate mare asistata de radiofrecventa, ce induce contractii musculare puternice.
Aparatul are 4 manipuli, facilitand folosirea pe 4 zone intr-o singura sedinta!`,
        alt: "Descriere EMSlim Neo RF pentru tonifiere musculară la Slim & Beauty by MC, postare din 4 octombrie 2023",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0YtUoTxqWWdaGT25Qkvv5WS5SGCrxN5jKKTxFisY8vsA3MKFg3xQvBkp2Nu3wWmEHl'
    },
    {
        image: '/post8.jpg',
        date: '18 august 2023',
        description: 'CrioSculpt este un concept unic de remodelare corporala si slabire localizata prin inghetare, non-invaziv si non-chirurgical, care se adreseaza tuturor zonelor corporale ce prezinta tesut adipos in exces. CrioSculpt este prevazut cu aplicatori bazati pe tehnologia inovativa de inghetare a tesutului adipos 360°. Acest lucru inseamna ca zona din interiorul aplicatorilor este',
        alt: "Postare despre remodelarea corporală CrioSculpt la Slim & Beauty by MC, postare din 18 august 2023",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0PyojyuYeZ4a7R7LyNZm4wEZSm7dCghvFJTQ9GVP7f4XPGhPusMP2p3N73FMycmQwl'
    },
    {
        image: '/post9.jpg',
        date: '13 iunie 2023',
        description: `CUM FUNCTIONEAZA V-SHAPE

V-Shape combina 4 tehnologii puternice care lucreaza concomitent asupra zonei de tratament:

Radiofrecventa bipolara– incalzeste dermul pana la 20mm adancime, producand astfel contractia fibrelor de colagen si
`,
        alt: "Explicație despre tehnologia V-Shape la Slim & Beauty by MC, postare din 13 iunie 2023",
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0m72yfdvBw9fArpJznWF4AeKRc88Eq4Ub2pacc6gFboAkyjbp9smmKxpTWGVkJdKEl'
    }

]

export default function FacebookPostsCarousel() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [api, setApi] = React.useState<any>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="py-16 bg-[#F5EBE6]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Noutăți de pe Facebook</h2>
                <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                        {posts.map((post) => (
                            <PostCard key={post.date} post={post} />
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => api?.scrollTo(current - 1)}
                        aria-label="Previous slide"
                        className="p-2"
                    >
                        Înapoi
                    </button>
                    <button
                        onClick={() => api?.scrollTo(current + 1)}
                        aria-label="Next slide"
                        className="p-2"
                    >
                        Înainte
                    </button>
                </div>
            </div>
        </section>
    )
}