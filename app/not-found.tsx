import BackButton from '@/components/back-button';
import { notFoundMeta } from '@/lib/metadatas';
import { Home } from 'lucide-react';
import Link from 'next/link';

export const metadata = notFoundMeta;

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                {/* 404 Header */}
                <h1 className="font-serif text-8xl font-bold text-pink-500 mb-4">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
                    Pagina nu a fost găsită
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-8">
                    Ne pare rău, dar pagina pe care o căutați nu există sau a fost mutată.
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <button className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300 transform hover:scale-105 shadow-md">
                            <Home className="w-5 h-5 mr-2" />
                            Pagina principală
                        </button>
                    </Link>

                    <BackButton />
                </div>

                {/* Decorative Element */}
                <div className="mt-12 flex justify-center">
                    <div className="w-24 h-1 bg-pink-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}