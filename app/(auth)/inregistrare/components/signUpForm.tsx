'use client'

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import InputPassword from "@/components/InputPassword";
import InputPasswordStrength from "@/components/InputPasswordWithStrength";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckIcon, HelpCircle, XIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import useSignUp from "@/app/(auth)/inregistrare/useSignUp";

/**
 * SignupForm
 *
 * Client component responsible for:
 * - rendering the signup form UI
 * - handling form submission
 * - delegating field state & validation to useSignUp hook
 * - showing a success dialog after signup
 */
export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {

    /**
     * Custom hook encapsulating:
     * - field state management
     * - validation logic
     * - password strength calculation
     */
    const { states, handleSubmit, controls, strength } = useSignUp();

    return (
        <form
            className={cn("flex flex-col", className)}
            onSubmit={handleSubmit} // Calls hook’s submit handler
            {...props}
        >
            {/* Success Dialog shown after account creation */}
            <Dialog open={states.dialog.value} onOpenChange={states.dialog.set}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Cont creat cu succes!</DialogTitle>
                        <DialogDescription>
                            Felicitări! 😃 Contul tău a fost creat cu succes. 🎉 <br />
                            Te rugăm să verifici email-ul și să confirmi adresa pentru a activa contul.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>OK</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Group all fields */}
            <FieldGroup className="gap-4">

                {/* Header Section */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Creează-ți contul</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Să facem o lume mai bună pentru toți!
                    </p>
                </div>

                {/* Last Name */}
                <Field>
                    <FieldLabel>Nume</FieldLabel>
                    <Input
                        type="text"
                        placeholder="Ion"
                        value={states.lastName.value ?? ''}
                        onChange={(e) => states.lastName.set(e.target.value)}
                    />
                </Field>

                {/* First Name */}
                <Field>
                    <FieldLabel>Prenume</FieldLabel>
                    <Input
                        type="text"
                        placeholder="Popescu"
                        value={states.firstName.value ?? ''}
                        onChange={(e) => states.firstName.set(e.target.value)}
                    />
                </Field>

                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        type="email"
                        placeholder="nume@exemplu.ro"
                        value={states.email.value ?? ''}
                        onChange={(e) => states.email.set(e.target.value)}
                    />
                </Field>

                {/* Password + Requirements Tooltip */}
                <Field>
                    <FieldLabel>
                        Parolă

                        {/* Tooltip showing dynamic password requirements */}
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

                    {/* Password input with strength indicator */}
                    <InputPasswordStrength
                        password={states.password.value}
                        setPasswordAction={states.password.set}
                        strength={strength}
                    />
                </Field>

                {/* Confirm Password */}
                <Field>
                    <InputPassword
                        value={states.confirmPassword.value ?? ''}
                        onChangeAction={(val) => states.confirmPassword.set(val)}
                        placeholder={'Confirmați parola'}
                    />
                    <FieldDescription>
                        Te rugăm să confirmi parola.
                    </FieldDescription>
                </Field>

                {/* Submit Button */}
                <Field>
                    <Button
                        type="submit"
                        disabled={!controls.isFormFilled || states.loading.value}
                        className="flex items-center justify-center gap-2"
                    >
                        {states.loading.value && <Spinner />}
                        {states.loading.value
                            ? "Se înregistrează..."
                            : !controls.isFormFilled
                                ? 'Completează toate câmpurile'
                                : 'Creează contul'
                        }
                    </Button>
                </Field>

                {/* Social Auth Section */}
                <FieldSeparator>Sau continuă cu</FieldSeparator>

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
                </Field>

                {/* Redirect to log in */}
                <FieldDescription className="text-center">
                    Ai deja un cont? <Link href="/autentificare">Autentifică-te</Link>
                </FieldDescription>

            </FieldGroup>
        </form>
    )
}