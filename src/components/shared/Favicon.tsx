'use client';

import { useEffect } from 'react';
import { useFavicon } from '@/contexts/FaviconContext';

export function Favicon() {
  const { setIcoRef } = useFavicon();
  const icoRef = (document.getElementById('favicon') as HTMLLinkElement) || null;

  useEffect(() => {
    setIcoRef(icoRef);
  }, [icoRef, setIcoRef]);

  return null;
}
