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
    const { states, handleSubmit, controls } = useSignIn();

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
                        <Link
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                            tabIndex={6}
                        >
                            Ai uitat parola?
                        </Link>
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
                        disabled={!controls.isFormFilled || states.loading.value} // Disable button if form incomplete or loading
                        tabIndex={3}
                    >
                        {states.loading.value && <Spinner />} {/* Show spinner while loading */}

                        {states.loading.value
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