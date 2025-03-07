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

  const activeMedia = media[activeImageIndex];

  const hasMultipleImages = media.length > 1;

  const isVideo = (mediaItem: Media): mediaItem is string =>
    typeof mediaItem === "string";

  return (
    <div className="mb-16 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-gray-100">
        {/* Handle Placeholder Image */}
        {isVideo(activeMedia) ? (
          <video
            src={activeMedia}
            controls
            playsInline
            className="w-full h-full object-contain bg-gray-100"
          >
            Dispozitivul dvs. nu suportă redarea video.
          </video>
        ) : (
          // Handle Normal Images
          <Image
            src={activeMedia}
            alt={`Image ${activeImageIndex + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {hasMultipleImages && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
