'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MediaSection = ({ media }: { media: string[] }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const [activeMedia, setActiveMedia] = useState(0);

    return (
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <div className="mb-8">
                <div className="relative mb-4 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
                    {media[activeMedia].endsWith('.mp4') ? (
                        <video
                            src={`/${media[activeMedia]}`}
                            controls
                            className="w-full h-auto max-h-[600px] object-contain"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image
                            src={`/${media[activeMedia]}`}
                            alt="Treatment visual"
                            layout="intrinsic"
                            width={800}
                            height={600}
                            objectFit="contain"
                            className="rounded-lg"
                            priority
                        />
                    )}
                </div>
                {media.length > 1 && (
                    <div className="flex justify-center space-x-2">
                        {media.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveMedia(index)}
                                className={`w-3 h-3 rounded-full ${activeMedia === index ? 'bg-primary' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MediaSection;
