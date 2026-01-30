'use client'
import { useState } from "react";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
}

export default function ImageLoader({ src, alt }: Props) {
    const [imageUrl, setImageUrl] = useState(src);

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={36}
            height={36}
            onError={() => setImageUrl("/placeholder.png")}
        />
    );
}
