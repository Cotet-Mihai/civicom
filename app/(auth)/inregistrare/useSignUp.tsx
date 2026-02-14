'use client'

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { passwordRequirements } from "@/app/(auth)/inregistrare/data";
import {signUpUser} from "@/services/auth/signUpService";

/**
 * useSignin
 *
 * Custom hook responsible for:
 * - managing form field state
 * - computing password strength
 * - handling validation logic
 *
 * Keeps the SignupForm component clean and focused on UI.
 */
export default function useSignUp() {

    /** -------------------------
     *  Form Field State
     *  -------------------------
     *  Controlled inputs for the signup form
     */
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    /** Controls submit loading state */
    const [loading, setLoading] = useState<boolean>(false);

    /** Controls success dialog visibility */
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    /**
     * Handles form submission.
     * - prevents default submit behavior
     * - runs validation
     * - calls signup service
     * - displays success dialog on success
     */
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const isValid = validator();
        if (!isValid) return;

        setLoading(true);

        try {
            await signUpUser(
                email,
                password,
                firstName,
                lastName,
            );

            // Open confirmation dialog after successful signup
            setIsDialogOpen(true);

        } catch (err) {
            // Ideally this could be replaced with a toast
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Checks if all required fields contain non-empty trimmed values.
     * Used to disable submit button until form is complete.
     */
    const isFormFilled =
        [lastName, firstName, email, password, confirmPassword]
            .every(value => value.trim() !== '');

    /**
     * Password strength calculation.
     *
     * Memoized to only recompute when the password changes.
     * Prevents unnecessary recalculations on other state updates.
     */
    const { strength, strengthScore } = useMemo(() => {

        // Map requirements into UI-friendly structure
        const strength = passwordRequirements.map(req => ({
            met: req.regex.test(password),
            text: req.text
        }));

        // Count how many requirements are satisfied
        const strengthScore = strength.filter(s => s.met).length;

        return { strength, strengthScore };

    }, [password]);

    /**
     * Validates form data before submission.
     * Shows toast messages for validation failures.
     *
     * @returns boolean indicating if form is valid
     */
    function validator(): boolean {

        // Basic completeness check
        if (!isFormFilled) return false;

        // Minimum length validation
        if (password.length < 8) {
            toast.error('Parola ta trebuie să conțină cel puțin 8 caractere.');
            return false;
        }

        // Password strength validation
        if (strengthScore < 3) {
            toast.error('Parola e prea slabă.');
            return false;
        }

        // Confirm password match validation
        if (password !== confirmPassword) {
            toast.error('Parolele nu coincid.');
            return false;
        }

        return true;
    }

    /**
     * Exposed API of the hook.
     *
     * - states → grouped field state setters/values
     * - validator → form validation function
     * - controls → derived UI helpers
     * - strength → password strength info for UI rendering
     */
    return {
        states: {
            lastName: { value: lastName, set: setLastName },
            firstName: { value: firstName, set: setFirstName },
            email: { value: email, set: setEmail },
            password: { value: password, set: setPassword },
            confirmPassword: { value: confirmPassword, set: setConfirmPassword },
            loading: { value: loading, set: setLoading},
            dialog: { value: isDialogOpen, set: setIsDialogOpen}
        },
        handleSubmit,
        controls: {
            isFormFilled
        },
        strength: {
            strength,
            strengthScore
        }
    }
}