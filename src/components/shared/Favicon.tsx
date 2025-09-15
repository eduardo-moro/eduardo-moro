'use client';

import { useFavicon } from '@/contexts/FaviconContext';

const Favicon = () => {
  const { favicon } = useFavicon();
  return <link rel="icon" href={favicon} />;
};

export default Favicon;
