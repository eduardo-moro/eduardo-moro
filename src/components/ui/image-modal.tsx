"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000ef] bg-blur">
      <div ref={modalRef} className="relative max-w-3xl max-h-full p-4 rounde">
        <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-2xl" />
        <button
          className="absolute top-[-2rem] right-[-2rem] text-white text-4xl font-sans"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
