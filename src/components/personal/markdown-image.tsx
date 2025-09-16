"use client"

import React, { useState, useEffect, useRef } from 'react';

interface MarkdownImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  handleImageClick: (src: string, alt: string) => void;
}

export default function MarkdownImage({ handleImageClick, ...props }: MarkdownImageProps) {
  const [isTallImage, setIsTallImage] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      const checkImageDimensions = () => {
        if (img.naturalHeight > img.naturalWidth) {
          setIsTallImage(true);
        }
      };
      if (img.complete) {
        checkImageDimensions();
      } else {
        img.onload = checkImageDimensions;
      }
    }
  }, [props.src]);

  return (
    <img
      ref={imgRef}
      alt={props.alt || ""}
      {...props}
      className={`${props.className || ""} ${isTallImage ? "tall-image" : ""}`}
      onClick={() => handleImageClick(props.src as string || "", props.alt || "")}
    />
  );
}
