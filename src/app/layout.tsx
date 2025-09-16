"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Fira_Mono, Varela_Round } from "next/font/google";
import Header from "@/components/shared/header";
import "./globals.css";
const geistMono = Fira_Mono({
  variable: "--font-fira-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
        <head>
          <title>Eduardo Moro</title>
          <meta name="description" content="Analista de software backend Golang, C#" />
          <meta
            name="viewport"
            content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="icon" href="/assets/normal.ico" />
        </head>
        <body
          className={`${varelaRound.variable} ${geistMono.variable} antialiased`}
        >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              {children}
            </ThemeProvider>
        </body>
    </html>
  );
}
