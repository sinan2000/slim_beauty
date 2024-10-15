import { Review } from "@/app/types"
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface ReviewCardProps {
    review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <Card key={review.url} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                    <Image
                        src={review.authorImage}
                        alt={review.authorName}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                    />
                    <div>
                        <h4 className="font-semibold">{review.authorName}</h4>
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
