import React from "react";
import { signInWithEmailAction } from "@/lib/supabase/actions/signIn";
import { resetPasswordAction } from "@/lib/supabase/actions/resetPassword";
import {signupAction} from "@/lib/supabase/actions/signUp";

/**
 * Standardized result type for all authentication actions.
 */
interface ActionResult {
    success: boolean;        // Indicates if the action succeeded
    message?: string;        // Optional message to show (e.g., eroare or success info)
}

/**
 * Handles sign-in form submission.
 * Calls the Supabase action and returns a standardized result.
 *
 * @param e Form event from the sign-in form
 * @returns {Promise<ActionResult>} Success/failure and optional message
 */
export async function signInHandler(e: React.FormEvent<HTMLFormElement>): Promise<ActionResult> {
    const formData = new FormData(e.currentTarget);
    const result = await signInWithEmailAction(formData);

    if (result?.error) {
        return { success: false, message: result.error };
    }

    return { success: true };
}

/**
 * Handles sign-up form submission.
 * Calls the Supabase sign-up action and returns a standardized result.
 *
 * @param e Form event from the sign-up form
 * @returns {Promise<ActionResult>} Success/failure and optional message
 */
export async function signUpHandler(e: React.FormEvent<HTMLFormElement>): Promise<ActionResult> {
    const formData = new FormData(e.currentTarget);
    const result = await signupAction(formData);

    if (result?.error) {
        return { success: false, message: result.error };
    }

    return { success: true };
}


/**
 * Handles password reset requests.
 * Calls the Supabase action and returns a standardized result.
 *
 * @param email User email to send the reset link
 * @returns {Promise<ActionResult>} Success/failure and optional message
 */
export async function resetPassword(email: string): Promise<ActionResult> {
    if (!email) {
        return { success: false, message: "Te rog introdu email-ul." };
    }

    const result = await resetPasswordAction(email);

    if (result?.error) {
        return { success: false, message: "A apărut o eroare." };
    }

    return { success: true, message: "Email trimis!" };
}
