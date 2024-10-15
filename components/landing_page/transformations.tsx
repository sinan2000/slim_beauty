import Image from "next/image";

export default function Transformations() {
    return (
        <section className="py-16 bg-[#F5EBE6]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Rezultate Transformatoare</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <div className="relative">
                                <Image src={`/placeholder.svg?text=Înainte&width=400&height=300`} alt={`Înainte ${i}`} width={400} height={300} className="rounded-lg" />
                                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded">Înainte</div>
                            </div>
                            <div className="relative">
                                <Image src={`/placeholder.svg?text=După&width=400&height=300`} alt={`După ${i}`} width={400} height={300} className="rounded-lg" />
                                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded">După</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}