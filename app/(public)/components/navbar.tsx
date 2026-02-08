"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle, SheetDescription, SheetHeader, SheetFooter,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Acasa", href: "#" },
  { label: "Evenimente", href: "#evenimente" },
  { label: "ONG-uri", href: "#ong-uri" },
  { label: "Despre noi", href: "#despre" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="#" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-green-700">
            CIVICOM✨
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/*  // TODO: De implementat logica de a detecta daca este conectat sau nu*/}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground bg-transparent">
            Autentifică-te
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Înregistrează-te
          </Button>
            {/*// TODO: De adaugat logica de a verifica daca exista utilziator conectat*/}
            {/*<Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-accent hover:text-accent-foreground bg-transparent">*/}
            {/*    Implica-te*/}
            {/*</Button>*/}
            {/*<Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">*/}
            {/*    Creează eveniment*/}
            {/*</Button>*/}
        </div>

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
                <SheetTitle className="text-green-700 font-extrabold text-xl">CIVICOM✨</SheetTitle>
                <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
              <SheetFooter>
                  <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-accent bg-transparent">
                      Autentifică-te
                  </Button>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Înregistrează-te
                  </Button>
                  {/*// TODO: De adaugat logica de a verifica daca utilziator este autentificat*/}
                  {/*<Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-accent bg-transparent">*/}
                  {/*    Implica-te*/}
                  {/*</Button>*/}
                  {/*<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">*/}
                  {/*    Creaza eveniment*/}
                  {/*</Button>*/}
              </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
