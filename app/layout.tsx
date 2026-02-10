import "./globals.css";
import {montserrat} from "@/lib/fonts";
import React from "react";
import {Metadata} from "next";
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Toaster} from "sonner";

export const metadata: Metadata = {
    title: "Civicom - Platformă digitală pentru voluntariat și implicare civică",
    description: "Civicom conectează voluntari, ONG-uri și instituții publice într-o platformă modernă pentru evenimente, donații, petiții și implicare civică. Descoperă, înscrie-te și susține cauze sociale cu ușurință.",
    keywords: [
        "CiviCom",
        "voluntariat",
        "implicare civică",
        "ONG",
        "evenimente comunitare",
        "donații online",
        "petiții",
        "campanii sociale",
        "platformă digitală",
        "voluntari",
        "transparență donații"
    ],
    authors: [{ name: "Coteț Mihăiță - Cornel"}],
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ro">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}

        {/* Vercel Analytics for tracking user interactions */}
        <Analytics/>

        {/* Vercel Speed Insights for performance monitoring */}
        <SpeedInsights/>

        {/* Toast notifications for user feedback */}
        <Toaster
            position="top-center"
            richColors
        />
      </body>
    </html>
  );
}
