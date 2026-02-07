import React from "react";
import {TooltipProvider} from "@/components/ui/tooltip";

export default function PublicLayout({children,} : Readonly<{ children: React.ReactNode }>) {
    return(
        <>
            <main className={"min-h-screen"}>
                <TooltipProvider>{children}</TooltipProvider>
            </main>
        </>
    )
}