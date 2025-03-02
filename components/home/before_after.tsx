"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import before1 from "@/assets/before_after/before1.png";
import after1 from "@/assets/before_after/after1.png";
import before2 from "@/assets/before_after/before2.png";
import after2 from "@/assets/before_after/after2.png";

const beforeAfterImages = [
  {
    id: 1,
    title: "Dermapen cu Microneedling",
    description: "Rezultate după câteva zile de la tratament",
    before: before1,
    after: after1,
  },
  {
    id: 2,
    title: "Bronzare Organică cu DHA",
    description: "Rezultate imediate după bronzare",
    before: before2,
    after: after2,
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    let clientX;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const position = ((clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % beforeAfterImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  const currentImage = beforeAfterImages[currentIndex];

  return (
    <section id="gallery" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Rezultate Înainte & După
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vezi transformările spectaculoase realizate cu tratamentele noastre dermapen și bronzare!
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            {/* Before/After Slider */}
            <div
              className="relative h-[500px] w-full flex cursor-grab active:cursor-grabbing"
              onMouseMove={handleSliderChange}
              onTouchMove={handleSliderChange}
            >
              {/* Before Image */}
              <div className="relative overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <Image
                  src={currentImage.before}
                  alt={`Before ${currentImage.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* After Image */}
              <div className="relative overflow-hidden" style={{ width: `${100 - sliderPosition}%` }}>
                <Image
                  src={currentImage.after}
                  alt={`After ${currentImage.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-pink-500"></div>
                </div>
              </div>

              {/* Before/After Labels */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-xs">
                Înainte
              </div>
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-xs">
                După
              </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xs text-white p-4">
              <h3 className="font-playfair text-xl font-semibold">{currentImage.title}</h3>
              <p className="text-white/80 text-sm">{currentImage.description}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-xs transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-xs transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center mt-6 space-x-3">
            {beforeAfterImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-16 w-24 relative rounded-md overflow-hidden transition-all",
                  index === currentIndex ? "ring-2 ring-pink-500 ring-offset-2" : "opacity-70"
                )}
                aria-label={`View ${image.title}`}
              >
                <Image
                  src={image.after}
                  alt={image.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
