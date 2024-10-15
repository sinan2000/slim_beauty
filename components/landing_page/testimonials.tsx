import { Review } from "@/app/types"
import ReviewCard from "./review"

export default function Testimonials() {
    const reviews: Review[] = [
        {
            url: 'https://www.facebook.com/rochiide.inchiriat.1/posts/pfbid026wEeoNRfMzHMTYhew6vdnwgVokvL2PhXWptjmHiW8tDyvMF2Vo4fbrmFivzsiphGl',
            authorName: 'Manuela Lucia Albu',
            authorImage: 'https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/458165525_2221215588245467_737329430705338653_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lsl6WnLbb8gQ7kNvgGkP4Ky&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=ATfc2MPoEPuXPcYY_WZpbPC&oh=00_AYCMlvhreuFU0BhvtqZ2kCi3OHjGtkrFEDylMd_ax8FMHw&oe=67149395',
            description: 'Personalul foarte prietenos si aparatura moderna,recomand cu mare drag'
        },
        {
            url: 'https://www.facebook.com/irina.brehui.1/posts%2Fpfbid0fN44vwNTB4FjUgFnpgyiEpZN1LCAietbzYpYRUn6QPFscjhbYo9aYrZ8Qk7WaWkul',
            authorName: 'Irina Brehui',
            authorImage: 'https://scontent-ams2-1.xx.fbcdn.net/v/t31.18172-8/23800063_1653317681353194_481833260849832716_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=9ZY3WvdKy0gQ7kNvgE8jm9W&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=AcFv6i78KtA62tSBp3En5ct&oh=00_AYBXpf65jZQnC8GooQ315hOGBO_zA_9k1XM3Y9tUAIpeFg&oe=673627E5',
            description: 'Un salon ff fain, cu atmosfera plăcută și personal prietenos, dar în același timp și foarte profi. Recomand cu cea mai mare caldura! 👌'
        },
        {
            url: 'https://www.facebook.com/adina.filip.9/posts/pfbid02JGTnX2RNHpRKMsvV8NQxdgENaXQxRF11F7wUqgNmUb8kBgtrvnc6encvhVEDYrrRl',
            authorName: 'Adina Filip',
            authorImage: 'https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/460089783_8915100291851268_641049044552037948_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lGuRgEQjxK4Q7kNvgHUd56A&_nc_zt=23&_nc_ht=scontent-ams2-1.xx&_nc_gid=Ai591VUWSb056qSwAedbXQY&oh=00_AYAK_4aHIg22Akyw5YqjQb5IMoI5EN0SmTk4VPsrVljMag&oe=67148FD8',
            description: 'Oamenii sfințesc locul, iar locul arata minunat. Revin mereu cu drag la voi'
        }
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12 text-[#6B4E32]">Ce zic clientele noastre</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(review => (
                        <ReviewCard review={review} />
                    ))}
                </div>
            </div>
        </section>
    )
}