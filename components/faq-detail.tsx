import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/data';

type Item = {
  question: string;
  answer: string;
}

interface FAQProps {
  input?: Item[]
}

/**
 * Answers are always rendered and only hidden by the native <details> element.
 * They must exist in the server HTML, otherwise the FAQPage JSON-LD describes
 * content that is not on the page.
 */
export default function FAQ({ input = [] }: FAQProps) {
  const items = input.length > 0 ? input : faqs;

  return (
    <div className="mb-16">
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">
        Întrebări Frecvente
      </h2>
      <div className="space-y-4">
        {items.map((faq, index) => (
          <details key={index} className="group bg-white rounded-lg shadow-sm overflow-hidden">
            <summary className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer list-none focus:outline-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium text-gray-900">{faq.question}</h3>
              <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180 group-open:text-pink-500" />
            </summary>
            <div className="px-6 pb-4">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
