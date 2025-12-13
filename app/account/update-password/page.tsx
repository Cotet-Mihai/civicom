'use client'

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/components/ui/field";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import React, { JSX, useState } from "react";
import { toast } from "sonner";
import { updatePasswordAction } from "@/lib/supabase/actions/resetPassword";
import { redirect } from "next/navigation";
import Link from "next/link";
import { validatePasswords } from "@/utils/validatePasswords";

/**
 * UpdatePassword component renders a password reset form
 * allowing the user to set a new password and confirm it.
 *
 * Uses client-side state for input handling, validation via helper,
 * and calls server action to update the password in Supabase.
 *
 * @returns {JSX.Element} The password reset form UI
 */
export default function UpdatePassword(): JSX.Element {
    // State for new password input
    const [newPassword, setNewPassword] = useState('');

    // State for confirm password input
    const [confirmPassword, setConfirmPassword] = useState('');

    /**
     * Handle form submission for password reset.
     * Validates passwords, calls server action, shows toast notifications,
     * and redirects on success.
     *
     * @param e - Form submission event
     * @returns {Promise<string | undefined | number>} Optional return for error handling
     */
    const handleSubmit = async (e: React.FormEvent): Promise<string | undefined | number> => {
        e.preventDefault();

        // Validate passwords using helper function
        const error = validatePasswords(newPassword, confirmPassword);
        if (error) return toast.error(error);

        // Call server action to update password in Supabase
        const result = await updatePasswordAction(newPassword);

        // Show toast notifications based on result
        if (result?.error) {
            return toast.error(result.error);
        } else {
            toast.success('Parola resetată cu succes!');
        }

        // Redirect user to sign-in page after successful password update
        redirect('/auth/sign-in');
    }

    return (
        <div className={'w-full h-screen flex justify-center items-center bg-green-50 flex-col'}>
            {/* Application title with link to home */}
            <h1 className={'font-bold text-2xl text-green-900 mb-5'}>
                <Link href={'/'}>
                    CIVICOM✨
                </Link>
            </h1>

            {/* Password reset form */}
            <form className={'border border-gray-200 p-5 rounded-xl shadow bg-white'} onSubmit={handleSubmit}>
                <FieldSet>
                    {/* Form legend and description */}
                    <FieldLegend>
                        Resetează Parola
                    </FieldLegend>
                    <FieldDescription>
                        Introdu noua parolă în câmpurile de mai jos pentru a finaliza procesul.
                    </FieldDescription>
                    <FieldSeparator/>

                    {/* Password input fields */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor={'new-password'}>
                                Noua Parolă
                            </FieldLabel>
                            <PasswordInput
                                name={'new-password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'confirm-password'}>
                                Confirmă Parolă
                            </FieldLabel>
                            <PasswordInput
                                name={'confirm-password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Field>
                    </FieldGroup>

                    <FieldSeparator/>

                    {/* Submit button */}
                    <Field orientation="responsive">
                        <Button type="submit">Salvează</Button>
                    </Field>
                </FieldSet>
            </form>
        </div>
    );
}
