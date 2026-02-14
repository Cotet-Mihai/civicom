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
import useSignIn from "@/app/(auth)/autentificare/components/useSignIn";
import {Spinner} from "@/components/ui/spinner";



export function SignInForm({ className, ...props }: React.ComponentProps<"form">) {

    const { states, handleSubmit, controls } = useSignIn();

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit}
            {...props}>
            <FieldGroup>
                {/* Titlu și descriere */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Autentificare</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Să facem o lume mai bună pentru toți!
                    </p>
                </div>

                {/* Câmp Email */}
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

                {/* Câmp Parolă */}
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

                {/* Buton Login */}
                <Field>
                    <Button
                        type="submit"
                        disabled={!controls.isFormFilled || states.loading.value}
                        tabIndex={3}
                    >
                        {states.loading.value && <Spinner/>}

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

                {/* Login cu GitHub */}
                <Field>
                    <Button variant="outline" type="button" tabIndex={4}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                        Autentificare cu GitHub
                    </Button>

                    {/* Descriere și link înregistrare */}
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