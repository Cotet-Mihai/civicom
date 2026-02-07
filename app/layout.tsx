import "./globals.css";
import React from "react";
import {Metadata} from "next";
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from "@vercel/speed-insights/next"

export const metadata: Metadata = {
    title: "Civicom - Platformă digitală pentru voluntariat și implicare civică",
    description: "Civicom conectează voluntari, ONG-uri și instituții publice într-o platformă modernă pentru evenimente, donații, petiții și implicare civică. Descoperă, înscrie-te și susține cauze sociale cu ușurință.",
    keywords: [
        "civicom",
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
            <body>
                {children}

                {/* Vercel Analytics for tracking user interactions */}
                <Analytics/>

                {/* Vercel Speed Insights for performance monitoring */}
                <SpeedInsights/>
            </body>
        </html>
    );
}