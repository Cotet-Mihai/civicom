import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Autentificare",
    description:
        "Autentifică-te în contul tău Civicom pentru a participa la evenimente, a susține donații și a te implica în campanii civice.",
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Autentificare | Civicom",
        description:
            "Accesează contul tău Civicom și implică-te în comunitate.",
        url: "https://civicom.ro/autentificare",
        type: "website",
    },
};

export default function SignInLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
