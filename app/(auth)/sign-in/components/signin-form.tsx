'use client'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/animate-ui/components/radix/dialog';
import {Label} from "@/components/ui/label";
import {resetPassword, signInHandler} from "@/utils/authHandlers";
import InputPassword from "@/components/InputPassword";

/**
 * SigninForm component handles user authentication UI
 * and actions like sign-in and password reset.
 */
export function SigninForm({ className, ...props } : React.ComponentProps<"form">) {

    // Local state to store user's email input
    const [email, setEmail] = useState("");

    /**
     * Handles form submission for signing in
     * Calls the reusable signInHandler helper function
     * and displays success/error toasts
     */
    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();

        const response = await signInHandler(e);

        // Show error toast if sign-in failed
        if (!response.success) {
            toast.error(response.message);
        }
    }

    /**
     * Handles password reset when user clicks "Forgot Password"
     * Calls the reusable resetPassword helper function
     * Displays appropriate toast messages based on response
     */
    async function handleForgetPassword(e: React.MouseEvent<HTMLButtonElement>) : Promise<void> {
        e.preventDefault();

        const response = await resetPassword(email);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSignIn}>
            <FieldGroup>
                {/* Header section */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Autentifică-te</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Să facem o lume mai bună pentru toți!
                    </p>
                </div>

                {/* Email input */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input tabIndex={1} name="email" type="email" placeholder="m@example.com" required/>
                </Field>

                {/* Password input with "Forgot Password" dialog */}
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password" className={'mr-auto'}>Parolă</FieldLabel>

                        {/* Dialog trigger for password reset */}
                        <Dialog>
                            <DialogTrigger tabIndex={6}>
                                <span className="text-sm underline-offset-4 hover:underline cursor-pointer">
                                  Ați uitat parola?
                                </span>
                            </DialogTrigger>

                            {/* Dialog content */}
                            <DialogContent className="max-w-md p-6">
                                <DialogHeader>
                                    <DialogTitle>Resetează Parola</DialogTitle>
                                    <DialogDescription>
                                        Introdu adresa de email asociată contului tău, iar noi îți vom trimite un link
                                        pentru resetarea parolei.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Input for email within dialog */}
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" placeholder="m@exemple.com" onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                {/* Footer with reset button */}
                                <DialogFooter className="mt-4 flex justify-end gap-2">
                                    <Button
                                        type="submit"
                                        className="py-2"
                                        onClick={handleForgetPassword} // calls helper function
                                    >
                                        Trimite link resetare
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Password input field */}
                    <InputPassword tabIndex={2} name="password"/>
                </Field>

                {/* Sign-in button */}
                <Field>
                    <Button tabIndex={3} variant={'mainButton'} type="submit">Conectează-te</Button>
                </Field>

                {/* Divider */}
                <FieldSeparator>Sau continuați cu</FieldSeparator>

                {/* Alternative login (e.g., GitHub) */}
                <Field>
                    <Button tabIndex={4} variant="outline" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                        Autentificare cu GitHub
                    </Button>

                    {/* Link to sign-up page */}
                    <FieldDescription className="text-center">
                        Nu aveți un cont?{" "}
                        <Link tabIndex={5} href="/sign-up" className="underline underline-offset-4">
                            Înscrie-te
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
