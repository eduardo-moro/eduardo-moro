"use client"

import React from 'react';

interface MarkdownImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  handleImageClick: (src: string, alt: string) => void;
}

export default function MarkdownImage({ handleImageClick, ...props }: MarkdownImageProps) {
  return (
    <>
    <span
      className={`relative ${props.className || ""}`}
      onClick={() => handleImageClick(props.src as string || "", props.alt || "")}
      style={{ width: "100%", height: "auto", aspectRatio: "attr(width) / attr(height)" }}
    >
      <img
        src={props.src as string}
        alt={props.alt || ""}
        style={{ objectFit: "contain" }}
      />
    </span>
    </>
  );
}
