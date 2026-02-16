'use client'

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import InputPassword from "@/components/InputPassword";
import useSignIn from "@/app/(auth)/autentificare/useSignIn";
import {Spinner} from "@/components/ui/spinner";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

/**
 * SignInForm
 *
 * Client component for rendering the login form.
 * - Uses the `useSignIn` hook for state, validation, and submit handling.
 * - Renders email and password inputs.
 * - Displays submit button with loading spinner.
 * - Provides links for forgotten password and sign-up.
 * - Includes optional social login button.
 */
export function SignInForm({ className, ...props }: React.ComponentProps<"form">) {

    // Hook that manages state, validation, and submit
    const { states, handleSubmit, handleForgetPassword, controls } = useSignIn();

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit} // Submit handled by hook
            {...props}>
            <FieldGroup>
                {/* Form Header */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Autentificare</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Să facem o lume mai bună pentru toți!
                    </p>
                </div>

                {/* Email Field */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nume@exemplu.ro"
                        value={states.email.value ?? ''}
                        onChange={(e) => states.email.set(e.target.value)}
                        tabIndex={1}
                    />
                </Field>

                {/* Password Field */}
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Parolă</FieldLabel>
                        <Dialog open={states.openReset.value} onOpenChange={states.openReset.set}>
                            <DialogTrigger asChild>
                                <Button
                                    variant={"link"}
                                    className="ml-auto text-secondary-foreground p-0"
                                    tabIndex={6}
                                >
                                    Ai uitat parola?
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Ai uitat parola ?</DialogTitle>
                                    <DialogDescription>
                                        Introdu adresa ta de e-mail mai jos și îți vom trimite un link de resetare a parolei.
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor={'email'}>E-mail</Label>
                                        <Input
                                            name={'email'}
                                            type={"email"}
                                            placeholder={'nume@exemplu.ro'}
                                            value={states.emailResetPassword.value ?? ''}
                                            onChange={(e) => states.emailResetPassword.set(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (!states.loadingResetPassword.value && states.emailResetPassword.value) {
                                                        handleForgetPassword( { e:e, setOpen: states.openReset.set } );
                                                    }
                                                }
                                            }}
                                        />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Anulează</Button>
                                    </DialogClose>
                                    <Button
                                        onClick={(e) => handleForgetPassword({
                                            e,
                                            setOpen: states.openReset.set // aici trimiți funcția care închide dialogul
                                        })}
                                        disabled={states.loadingResetPassword.value}
                                    >
                                        {states.loadingResetPassword.value ? "Se trimite..." : "Trimite solicitare"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <InputPassword
                        value={states.password.value}
                        onChangeAction={states.password.set}
                        tabIndex={2}
                    />
                </Field>

                {/* Submit Button */}
                <Field>
                    <Button
                        type="submit"
                        disabled={!controls.isFormFilled || states.loadingSubmitSignIn.value} // Disable button if form incomplete or loading
                        tabIndex={3}
                    >
                        {states.loadingSubmitSignIn.value && <Spinner />} {/* Show spinner while loading */}

                        {states.loadingSubmitSignIn.value
                            ? "Se verifică..."
                            : !controls.isFormFilled
                                ? 'Completează toate câmpurile'
                                : 'Autentifică-te'
                        }
                    </Button>
                </Field>

                {/* Separator */}
                <FieldSeparator>Sau continuă cu</FieldSeparator>

                {/* Social Login Button */}
                <Field>
                    <div className="flex gap-3">
                        <Button variant="outline" type="button" className="flex-1">
                            GitHub
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                        >
                            Google
                        </Button>
                    </div>

                    {/* Link to Sign-up page */}
                    <FieldDescription className="text-center">
                        Nu ai un cont?{" "}
                        <Link href="/inregistrare" className="underline underline-offset-4" tabIndex={5}>
                            Înregistrează-te
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}