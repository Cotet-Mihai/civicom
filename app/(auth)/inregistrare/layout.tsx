import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Înregistrare",
    description:
        "Creează-ți un cont Civicom pentru a participa la evenimente, a susține donații și a te implica în campanii civice.",
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Înregistrare | Civicom",
        description:
            "Creează-ți contul tău Civicom și implică-te activ în comunitate.",
        url: "https://civicom.ro/inregistrare",
        type: "website",
    },
};

export default function SignUpLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
