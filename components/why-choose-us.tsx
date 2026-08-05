import { Settings, BadgeCheck, Sparkles, UserCheck } from "lucide-react"
const benefits = [
  {
    icon: <Settings className="h-8 w-8 text-pink-500" />,
    title: "Tehnologie Modernă",
    description: "Folosim echipamente de ultimă generație pentru remodelare corporală și dermato cosmetică.",
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-pink-500" />,
    title: "Experiență de Peste 10 Ani",
    // Deliberately not computed from `new Date()`: this section is prerendered at
    // build time, so a runtime year would hydrate differently after a New Year.
    description: "Cu peste 10 ani de experiență în domeniu, suntem alegerea sigură.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-pink-500" />,
    title: "Rezultate Vizibile",
    description: "Tratamentele noastre sunt concepute cu grijă, fără proceduri invazive.",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-pink-500" />,
    title: "Tratamente Personalizate",
    description:
      "Fiecare clientă are un tip de piele diferit, iar noi ne adaptăm pentru a oferi cele mai bune rezultate.",
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-pink-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Video Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Add Video Here */}
            <div
              className="relative overflow-hidden w-full flex justify-center items-center"
            >
              <div className="aspect-[9/16] max-h-[70vh] lg:max-h-[500px] flex justify-center items-center">
                <video
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  poster="/about-us-poster.png"
                >
                  <source src="/about-us.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Founder Attribution */}
            <div className="reveal mt-6 text-center">
              <div className="relative inline-block">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800">Mihaela Ceviker</h3>
                <div className="h-1 w-1/2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full mx-auto mt-2"></div>
              </div>
              <p className="text-gray-600 mt-2 italic">fondatoarea salonului Slim & Beauty by MC</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6">De Ce Slim & Beauty?</h2>
            <p className="text-gray-600 mb-8">
              Ne dedicăm ție! La Slim & Beauty, combinăm tehnologie de ultimă generație cu grijă personalizată, pentru
              rezultate rapide și de lungă durată.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="reveal flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full shadow-xs">{benefit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

