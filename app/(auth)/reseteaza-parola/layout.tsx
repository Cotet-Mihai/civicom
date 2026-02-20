import type { Metadata } from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Resetare parolă",
    description: "Resetează-ți parola contului CIVICOM.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
