import type {Metadata} from "next";
import "./globals.css";
import {montserrat} from "@/lib/fonts";
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Toaster} from "sonner";
import React from "react";
import NavBarSwitcher from "@/components/server/NavBarSwitcher";

/**
 * Application metadata for Next.js
 * Provides SEO and descriptive information for the site
 */
export const metadata: Metadata = {
    title: "CIVICOM",
    description: "Un spațiu creat de comunitate, pentru comunitate. Descoperă și centralizăm inițiative locale de " +
        "activism, voluntariat și implicare civică, pentru a sprijini comunitatea și a face o diferență reală.",
};

/**
 * RootLayout component wraps all pages in the application
 * and provides global UI elements like navbar, analytics, and toasters.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The page children to render within the layout
 * @returns {JSX.Element} The layout component with navbar, children, and global utilities
 */
export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ro">
            <body className={montserrat.className}>
                {/* Server Component that conditionally renders Public or Private Navbar */}
                <NavBarSwitcher/>

                {/* Main page content */}
                {children}

                {/* Vercel Analytics for tracking user interactions */}
                <Analytics/>

                {/* Vercel Speed Insights for performance monitoring */}
                <SpeedInsights/>

                {/* Toast notifications for user feedback */}
                <Toaster position="top-center" richColors/>
            </body>
        </html>
    );
}
