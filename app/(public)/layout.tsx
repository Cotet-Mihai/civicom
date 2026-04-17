import React from "react";
import {Navbar} from "@/components/Navbar";

export default function PublicLayout({children,} : Readonly<{ children: React.ReactNode }>) {
    return(
        <>
            <Navbar />
            <main className={"min-h-screen mt-10"}>
                {children}
            </main>
        </>
    )
}