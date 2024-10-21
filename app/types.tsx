export type Review = {
    url: string;
    authorName: string;
    imageDescription: string;
    authorImage: string;
    description: string;
}

export type Post = {
    image: string;
    date: string;
    description: string;
    alt: string;
    url: string;
}

export type Service = {
    icon: React.ReactNode
    title: string
    shortDescription: string
    mediumDescription: string
    longDescription: string
    benefits: string[]
    faq: {
        question: string
        answer: string
    }[]
    fact?: string
}