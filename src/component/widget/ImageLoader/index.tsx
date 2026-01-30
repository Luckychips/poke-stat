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
            width={32}
            height={32}
        />
    );
}
