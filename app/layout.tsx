import "./globals.css";
import React from "react";

import type {Metadata} from "next";

import {Toaster} from "@/components/ui/sonner";

import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from "@vercel/speed-insights/next"
import {TooltipProvider} from "@/components/ui/tooltip";


export const metadata: Metadata = {
    metadataBase: new URL("https://civicom.ro"),

    title: {
        default: "CIVICOM - Platformă digitală pentru voluntariat și implicare civică",
        template: "%s | CIVICOM"
    },

    description:
        "Civicom conectează voluntari, ONG-uri și instituții publice într-o platformă modernă pentru evenimente, donații, petiții și implicare civică. Descoperă, înscrie-te și susține cauze sociale cu ușurință.",

    keywords: [
        "CIVICOM",
        "platformă voluntariat România",
        "voluntariat România",
        "evenimente voluntariat",
        "înscriere voluntar online",
        "ONG România",
        "donații online ONG",
        "platformă donații online",
        "implicare civică România",
        "campanii sociale România",
        "petiții online România",
        "evenimente comunitare",
        "voluntariat"
    ],

    authors: [{ name: "Coteț Mihăiță - Cornel" }],
    creator: "Coteț Mihăiță - Cornel",
    publisher: "CIVICOM",

    openGraph: {
        title: "Civicom - Platformă digitală pentru voluntariat și implicare civică",
        description:
            "Descoperă evenimente, susține donații și implică-te în cauze sociale prin Civicom.",
        url: "https://civicom.ro",
        siteName: "Civicom",
        locale: "ro_RO",
        type: "website",
    },

    robots: {
        index: true,
        follow: true
    },

    icons: {
        icon: "/favicon.ico"
    }
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="ro">
            <body>
                <TooltipProvider>{children}</TooltipProvider>

                <Toaster position={'top-center'}/>

                {/* Vercel Analytics for tracking user interactions */}
                <Analytics/>

                {/* Vercel Speed Insights for performance monitoring */}
                <SpeedInsights/>
            </body>
        </html>
    );
}