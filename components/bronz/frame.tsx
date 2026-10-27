import Image, { type StaticImageData } from "next/image";

/**
 * Photo frame. The choreography opens it with a clip-path curtain (`reveal="rise"` from the bottom, `"side"` from
 * the left) and drifts the oversized picture inside on scroll.
 */
export function Frame({
  src,
  alt,
  sizes,
  className,
  position = "50% 50%",
  reveal = "rise",
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  reveal?: "rise" | "side";
}) {
  return (
    <div data-curtain={reveal} className={`relative overflow-hidden ${className ?? ""}`}>
      <div data-curtain-img className="absolute inset-[-8%_0]">
        <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}
