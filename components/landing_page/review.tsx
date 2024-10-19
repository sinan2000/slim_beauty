import { Review } from "@/app/types"
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface ReviewCardProps {
    review: Review
}

const myCustomLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <Card key={review.authorName} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                    <Image
                        loader={myCustomLoader}
                        src={review.authorImage}
                        alt={review.authorName}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                    />
                    <div>
                        <h3 className="font-semibold">{review.authorName}</h3>
                    </div>
                </div>

                {/* Add flex-grow to make the description take up the remaining space */}
                <p className="text-muted-foreground mb-4 flex-grow">{review.description}</p>

                {/* Ensure the link stays at the bottom */}
                <div className="mt-auto">
                    <Link href={review.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Vezi pe Facebook
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
