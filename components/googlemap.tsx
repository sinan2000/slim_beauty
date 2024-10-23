export default function GoogleMap() {
    return (
        <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_EMBED_API_KEY}&q=Slim+%26+Beauty+by+MC,Dumbrăvița&language=ro`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Locația salonului Slim&Beauty by MC"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    )
}