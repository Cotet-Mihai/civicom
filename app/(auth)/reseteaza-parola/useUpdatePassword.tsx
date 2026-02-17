'use client'

import React, { useMemo, useState } from "react";
import { passwordRequirements } from "@/app/(auth)/inregistrare/data";
import { toast } from "sonner";
import { updatePasswordAction } from "@/services/auth/passwordActions";
import { signOutAction } from "@/services/auth/signOutAction";
import { redirect } from "next/navigation";

/**
 * useUpdatePassword
 *
 * Custom hook responsible for handling the full password reset flow.
 *
 * Responsibilities:
 * - Manage password and confirmation state
 * - Compute password strength
 * - Validate inputs
 * - Call server action to update password
 * - Trigger sign-out after successful update
 * - Redirect user to authentication page
 *
 * @returns {object} Password state, strength info and submit handler
 */
export default function useUpdatePassword() {

    // New password input state
    const [newPassword, setNewPassword] = useState<string>("")

    // Confirmation password input state
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    // Loading state used to disable submit button during async flow
    const [isLoading, setIsLoading] = useState<boolean>(false)

    /**
     * Password strength calculation.
     *
     * Memoized to only recompute when the password changes.
     * Prevents unnecessary recalculations on other state updates.
     *
     * strength: Array of requirement objects with "met" flag
     * strengthScore: Number of fulfilled requirements
     */
    const { strength, strengthScore } = useMemo(() => {

        // Map raw requirements into UI-friendly structure
        const strength = passwordRequirements.map(req => ({
            met: req.regex.test(newPassword),
            text: req.text
        }));

        // Count fulfilled requirements
        const strengthScore = strength.filter(s => s.met).length;

        return { strength, strengthScore };

    }, [newPassword]);

    /**
     * Validates password fields.
     *
     * @param {string} newPassword - The new password entered by user
     * @param {string} confirmPassword - Confirmation password
     * @returns {string | null} Error message if validation fails, otherwise null
     */
    function validate(newPassword: string, confirmPassword: string): string | null {
        if (newPassword !== confirmPassword) return 'Parolele nu coincid!';
        if (strengthScore < 3) return 'Parola e prea slabă.';
        return null;
    }

    /**
     * Handles form submission.
     *
     * Flow:
     * 1. Prevent default form behavior
     * 2. Validate inputs
     * 3. Call updatePasswordAction (server action)
     * 4. Show toast feedback
     * 5. Sign out user
     * 6. Redirect to authentication page
     *
     * @param {React.SyntheticEvent} e - Form submission event
     * @returns {Promise<string | undefined | number>}
     */
    const handleSubmit = async (
        e: React.SyntheticEvent
    ): Promise<string | undefined | number> => {

        e.preventDefault();
        setIsLoading(true);

        // Validate passwords before calling server
        const error = validate(newPassword, confirmPassword);

        if (error) {
            setIsLoading(false);
            return toast.error(error);
        }

        // Call server action to update password
        const result = await updatePasswordAction(newPassword);

        if (result?.error) {
            setIsLoading(false);
            return toast.error(result.error);
        } else {
            setIsLoading(false);
            toast.success('Parola resetată cu succes!');
        }

        // Sign out current recovery session
        await signOutAction()

        // Redirect to authentication page
        redirect('/autentificare')
    }

    return {
        states: {
            newPassword: { value: newPassword, set: setNewPassword },
            confirmPassword: { value: confirmPassword, set: setConfirmPassword },
            loading: { value: isLoading, set: setIsLoading },
        },
        handleSubmit,
        strength: {
            strength,
            strengthScore
        }
    }
}