import Content from "./temp"

const formatDateInRomanian = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('ro-RO', options)
}

export const metadata = {
    title: "Politica de confidentialitate Slim & Beauty by MC",
    description: "Pe aceasta pagina veti putea gasi informatii despre politica de confidentialitate a site-ului Slim & Beauty by MC, precum si despre datele pe care le colectam si cum le utilizam.",
    robots: {
        index: false,
        follow: false,
    }
} 

export default function PrivacyPolicy() {
    const currentDate = formatDateInRomanian(new Date())

    return (
        <Content date={currentDate} />
    )
}