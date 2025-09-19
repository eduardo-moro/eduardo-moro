"use client"

import React from 'react';
import Image from "next/image"; // Import Image component

interface MarkdownImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  handleImageClick: (src: string, alt: string) => void;
}

export default function MarkdownImage({ handleImageClick, ...props }: MarkdownImageProps) {
  return (
    <div
      className={`relative ${props.className || ""}`}
      onClick={() => handleImageClick(props.src as string || "", props.alt || "")}
      style={{ width: "100%", height: "auto", aspectRatio: "attr(width) / attr(height)" }}
    >
      <Image
        src={props.src as string}
        alt={props.alt || ""}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
