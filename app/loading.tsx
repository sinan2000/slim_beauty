import { Card, CardContent } from "@/components/ui/card"

const LoadingDot = ({ delay }: { delay: string }) => (
    <div
        className="w-3 h-3 rounded-full bg-primary animate-[loading-dot_1.5s_ease-in-out_infinite]"
        style={{ animationDelay: delay }}
    />
)

export default function LoadingPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#FDF8F5] to-[#F5EBE6] flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-xs shadow-xl">
                <CardContent className="p-6">
                    <div className="text-center animate-fade-in">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Slim & Beauty by MC</h2>
                        <p className="text-gray-600 mb-8">Pregătim experiența ta de frumusețe și relaxare...</p>

                        <div className="flex justify-center space-x-2 mb-8">
                            <LoadingDot delay="0s" />
                            <LoadingDot delay="0.2s" />
                            <LoadingDot delay="0.4s" />
                        </div>

                        <div className="h-1 bg-linear-to-r from-primary to-secondary rounded-full animate-[loading-bar_2s_ease-in-out_infinite]" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
