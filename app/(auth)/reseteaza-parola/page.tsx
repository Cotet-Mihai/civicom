'use client'

import React from "react"
import {
    KeyRound,
    ArrowRight,
    ArrowLeft,
    HelpCircle,
    CheckIcon,
    XIcon
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import InputPasswordStrength from "@/components/InputPasswordWithStrength";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import InputPassword from "@/components/InputPassword";
import useUpdatePassword from "@/app/(auth)/reseteaza-parola/useUpdatePassword";

/**
 * ResetPassword Page
 *
 * Handles the UI for updating the user's password during the recovery flow.
 *
 * Responsibilities:
 * - Render password reset form
 * - Display dynamic password strength feedback
 * - Handle submission through useUpdatePassword hook
 * - Provide visual guidance for secure password creation
 *
 * Notes:
 * - This is a Client Component because it relies on client-side state and hooks.
 * - Business logic is delegated to the `useUpdatePassword` hook.
 */
export default function ResetPassword() {
    // Custom hook that encapsulates:
    // - state management
    // - validation logic
    // - password strength calculation
    // - submission handler
    const { states, handleSubmit, strength } = useUpdatePassword();

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="overflow-hidden border-border/60 shadow-lg w-full max-w-md p-0">

                {/* Header Section */}
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
                    {/*
                        Password Reset Form
                        - Controlled inputs
                        - Submission handled by custom hook
                    */}
                    <form
                        className="flex flex-col gap-4"
                        id="reset-form"
                        onSubmit={handleSubmit}
                    >
                        {/* New Password Field */}
                        <div className="flex flex-col gap-2 w-full">
                            <Field className={'w-full'}>
                                <FieldLabel>
                                    Parola nouă

                                    {/*
                                        Tooltip showing dynamic password requirements.
                                        Requirements update in real time based on password input.
                                    */}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                size='icon'
                                                className='p-0 w-4 h-4 text-muted-foreground hover:text-foreground'
                                            >
                                                <HelpCircle className='w-4 h-4' />
                                                <span className='sr-only'>Cerințe parolă</span>
                                            </Button>
                                        </TooltipTrigger>

                                        <TooltipContent className='text-xs'>
                                            <ul className='space-y-1'>
                                                {strength.strength.map((req, index) => (
                                                    <li key={index} className='flex items-center gap-1'>
                                                        {/* Visual feedback for each password requirement */}
                                                        {req.met
                                                            ? <CheckIcon className='w-3 h-3 text-green-600 dark:text-green-400' />
                                                            : <XIcon className='w-3 h-3 text-muted-foreground' />
                                                        }
                                                        <span>{req.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </TooltipContent>
                                    </Tooltip>
                                </FieldLabel>

                                {/*
                                    Password input component with strength indicator.
                                    Strength data is computed inside the hook.
                                */}
                                <InputPasswordStrength
                                    password={states.newPassword.value}
                                    setPasswordAction={states.newPassword.set}
                                    strength={strength}
                                />
                            </Field>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-2">
                            <Field>
                                <FieldLabel>
                                    Confirmă Parola
                                </FieldLabel>

                                {/*
                                    Simple controlled password input.
                                    Must match new password during validation.
                                */}
                                <InputPassword
                                    value={states.confirmPassword.value ?? ''}
                                    onChangeAction={(val) => states.confirmPassword.set(val)}
                                    placeholder={'Confirmați parola'}
                                />

                                <FieldDescription>
                                    Te rugăm să confirmi parola.
                                </FieldDescription>
                            </Field>
                        </div>

                        <Separator />

                        {/* Security Tips Section */}
                        <div className="flex items-start gap-3 rounded-lg bg-foreground/5 p-3">
                            <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Sfaturi pentru o parola sigura
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                                    Foloseste cel putin 12 caractere, incluzand litere mari, mici, cifre si simboluri.
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>

                <Separator />

                {/* Footer Actions */}
                <CardFooter className="flex flex-col gap-3 pb-5">
                    {/* Submit Button */}
                    <Button
                        className="w-full"
                        size="lg"
                        type={"submit"}
                        form="reset-form"
                        disabled={states.loading.value}
                    >
                        {states.loading.value ? "Se proceseaza..." : "Reseteaza parola"}
                        {!states.loading.value && <ArrowRight />}
                    </Button>

                    {/* Back to log in */}
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