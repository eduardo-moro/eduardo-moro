import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Fira_Mono, Varela_Round } from "next/font/google";
import Header from "@/components/shared/header"
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
})

export const metadata: Metadata = {
  title: "Eduardo Moro",
  description: "Desenvolvedor backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </head>
      <body
        className={`${varelaRound.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <Header/>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
