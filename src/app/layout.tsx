"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Fira_Mono, Varela_Round } from "next/font/google";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { MqttProvider } from "@/contexts/mqtt-context";
import "./globals.css";
import Noise from "@/components/Noise"
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
          <title>eduardo moro</title>
          <meta name="description" content="Desenvolvedor backend, ciclista e hobbista de IoT" />
          <meta property="og:title" content="eduardo moro" />
          <meta property="og:description" content="Desenvolvedor backend, ciclista e hobbista de IoT" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://eduardomoro.vercel.app" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="eduardo moro" />
          <meta name="twitter:description" content="Desenvolvedor backend, ciclista e hobbista de IoT" />
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
              <MqttProvider brokerUrl={process.env.NEXT_PUBLIC_MQTT_BROKER_URL || ""}>
                <Header />
                {children}
                <Noise
                  patternSize={1000}
                  patternAlpha={12}
                ></Noise>
                <Analytics/>
                <Toaster />
              </MqttProvider>
            </ThemeProvider>
        </body>
    </html>
  );
}
