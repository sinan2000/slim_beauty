'use client'

import * as React from "react"
import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel"
import PostCard from "./post"

const posts = [
    {
        image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/460725072_1148586873446453_7215004922063360855_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JiyyC4UsKbYQ7kNvgGRKrn2&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=A2zO8FJW2a1R8NumwMxBpCI&oh=00_AYCvJgEetZvrtL8S5pQyMb7eRTqHjZA2r07y0rT46aQPrg&oe=671476E1',
        date: '20 septembrie 2024',
        description: `🔥Bronzarea organica DHA este alegerea perfecta pentru un bronz stralucitor si natural100%!💥
Programari la ☎️0733407329`,
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0335uA4TTHaPAsY3Fhabk2tfznqSkqfhS1hXJaCwg2kzy79AQKwiZCQEaoLvtu83Hjl'
    },
    {
        image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/452421146_1104841714487636_703966770979959418_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QFpAtlYZ9eYQ7kNvgGg-Smd&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=Ak7OVDV8cJ8BAQjR_dmJZxP&oh=00_AYA-aywC99UiwxKzJzPiB9H8iHpDRGotPzzjPZG_99JIjA&oe=671475DE',
        date: '24 iulie 2024',
        description: 'Sfaturi utile inainte si dupa sesiunea de bronzare organica!❗️',
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0gFGoTzLkaaycwNQSpJfgtrpwBpLAiHhDKEg6WBjzL64X7tyTYNR643Ee8xRsRTYMl'
    },
    {
        image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/430018463_1007438330894642_7029938910149757227_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qA6MmGQSuMcQ7kNvgGrhlJg&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=A2_pkvYWn1Kah6u_fuvD2Dt&oh=00_AYDOheZEYvs6ZRsQBRyNwvsZJwI1VqvddcMJwhbww4HZfw&oe=67149DF3',
        date: '8 martie 2024',
        description: 'Dragi doamne, în această zi specială vă doresc să vă simțiți apreciate și iubite așa cum meritați. Să aveți parte de multe momente frumoase și de multă fericire alături de cei dragi. La mulți ani!🤍🤍',
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0T8WrrCrhZKciUmMSGjD8i49updLAfm1imX7wmkwFmz69jkh9TMxTGxDN6fTYLFE4l'
    },
    {
        image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/417892731_965909491714193_217585086589653343_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jWE8au4o1bIQ7kNvgFPlCND&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=ADt8lXWNE3Lfx24k5NIFwyq&oh=00_AYCs5uEiGPfkT3EXXwHBToZRCZaCXsKJk3TPWj-De3t3XQ&oe=6714A214',
        date: '8 ianuarie 2024',
        description: `Bronzare organică: metodă 100% sigură!💥
Tehnica de bronzare organică / bronzare cu DHA e simplă: în doar 10-15 minute, aproximativ 75 ml de soluție de bronzare cu DHA se pulverizează după o metodă specială pe corp, nefiind necesare mai multe ședințe pentru a ajunge la culoarea dorită. 💥Rezultatul: o culoare uniformă, în nuanță exotică, intensă, radiantă.💥`,
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0EVc7QsC5RrtSUoWD5tbDg9MNHAwZ9XeqHibnMYSw73dpYT3Z5Bydd8X227ovoc58l'
    },
    {
        image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/409458469_944872460484563_3326588813449950864_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=oVdixCW6V5QQ7kNvgHlBLyN&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=ATGK3uUnBaxer0vAbSC29Wq&oh=00_AYBYkmOB8tnywyccNTPGbxgqiAsNT76t_zGHslEUvVruwQ&oe=67149666',
        date: '8 decembrie 2023',
        description: `CE ESTE BRONZAREA ORGANICA DHA?
Bronzarea organica reprezinta un procedeu profesional de bronzare, care presupune aplicarea pe intreg corpul – prin pulverizare cu un pistol special – a unei solutii 100% organice, ce confera o culoare naturala pielii.

AVANTAJELE BRONZULUI ORGANIC :

– utilizeaza o solutie naturala, cu miros placut, pe baza de plante, antioxidanti si uleiuri esentiale;
– hidrateaza pielea, lasand-o supla si luminoasa;
– bronz de culoare naturala;
– rezultat imediat.`,
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0qh55ca6HHG8YBjS21BTQZ4Ce1VtnJ4tkXYPW5SpNo4dMd1TyXwmGx2DGXuE8YjhAl'
    },
    {
        image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/395269231_915127000125776_6335549068927604397_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BJTEBJDLUm4Q7kNvgEjY4I_&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=AFMpaYQ3mOMcFc8EyqOT44O&oh=00_AYAI82MH2YkrPxX04Dd8H15Kxs4bmRT2Boij-Q_Na9ngrg&oe=67148E1C',
        date: '26 octombrie 2023',
        description: `De ce să alegi VShape?
💥Este cea mai eficientă soluție avizată de specialiștii din întreaga lume pentru tratarea celulitei.
💥Tratamentul este nedureros, non-invaziv.
💥Vă puteți întoarce la activitățile cotidiene imediat după tratament.
💥Este o procedură eficienta cu rezultate satisfacatoare.`,
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0YcKKNjVmGqaE4DM5eVbbqGaXjNoUKbKKE8oSgSyYq8BPaWBM9RRRjvpmf4YFNZkzl'
    },
    {
        image: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/386255038_899810521657424_3978313235544701976_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MIQxOag299gQ7kNvgHgmNtB&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=Aj6efQptTF7Wzp4NMUFzqla&oh=00_AYBs68e2J6Cz2MYIrtIGjA4CRnbo1f5GdAPL6cVpjSinog&oe=671499D2',
        date: '4 octombrie 2023',
        description: `EMSlim este o tehnologie de stimulare electromagnetica PASIVA de intensitate mare asistata de radiofrecventa, ce induce contractii musculare puternice.
Aparatul are 4 manipuli, facilitand folosirea pe 4 zone intr-o singura sedinta!`,
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0YtUoTxqWWdaGT25Qkvv5WS5SGCrxN5jKKTxFisY8vsA3MKFg3xQvBkp2Nu3wWmEHl'
    },
    {
        image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/366951793_868660838105726_3988613100836687219_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=blv7RxkV9tIQ7kNvgHPi0h_&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=A9ADI4POPZpwVJ_EaQnhGMx&oh=00_AYDLN_eCnDW1U-nvtTvUaQgb9M_ndUlGsQLmbJu-dNh--w&oe=6714889A',
        date: '18 august 2023',
        description: 'CrioSculpt este un concept unic de remodelare corporala si slabire localizata prin inghetare, non-invaziv si non-chirurgical, care se adreseaza tuturor zonelor corporale ce prezinta tesut adipos in exces. CrioSculpt este prevazut cu aplicatori bazati pe tehnologia inovativa de inghetare a tesutului adipos 360°. Acest lucru inseamna ca zona din interiorul aplicatorilor este',
        url: 'https://www.facebook.com/SalonSlimBeautyByMc/posts/pfbid0PyojyuYeZ4a7R7LyNZm4wEZSm7dCghvFJTQ9GVP7f4XPGhPusMP2p3N73FMycmQwl'
    },
    {
        image: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/353628063_824727875832356_3058790722570081240_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HhLQXRLuQrQQ7kNvgECIi4_&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=AMIpBChHFLFGKmyapSkV4_9&oh=00_AYDwcmDzAI7eiNjT-gaFmhCLBi7i-teZrZVG8_iMZmF5_g&oe=671489C3',
        date: '13 iunie 2023',
        description: `CUM FUNCTIONEAZA V-SHAPE

V-Shape combina 4 tehnologii puternice care lucreaza concomitent asupra zonei de tratament:

Radiofrecventa bipolara– incalzeste dermul pana la 20mm adancime, producand astfel contractia fibrelor de colagen si
`,
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
                        Previous
                    </button>
                    <button
                        onClick={() => api?.scrollTo(current + 1)}
                        aria-label="Next slide"
                        className="p-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}