import React from "react";
import NavBarSwitcher from "@/components/containers/NavBarSwitcher";

export default function PublicLayout({children,} : Readonly<{ children: React.ReactNode }>) {
    return(
        <>
            <main className={"min-h-screen"}>
                {/* Server Component that conditionally renders Public or Private Navbar */}
                <NavBarSwitcher/>

                {/* Main page content */}
                {children}
            </main>
        </>
    )
}