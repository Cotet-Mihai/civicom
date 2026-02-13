'use client'

import React, {useState} from "react";
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
import useSignin from "@/app/(auth)/inregistrare/useSignin";
import InputPassword from "@/components/InputPassword";
import InputPasswordStrength from "@/components/InputPasswordWithStrength";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CheckIcon, HelpCircle, XIcon} from "lucide-react";
import {signUpUser} from "@/services/auth/signupService";
import {Spinner} from "@/components/ui/spinner";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
    const { states, validator, controls, strength } = useSignin();
    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const isValid = validator();
        if (!isValid) return

        setLoading(true);
        try {
            await signUpUser(
                states.email.value,
                states.password.value,
                states.firstName.value,
                states.lastName.value,
            );
            setIsDialogOpen(true);
        } catch (err) {
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className={cn("flex flex-col", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Cont creat cu succes!</DialogTitle>
                        <DialogDescription>
                            Felicitări! 😃Contul tău a fost creat cu succes. 🎉 <br/>
                            Te rugăm să verifici email-ul și să confirmi adresa de email pentru a-ți activa contul.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>OK</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <FieldGroup className="gap-4">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Creează-ți contul</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Să facem o lume mai bună pentru toți!
                    </p>
                </div>

                <Field>
                    <FieldLabel>Nume</FieldLabel>
                    <Input
                        type="text"
                        placeholder="Ion"
                        value={states.lastName.value ?? ''}
                        onChange={(e) => states.lastName.set(e.target.value)}
                    />
                </Field>

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

                {/* Parola */}
                <Field>
                    <FieldLabel>
                        Parolă
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='ghost' size='icon' className='p-0 w-4 h-4 text-muted-foreground hover:text-foreground'>
                                    <HelpCircle className='w-4 h-4' />
                                    <span className='sr-only'>Cerințe parolă</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className='text-xs'>
                                <ul className='space-y-1'>
                                    {strength.strength.map((req, index) => (
                                        <li key={index} className='flex items-center gap-1'>
                                            {req.met ? <CheckIcon className='w-3 h-3 text-green-600 dark:text-green-400' /> : <XIcon className='w-3 h-3 text-muted-foreground' />}
                                            <span>{req.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </FieldLabel>
                    <InputPasswordStrength
                        password={states.password.value}
                        setPasswordAction={states.password.set}
                        strength={strength}
                    />
                </Field>

                {/* Confirmare parola */}
                <Field>
                    <InputPassword
                        value={states.confirmPassword.value ?? ''}
                        onChangeAction={(val) => states.confirmPassword.set(val)}
                        placeholder={'Confirmați parola'}
                    />
                    <FieldDescription>Te rugăm să confirmi parola.</FieldDescription>
                </Field>

                {/* Submit */}
                <Field>
                    <Button type="submit" disabled={!controls.isFormFilled || loading} className="flex items-center justify-center gap-2">
                        {loading && <Spinner />}
                        {loading ? "Se înregistrează..." : !controls.isFormFilled ? 'Completează toate câmpurile' : 'Creează contul'}

                    </Button>

                </Field>

                <FieldSeparator>Sau continuă cu</FieldSeparator>

                <Field>
                    <div className="flex gap-3">
                        <Button variant="outline" type="button" className="flex-1">
                            {/* GitHub Icon */}
                            GitHub
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1" >
                            Google
                        </Button>
                    </div>
                </Field>
                <FieldDescription className="text-center">
                    Ai deja un cont? <a href="#">Autentifică-te</a>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
