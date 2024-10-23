import { Card, CardContent } from "@/components/ui/card";

const PriceList = ({ prices }: { prices: number[] }) => (
    <div className="space-y-2">
        {prices.map((price, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-gray-600">{index === 0 ? 'O ședință' : `${index === 1 ? '6' : '10'} ședințe`}</span>
                <span className="font-semibold text-primary">{price} lei</span>
            </div>
        ))}
    </div>
)

const PriceComponent = ({ prices }: { prices: number[] }) => {

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">Prețuri</h2>
                <PriceList prices={prices} />
            </CardContent>
        </Card>
    )
}

export default PriceComponent;