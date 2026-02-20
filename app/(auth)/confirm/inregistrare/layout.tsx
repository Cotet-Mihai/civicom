import type { Metadata } from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Confirmare verificare",
    description: "Contul tău Civicom a fost verificat cu succes. Poți acum să te autentifici și să participi la evenimentele și campaniile civice.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ConfirmSignUpLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
