import { Droplet, Radio, Snowflake, Waves, Wind, Sun, WrapText, Shield, Zap } from "lucide-react"; // Add relevant icons
import { Card, CardContent } from "../ui/card";

export default function BodyCare() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Proceduri Corporale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Waves className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">VShape Anticelulitic</h3>
                            <p className="text-muted-foreground">Tratamente pentru reducerea celulitei.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Snowflake className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Criolipoliză</h3>
                            <p className="text-muted-foreground">Sculptură corporală cu tehnologie avansată de răcire.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Zap className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">EMSlim Neo RF</h3>
                            <p className="text-muted-foreground">Tonifiere musculară și slăbire.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Radio className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Radiofrecvență Bipolară</h3>
                            <p className="text-muted-foreground">Lifting și regenerare celulară.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Wind className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Masaj Vacuum Anticelulitic</h3>
                            <p className="text-muted-foreground">Reducerea celulitei și tonifierea pielii.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Droplet className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Presoterapie (Drenaj Limfatic)</h3>
                            <p className="text-muted-foreground">Eliminarea toxinelor și reducerea retenției de apă.</p>
                        </CardContent>
                    </Card>
                    {/* New Procedures */}
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Shield className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Cavitatie</h3>
                            <p className="text-muted-foreground">Ultrasunete pentru eliminarea celulitei.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <WrapText className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Împachetări Tunel IR</h3>
                            <p className="text-muted-foreground">Tratament pentru detoxifiere și pierdere în greutate.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Sun className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Bronzare Organică cu DHA</h3>
                            <p className="text-muted-foreground">Bronzare sănătoasă și naturală fără raze UV.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
