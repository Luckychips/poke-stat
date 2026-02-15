'use client'
import { useState } from "react";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export default function ImageLoader({ src, alt, width = 36, height = 36 }: Props) {
    const [imageUrl, setImageUrl] = useState(src);

    return (
        <Image
            className="pointer-events-none"
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImageUrl("/placeholder.png")}
        />
    );
}
