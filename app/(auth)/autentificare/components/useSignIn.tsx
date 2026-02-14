'use client'

import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {signInUser} from "@/services/auth/signInService";
import {toast} from "sonner";



export default function useSignIn() {
    const router = useRouter()

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /** Controls submit loading state */
    const [loading, setLoading] = useState<boolean>(false);

    const isFormFilled =
        [email, password]
            .every(value => value.trim() !== '');

    function validator(): boolean {
        return isFormFilled;

    }

    async function handleSubmit(e: React.SubmitEvent<HTMLElement>) {
        e.preventDefault();

        const isValid = validator();
        if (!isValid) return;

        setLoading(true);

        try {
            await signInUser(
                email,
                password
            );

            router.push('/')
            router.refresh()

        } catch (err) {
            if (err instanceof Error && err.message === 'Invalid login credentials') {
                toast.error(`Nu am putut găsii utilizatorul. Încearcă din nou.`)
            } else {
                toast.error(`A apărut o eroare la autentificare`)
            }
            console.error("Sign in error:", err)

            setLoading(false);
        }
    }

    return {
        states: {
            email: {
                value: email,
                set: setEmail
            },
            password: {
                value: password,
                set: setPassword
            },
            loading: {
                value: loading,
                set: setLoading
            }
        },
        handleSubmit,
        controls: {
            isFormFilled
        }
    }
}