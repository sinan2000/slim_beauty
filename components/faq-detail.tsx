'use client';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

export default function FAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  return (
    <div className="mb-16">
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">
        Întrebări Frecvente
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {activeAccordion === index ? (
                <ChevronUp className="h-5 w-5 text-pink-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {activeAccordion === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}
