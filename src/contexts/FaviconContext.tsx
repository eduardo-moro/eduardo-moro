"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFavicon } from '@/lib/favicon-helper';

interface FaviconContextType {
  setIcoRef: (node: HTMLElement | null) => void;
}

const FaviconContext = createContext<FaviconContextType | undefined>(undefined);

export const FaviconProvider = ({ children }: { children: ReactNode }) => {
  const [favicon, setFavicon] = useState(getFavicon('normal'));
  const [isBlogVisible, setIsBlogVisible] = useState(false);
  const [icoRef, setIcoRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isBlogVisible) {
      setFavicon(getFavicon('normal'));
    }
  }, [isBlogVisible]);

  useEffect(() => {
    if (!icoRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBlogVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setFavicon(getFavicon('blog'));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(icoRef);

    return () => {
      observer.unobserve(icoRef);
    };
  }, [icoRef]);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = favicon;
    }
  }, [favicon]);

  return (
    <FaviconContext.Provider value={{ setIcoRef }}>
      {children}
    </FaviconContext.Provider>
  );
};

export const useFavicon = () => {
  const context = useContext(FaviconContext);
  if (context === undefined) {
    throw new Error('useFavicon must be used within a FaviconProvider');
  }
  return { ...context, setFavicon: (state: Parameters<typeof getFavicon>[0]) => {
    const newFavicon = getFavicon(state);
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = newFavicon;
    }
  }};
};