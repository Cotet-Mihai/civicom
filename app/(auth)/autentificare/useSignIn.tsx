'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signInAction } from "@/actions/auth/signInAction";
import { toast } from "sonner";

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


    // Shows spinner or disables button during submission
    const [loading, setLoading] = useState<boolean>(false);

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

        setLoading(true);

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

            console.error("Sign in error:", err);

            // Reset loading state on error
            setLoading(false);
        }
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
            loading: { value: loading, set: setLoading }
        },
        handleSubmit,
        controls: { isFormFilled }
    }
}