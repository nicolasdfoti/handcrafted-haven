'use client';

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
}

export default function ProductImage({ 
  src, 
  alt, 
  width, 
  height, 
  fallbackSrc = "/images/home-icon.jpg" 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {

    if (!src || typeof src !== 'string' || src.trim() === '') {
      return fallbackSrc;
    }
    return src.startsWith('/') ? src : `/${src}`;
  });

  const handleError = () => {
    console.log('Image failed to load, using fallback:', src);
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      priority={true}
    />
  );
}