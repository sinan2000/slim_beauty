import { Scissors, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function FaceCare() {
    return (
        <section className="py-16 bg-[#F5EBE6]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12 text-[#6B4E32]">Dermato Cosmetică</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Scissors className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Dermapen cu Microneedling</h3>
                            <p className="text-muted-foreground">Rejuvenare și regenerare cutanată.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Sparkles className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Microdermabraziune</h3>
                            <p className="text-muted-foreground">Exfoliere și curățare profundă a pielii.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Star className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Tratament Clasic de Curățire</h3>
                            <p className="text-muted-foreground">Curățare facială în profunzime.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}