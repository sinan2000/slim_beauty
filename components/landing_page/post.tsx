import { Post } from "@/app/types";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Facebook } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <CarouselItem key={post.date} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center mb-4">
                            <Image
                                src="https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/293656603_557661769205636_1626461736837315377_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xfwmA4hqCYYQ7kNvgE6y1xV&_nc_zt=23&_nc_ht=scontent-ams4-1.xx&_nc_gid=AImVCRWM3ef9dBCfvxELlQA&oh=00_AYAozGkkajcr3DMq3oVkOvb01u0Ig-rHp9FG-SffxB_o8Q&oe=671499AD"
                                alt="Slim & Beauty by MC Logo"
                                width={40}
                                height={40}
                                className="rounded-full mr-3"
                            />
                            <div>
                                <h3 className="font-semibold text-[#6B4E32]">Slim & Beauty by MC</h3>
                                <p className="text-sm text-gray-500">{post.date}</p>
                            </div>
                        </div>
                        <Image
                            src={post.image}
                            alt={`Facebook post from ${post.date}`}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-[#6B4E32] mb-4 line-clamp-5 whitespace-pre-wrap flex-grow">{post.description}</p>
                    </CardContent>
                    <CardFooter className="bg-gray-50 px-6 py-4">
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="text-[#6B4E32] hover:bg-[#F5EBE6]">
                                <Facebook className="w-4 h-4 mr-2" />
                                Vezi pe Facebook
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </CarouselItem>
    )
}