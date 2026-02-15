'use client'

import { useState, useEffect } from "react"
import { LogOutIcon, Menu, SettingsIcon, User, UserIcon } from "lucide-react"
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
import Link from "next/link"
import { useAuthUser } from "@/hooks/useAuthUser"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { signOutAction } from "@/services/auth/signOutAction"
import { useAnimateOnIntersect } from "@/app/(public)/hook/useAnimateOnIntersect"

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
    const {user, setUser} = useAuthUser()

    const [scrolled, setScrolled] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const sectionRef = useAnimateOnIntersect()

    useEffect(() => {
        const handleScroll = (): void => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleScrollTo = (id: string): void => {
        const element = document.getElementById(id)
        if (!element) return

        setOpen(false)

        setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
    }

    const handleLogout = async (): Promise<void> => {
        try {
            await signOutAction()
            setOpen(false)
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <header
            ref={sectionRef}
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-background/70 backdrop-blur-md shadow-sm border-b border-border"
                    : "bg-transparent"
            }`}
        >
            <div
                data-animate
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8 opacity-0"
            >
                {/* ================= LEFT SIDE ================= */}
                <div className="flex items-center gap-2">

                    {/* Mobile Sheet */}
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

                        <SheetContent
                            side="right"
                            className="w-72 bg-background flex flex-col justify-start"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-green-700 font-extrabold text-xl">
                                    CIVICOM✨
                                </SheetTitle>
                                <SheetDescription>
                                    Tot ce ai nevoie, într-un singur loc.
                                </SheetDescription>
                            </SheetHeader>

                            {/* NAVIGATION */}
                            <div>
                                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Navigare
                                </p>

                                <nav className="mt-2 flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <Button
                                            key={link.id}
                                            onClick={() => handleScrollTo(link.id)}
                                            className="flex justify-start text-black text-md gap-3 bg-transparent hover:bg-accent"
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </nav>
                            </div>

                            {/* ACCOUNT SECTION */}
                            {user && (
                                <>
                                    <Separator />
                                    <span className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Contul meu
                                    </span>

                                    <div className="flex flex-col gap-1">
                                        <Button className="flex justify-start text-black text-md gap-3 bg-transparent hover:bg-accent">
                                            <UserIcon />
                                            Profil
                                        </Button>

                                        <Button className="flex justify-start items-center text-black text-md gap-3 bg-transparent hover:bg-accent">
                                            <SettingsIcon />
                                            Setări
                                        </Button>
                                    </div>
                                </>
                            )}

                            {/* FOOTER ACTIONS */}
                            <SheetFooter className="mt-auto flex flex-col gap-2 pt-6">
                                {user ? (
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        onClick={handleLogout}
                                    >
                                        <LogOutIcon className="w-4 h-4" />
                                        Deconectare
                                    </Button>
                                ) : (
                                    <>
                                        <Link href="/autentificare">
                                            <Button
                                                variant="outline"
                                                className="w-full border-primary/30 text-primary hover:bg-accent bg-transparent"
                                            >
                                                Autentifică-te
                                            </Button>
                                        </Link>

                                        <Link href="/inregistrare">
                                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                                Înregistrează-te
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <button
                        onClick={() => handleScrollTo("top")}
                        className="flex items-center gap-2"
                    >
                        <span className="text-xl font-extrabold tracking-tight text-green-700">
                            CIVICOM✨
                        </span>
                    </button>
                </div>

                {/* ================= DESKTOP NAV ================= */}
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

                {/* ================= DESKTOP ACTIONS ================= */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <Link href="#">
                                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Creează eveniment
                                </Button>
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <UserIcon />
                                            Profil
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <SettingsIcon />
                                            Setări
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={handleLogout}
                                        >
                                            <LogOutIcon />
                                            Deconectare
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/autentificare">
                                <Button variant="outline" size="sm">
                                    Autentifică-te
                                </Button>
                            </Link>

                            <Link href="/inregistrare">
                                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Înregistrează-te
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}