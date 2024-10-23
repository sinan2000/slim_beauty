'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Content = ({date}: {date: string}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] py-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-primary text-center mb-2">
                            Politica de Confidențialitate pentru Slim & Beauty by MC
                        </CardTitle>
                        <p className="text-center text-gray-600">
                            Data intrării în vigoare: {date}
                        </p>
                    </CardHeader>
                    <CardContent className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">1. Introducere</h2>
                            <p>
                                Bine ați venit la Slim & Beauty by MC (&quot;noi&quot;, &quot;nouă&quot;, &quot;al nostru&quot;). Ne angajăm să vă protejăm datele personale și să vă respectăm confidențialitatea. Această Politică de Confidențialitate explică modul în care colectăm, utilizăm și protejăm informațiile dvs. atunci când vizitați site-ul nostru web www.slimandbeauty.ro (&quot;Site-ul&quot;) și utilizați serviciile noastre.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">2. Datele pe care le colectăm</h2>
                            <h3 className="text-xl font-medium text-primary mt-4 mb-2">Informații personale:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Nume: Colectat atunci când programați o întâlnire.</li>
                                <li>Număr de telefon: Colectat pentru confirmarea programărilor și comunicare.</li>
                                <li>Serviciu selectat: Serviciul pe care doriți să îl rezervați.</li>
                                <li>Data și ora programării: Detaliile preferate de programare.</li>
                                <li>Mesaj: Orice informații suplimentare furnizate în formularul de programare.</li>
                            </ul>
                            <h3 className="text-xl font-medium text-primary mt-4 mb-2">Informații colectate automat:</h3>
                            <p>
                                Cookie-uri și tehnologii similare: Utilizăm Google Ads (gtag.js) pentru a analiza utilizarea Site-ului și pentru campanii publicitare, care pot colecta informații despre comportamentul dvs. de navigare.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">3. Cum utilizăm datele dvs.</h2>
                            <ul className="list-disc pl-6">
                                <li>Pentru furnizarea serviciilor: Programarea și gestionarea întâlnirilor dvs.</li>
                                <li>Comunicare: Trimiterea de confirmări, actualizări și răspunsuri la solicitările dvs.</li>
                                <li>Marketing: Cu consimțământul dvs., vă putem trimite mesaje promoționale despre serviciile noastre.</li>
                                <li>Analiză: Pentru a înțelege și îmbunătăți utilizarea Site-ului și a serviciilor noastre.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">4. Baza legală pentru prelucrare</h2>
                            <ul className="list-disc pl-6">
                                <li>Consimțământ: Pentru cookie-urile de analiză și publicitate, prelucrăm datele dvs. pe baza consimțământului dvs.</li>
                                <li>Necesitate contractuală: Prelucrarea este necesară pentru a vă oferi serviciile solicitate.</li>
                                <li>Interese legitime: Pentru a îmbunătăți serviciile și funcționalitatea Site-ului nostru.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">5. Partajarea datelor</h2>
                            <h3 className="text-xl font-medium text-primary mt-4 mb-2">Furnizori de servicii:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Vonage: Utilizat pentru a trimite notificări SMS la programare.</li>
                                <li>Google Ads: Pentru urmărirea conversiilor și analiză.</li>
                            </ul>
                            <p>Cerințe legale: Putem divulga informațiile dvs. dacă suntem obligați prin lege.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">6. Păstrarea datelor</h2>
                            <p>
                                Păstrăm datele dvs. personale doar atât timp cât este necesar pentru scopurile descrise în această politică, cu excepția cazului în care legea prevede altfel.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">7. Drepturile dvs.</h2>
                            <p>În conformitate cu GDPR, aveți dreptul la:</p>
                            <ul className="list-disc pl-6">
                                <li>Acces: Să solicitați acces la datele dvs. personale.</li>
                                <li>Rectificare: Să solicitați corectarea datelor inexacte.</li>
                                <li>Ștergere: Să solicitați ștergerea datelor dvs. în anumite circumstanțe.</li>
                                <li>Restricționare: Să solicitați restricționarea prelucrării datelor dvs.</li>
                                <li>Opoziție: Să vă opuneți prelucrării datelor dvs. pentru marketing direct.</li>
                                <li>Portabilitatea datelor: Să solicitați transferul datelor dvs. către o altă organizație.</li>
                            </ul>
                            <p className="mt-4">Pentru a vă exercita aceste drepturi, vă rugăm să ne contactați la 0733407329.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">8. Cookie-uri și tehnologii similare</h2>
                            <p>
                                Utilizăm cookie-uri pentru a vă îmbunătăți experiența pe Site-ul nostru. Puteți accepta sau refuza cookie-urile neesențiale prin bannerul nostru de consimțământ pentru cookie-uri.
                            </p>
                            <h3 className="text-xl font-medium text-primary mt-4 mb-2">Tipuri de cookie-uri utilizate:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Cookie-uri esențiale: Necesare pentru funcționarea Site-ului.</li>
                                <li>Cookie-uri de analiză și publicitate: Utilizate pentru a înțelege cum interacționați cu Site-ul și pentru campanii publicitare.</li>
                            </ul>
                            <h3 className="text-xl font-medium text-primary mt-4 mb-2">Gestionarea cookie-urilor:</h3>
                            <p>
                                Puteți gestiona preferințele cookie-urilor prin setările browser-ului dvs. sau prin bannerul nostru de consimțământ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">9. Securitatea datelor</h2>
                            <p>
                                Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dvs. personale împotriva accesului neautorizat, alterării, divulgării sau distrugerii.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">10. Modificări ale acestei Politici de Confidențialitate</h2>
                            <p>
                                Putem actualiza această Politică de Confidențialitate periodic. Orice modificări vor fi postate pe această pagină cu o nouă dată de intrare în vigoare.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">11. Contactați-ne</h2>
                            <p>
                                Dacă aveți întrebări sau nelămuriri privind această Politică de Confidențialitate sau practicile noastre de date, vă rugăm să ne contactați la:
                            </p>
                            <ul className="list-none pl-0 mt-4">
                                <li><strong>Telefon:</strong> 0733407329</li>
                                <li><strong>Adresă:</strong> str. Petofi Șandor 101, Dumbrăvița, Timiș, România</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default Content;