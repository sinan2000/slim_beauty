import { Review } from "@/app/types"
import ReviewCard from "./review"

export default function Testimonials() {
    const reviews: Review[] = [
        {
            url: 'https://www.facebook.com/rochiide.inchiriat.1/posts/pfbid026wEeoNRfMzHMTYhew6vdnwgVokvL2PhXWptjmHiW8tDyvMF2Vo4fbrmFivzsiphGl',
            authorName: 'Manuela Lucia Albu',
            imageDescription: 'Imagine de profil a Manuelei Lucia Albu, recenzie Slim & Beauty by MC',
            authorImage: '/review1.jpg',
            description: 'Personalul foarte prietenos si aparatura moderna,recomand cu mare drag'
        },
        {
            url: 'https://www.facebook.com/irina.brehui.1/posts%2Fpfbid0fN44vwNTB4FjUgFnpgyiEpZN1LCAietbzYpYRUn6QPFscjhbYo9aYrZ8Qk7WaWkul',
            authorName: 'Irina Brehui',
            imageDescription: 'Imagine de profil a Irinei Brehui, recenzie Slim & Beauty by MC',
            authorImage: '/review2.jpg',
            description: 'Un salon ff fain, cu atmosfera plăcută și personal prietenos, dar în același timp și foarte profi. Recomand cu cea mai mare caldura! 👌'
        },
        {
            url: 'https://www.facebook.com/adina.filip.9/posts/pfbid02JGTnX2RNHpRKMsvV8NQxdgENaXQxRF11F7wUqgNmUb8kBgtrvnc6encvhVEDYrrRl',
            authorName: 'Adina Filip',
            imageDescription: 'Imagine de profil a Adinei Filip, recenzie Slim & Beauty by MC',
            authorImage: '/review3.jpg',
            description: 'Oamenii sfințesc locul, iar locul arata minunat. Revin mereu cu drag la voi'
        }
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Ce zic clientele noastre</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(review => (
                        <ReviewCard key={review.authorName} review={review} />
                    ))}
                </div>
            </div>
        </section>
    )
}