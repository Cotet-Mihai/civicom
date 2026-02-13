'use client'

import { CheckCircle2, Mail, ArrowRight, Shield } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Confetti } from "@/components/Confetti"
import Link from "next/link";

export default function EmailVerified() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Confetti />

            <Card className="overflow-hidden border-border/60 shadow-lg w-full max-w-md p-0">
                <CardHeader className="flex flex-col items-center bg-accent/40 pb-8 pt-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground text-balance">
                            Email verificat cu succes
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Adresa ta de email a fost confirmata. Contul tau este acum activ.
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-6 py-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Verificare completa
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Adresa de email a fost verificata si asociata contului tau.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Cont securizat
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Acum poti accesa toate functionalitatile disponibile.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className={'pb-5'}>
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/">
                            Inapoi la pagina principala
                            <ArrowRight />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}