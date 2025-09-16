"use client"

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-10 font-sans text-md h-12 snap-center text-slate-700 dark:text-slate-300">
      <p>&copy; {currentYear} Eduardo Moro. All rights reserved.</p>
    </footer>
  );
}
