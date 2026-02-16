'use client'

import React, {Dispatch, SetStateAction, useState} from "react";
import { useRouter } from "next/navigation";

import { signInAction } from "@/services/auth/signInAction";
import { toast } from "sonner";
import {resetPasswordAction} from "@/services/auth/passwordActions";

/**
 * useSignIn
 *
 * Custom React hook for managing the sign-in form.
 * Encapsulates:
 * - form state (email, password)
 * - validation
 * - loading state
 * - submission handling via server action
 * - navigation after successful login
 */
export default function useSignIn() {
    const router = useRouter();

    /** -------------------------
     * Form state
     * -------------------------
     * Controlled inputs for email and password fields
     */
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailResetPassword, setEmailResetPassword] = useState<string>("");


    // Shows spinner or disables button during submission
    const [loadingSubmitSignIn, setLoadingSubmitSignIn] = useState<boolean>(false);
    const [loadingResetPassword, setLoadingResetPassword] = useState<boolean>(false);

    const [openReset, setOpenReset] = useState<boolean>(false);

    // Checks if all required fields are filled
    const isFormFilled = [email, password].every(value => value.trim() !== '');

    /**
     * Basic validation function.
     * Currently only checks if fields are filled.
     */
    function validator(): boolean {
        return isFormFilled;
    }

    /**
     * Form submission handler
     * - Prevents default form submission
     * - Validates inputs
     * - Calls the server action `signInAction`
     * - Handles success by navigating to home page
     * - Handles errors with toast notifications
     */
    async function handleSubmit(e: React.SubmitEvent<HTMLElement>) {
        e.preventDefault();

        const isValid = validator();
        if (!isValid) return;

        setLoadingSubmitSignIn(true);

        try {
            // Call server action for sign-in
            await signInAction(email, password);

            // Redirect to home page after successful login
            router.push('/');
            router.refresh();

        } catch (err) {
            // Handle specific invalid credentials error
            if (err instanceof Error && err.message === 'Invalid login credentials') {
                toast.error(`Nu am putut găsi utilizatorul. Verifică email-ul și parola și încearcă din nou.`);
            } else {
                toast.error(`A apărut o eroare la autentificare`);
            }

            console.error("Eroare Autentificare:", err);

            // Reset loading state on error
            setLoadingSubmitSignIn(false);
        }
    }

    type HandleForgetPasswordProps = {
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
        setOpen: Dispatch<SetStateAction<boolean>>
    }


    async function handleForgetPassword({e, setOpen}: HandleForgetPasswordProps ) {
        e.preventDefault();
        setLoadingResetPassword(true);

        toast.promise(
            resetPasswordAction(emailResetPassword),
            {
                loading: "Se trimite solicitarea...",
                success: () => {
                    setLoadingResetPassword(false);
                    setOpen(false);
                    setEmailResetPassword('');
                    return "Email-ul de resetare a fost trimis cu succes!"
                },
                error: (err) => {
                    setLoadingResetPassword(false)
                    if (err instanceof Error && err.message.includes('invalid format') || err.message.includes('Password recovery requires an email')) {
                        return 'Adaugă o adresă de e-mail validă.'
                    }
                    console.log(err);
                    return 'A apărut o eroare la trimiterea e-mail-ului.'
                }
            }
        );
    }

    /** -------------------------
     * Exposed hook API
     * -------------------------
     * - `states`: getters and setters for form fields
     * - `handleSubmit`: form submission handler
     * - `controls`: derived UI helpers
     */
    return {
        states: {
            email: { value: email, set: setEmail },
            password: { value: password, set: setPassword },
            loadingSubmitSignIn: { value: loadingSubmitSignIn, set: setLoadingSubmitSignIn },
            emailResetPassword: { value: emailResetPassword, set: setEmailResetPassword },
            loadingResetPassword: { value: loadingResetPassword, set: setEmailResetPassword},
            openReset: { value: openReset, set: setOpenReset}
        },
        handleSubmit,
        handleForgetPassword,
        controls: { isFormFilled }
    }
}