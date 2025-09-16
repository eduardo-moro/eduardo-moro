"use client"

import React from 'react';
import Image from 'next/image';

interface MarkdownImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  handleImageClick: (src: string, alt: string) => void;
}

export default function MarkdownImage({ handleImageClick, ...props }: MarkdownImageProps) {
  return (
    <Image
      alt={props.alt || ""}
      {...props}
      width={500}
      height={500}
      src={"/"}
      className={`${props.className || ""}`}
      onClick={() => handleImageClick(props.src as string || "", props.alt || "")}
    />
  );
}
