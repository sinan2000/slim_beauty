import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <Image src={`/placeholder.svg?text=Client${i}&width=50&height=50`} alt={`Client ${i}`} width={50} height={50} className="rounded-full mr-4" />
                                    <div>
                                        <h4 className="font-semibold">Sarah Johnson</h4>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">"The treatments at Slim & Beauty have transformed my skin. I've never felt more confident!"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}