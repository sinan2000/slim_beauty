"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

type Media = string | StaticImageData;

interface Props {
  media: Media[];
}

export default function MediaGalery({ media }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  return (
    <div className="mb-16 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={media[activeImageIndex]}
          alt="Slim & Beauty Treatment"
          className="w-full h-full object-contain bg-gray-100"
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${index === activeImageIndex ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
