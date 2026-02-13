"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
    SheetHeader,
    SheetFooter,
} from "@/components/ui/sheet"
import Link from "next/link";

interface NavLink {
    label: string
    id: string
}

const navLinks: NavLink[] = [
    { label: "Acasă", id: "top" },
    { label: "ONG-uri", id: "ong-uri" },
    { label: "Evenimente", id: "evenimente" },
    { label: "Contact", id: "contact" },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    /**
     * Smooth scroll to section by id
     */
    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id)
        if (!element) return

        // închidem Sheet-ul pe mobil
        setOpen(false)

        // delay mic ca să se termine animația Sheet-ului
        setTimeout(() => {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 100)
    }

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-background/70 backdrop-blur-md shadow-sm border-b border-border"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <button
                    onClick={() => handleScrollTo("top")}
                    className="flex items-center gap-2"
                >
                    <span className="text-xl font-extrabold tracking-tight text-green-700">
                        CIVICOM✨
                    </span>
                </button>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleScrollTo(link.id)}
                            className="rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Actions desktop */}
                <div className="hidden items-center gap-3 md:flex">
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        Autentifică-te
                    </Button>
                    <Link
                    href={'/inregistrare'}>
                        <Button
                                size="sm"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Înregistrează-te
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-foreground"
                            aria-label="Deschide meniul"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-72 bg-background">
                        <SheetHeader>
                            <SheetTitle className="text-green-700 font-extrabold text-xl">
                                CIVICOM✨
                            </SheetTitle>
                            <SheetDescription />
                        </SheetHeader>

                        <nav className="mt-8 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleScrollTo(link.id)}
                                    className="rounded-lg px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-accent"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>

                        <SheetFooter className="mt-6 flex flex-col gap-2">
                            <Button
                                variant="outline"
                                className="w-full border-primary/30 text-primary hover:bg-accent bg-transparent"
                            >
                                Autentifică-te
                            </Button>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Înregistrează-te
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
