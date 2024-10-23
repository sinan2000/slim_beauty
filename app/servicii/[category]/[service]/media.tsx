'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const MediaComponent = ({ media }: { media: string }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    // Function to determine the file type by extension (client-side safe)
    const getFileType = (url: string) => {
        const extension = url.split('.').pop()?.toLowerCase();  // Get the file extension
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const videoExtensions = ['mp4', 'webm', 'ogg'];

        if (extension && imageExtensions.includes(extension)) {
            return 'image';
        } else if (extension && videoExtensions.includes(extension)) {
            return 'video';
        } else {
            return 'unknown';
        }
    };

    const fileType = getFileType(media);

    return (
        <motion.div className="mb-12" {...fadeIn} transition={{ delay: 0.2 }}>
            {fileType === 'image' ? (
                <Image
                    src={`/${media}`}
                    alt="Media"
                    width={800}
                    height={450}
                    className="rounded-lg shadow-lg w-full h-auto"
                />
            ) : fileType === 'video' ? (
                <video
                    src={`/${media}`}
                    controls
                    className="rounded-lg shadow-lg w-full"
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Unsupported media type.</p>
            )}
        </motion.div>
    );
};

export default MediaComponent;
