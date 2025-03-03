"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Media = string | StaticImageData;

interface Props {
  media: Media[];
}

export default function ImageGallery({ media }: Props) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-serif font-bold mb-8">Galerie</h2>

      <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Wrapper */}
        <div className="relative w-full h-[300px] md:h-[500px]">
          {typeof media[currentMediaIndex] === "string" ? (
            <Image
              src={media[currentMediaIndex] as string}
              alt={`Imaginea ${currentMediaIndex + 1}`}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src={(media[currentMediaIndex] as StaticImageData).src}
              alt={`Imaginea ${currentMediaIndex + 1}`}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
              aria-label="Imaginea următoare"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Pagination Dots */}
            <div className="p-4 flex justify-center">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`w-3 h-3 mx-1 rounded-full ${currentMediaIndex === index ? "bg-pink-500" : "bg-gray-300"
                    }`}
                  aria-label={`Imaginea ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
