'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import PasswordInput from "@/components/PasswordInput"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/animate-ui/components/radix/alert-dialog"
import { redirect } from "next/navigation"
import { signUpHandler } from "@/utils/authHandlers"

/**
 * SignupForm component renders the sign-up form UI.
 * Handles user input, form submission, and displays feedback via toast and dialog.
 *
 * @param className Optional CSS class string to customize the form styling
 * @param props Standard React form props spread onto the form element
 * @returns JSX.Element for the sign-up form
 */
export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
    // State to control the success dialog
    const [openDialog, setOpenDialog] = useState(false)

    /**
     * Handles form submission.
     * Calls the signUpHandler helper to perform server action.
     *
     * @param e React form event
     */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const result = await signUpHandler(e)

        if (!result.success) {
            // Show error toast if signup failed
            toast.error(result.message)
        } else {
            // Open confirmation dialog if signup succeeded
            setOpenDialog(true)
        }
    }

    return (
        <>
            <form
                className={cn("flex flex-col gap-6", className)}
                {...props}
                onSubmit={handleSubmit}
            >
                <FieldGroup>
                    {/* Form header */}
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Creează-ți contul</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Să facem o lume mai bună pentru toți!
                        </p>
                    </div>

                    {/* Name input */}
                    <Field>
                        <FieldLabel htmlFor="name">Nume complet</FieldLabel>
                        <Input name="name" type="text" placeholder="Popescu Ion" required />
                    </Field>

                    {/* Email input */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input name="email" type="email" placeholder="m@example.com" required />
                        <FieldDescription>
                            Vom folosi acest email pentru a te contacta. Nu îl vom distribui nimănui.
                        </FieldDescription>
                    </Field>

                    {/* Password input */}
                    <Field>
                        <FieldLabel htmlFor="password">Parolă</FieldLabel>
                        <PasswordInput name={'password'} />
                        <FieldDescription>
                            Trebuie să aibă cel puțin 8 caractere.
                        </FieldDescription>
                    </Field>

                    {/* Confirm password input */}
                    <Field>
                        <FieldLabel htmlFor="confirm-password">Confirmă parola</FieldLabel>
                        <PasswordInput name={'confirmPassword'} />
                    </Field>

                    {/* Submit button */}
                    <Field>
                        <Button type="submit">Creează cont</Button>
                    </Field>

                    {/* Separator and alternative signup */}
                    <FieldSeparator>Sau continuă cu</FieldSeparator>
                    <Field>
                        <Button variant="outline" type="button">
                            {/* GitHub icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12 .297c-6.63 0-12 5.373-12 12 ... etc"
                                    fill="currentColor"
                                />
                            </svg>
                            Înscrie-te cu GitHub
                        </Button>

                        {/* Sign-in link */}
                        <FieldDescription className="px-6 text-center">
                            Ai deja un cont? <Link href="/auth/sign-in">Autentifică-te</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>

            {/* Success dialog */}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Autentificare reușită</AlertDialogTitle>
                        <AlertDialogDescription>
                            Verifică emailul pentru confirmare.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => redirect('/auth/sign-in')}>OK</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
