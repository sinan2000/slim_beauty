'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MediaSection = ({ media }: { media: string[] }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    const [activeMedia, setActiveMedia] = useState(0)

    return (
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <div className="mb-8">
                <div className="relative aspect-video mb-4 bg-black flex items-center justify-center">
                    {media[activeMedia].endsWith('.mp4') ? (
                        <video
                            src={`/${media[activeMedia]}`}
                            controls
                            className="max-w-full max-h-full"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image
                            src={`/${media[activeMedia]}`}
                            alt="Treatment visual"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
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
    )
}

export default MediaSection;
