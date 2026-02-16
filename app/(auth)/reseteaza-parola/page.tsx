'use client'

import { useState } from "react"
import { KeyRound, ArrowRight, ArrowLeft, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="overflow-hidden border-border/60 shadow-lg w-full max-w-md p-0">
                <CardHeader className="flex flex-col items-center bg-accent/40 pb-8 pt-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <KeyRound className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground text-balance">
                            Reseteaza parola
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Introdu adresa de email si o parola noua pentru contul tau.
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" id="reset-form">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="new-password" className="text-sm font-medium text-foreground">
                                Parola noua
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="new-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minim 8 caractere"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? "Ascunde parola" : "Arata parola"}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                                Confirma parola
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Repeta parola noua"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showConfirmPassword ? "Ascunde parola" : "Arata parola"}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Sfaturi pentru o parola sigura
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Foloseste cel putin 8 caractere, incluzand litere mari, mici, cifre si simboluri.
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>

                <Separator />

                <CardFooter className="flex flex-col gap-3 pb-5">
                    <Button
                        className="w-full"
                        size="lg"
                        type="submit"
                        form="reset-form"
                        disabled={isLoading}
                    >
                        {isLoading ? "Se proceseaza..." : "Reseteaza parola"}
                        {!isLoading && <ArrowRight />}
                    </Button>
                    <Button variant="ghost" className="w-full" size="sm" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                            Inapoi la autentificare
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}

function SuccessView() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="overflow-hidden border-border/60 shadow-lg w-full max-w-md p-0">
                <CardHeader className="flex flex-col items-center bg-accent/40 pb-8 pt-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground text-balance">
                            Parola a fost resetata
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Parola contului tau a fost schimbata cu succes.
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-6 py-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Parola actualizata
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Noua ta parola a fost salvata. Foloseste-o la urmatoarea autentificare.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Cont securizat
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Toate sesiunile anterioare au fost deconectate pentru siguranta ta.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className="pb-5">
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/">
                            Inapoi la autentificare
                            <ArrowRight />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
