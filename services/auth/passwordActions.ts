'use server'

import { createClient } from "@/lib/supabase/server";

/**
 * resetPasswordAction
 *
 * Sends a password reset email to the provided email address.
 *
 * Steps:
 * 1. Create a Supabase server client.
 * 2. Call `resetPasswordForEmail` to trigger Supabase recovery email.
 * 3. Throw an error if Supabase returns one.
 * 4. Return the response data from Supabase.
 *
 * @param {string} email - User email address to send reset link.
 * @returns {Promise<any>} Supabase response data for password reset.
 * @throws {Error} If Supabase returns an error.
 */
export async function resetPasswordAction(email: string) {
    const supabase = await createClient();

    // Trigger password recovery email via Supabase
    const { data: authData, error: authError } = await supabase.auth.resetPasswordForEmail(email);

    // Handle errors from Supabase
    if (authError) throw new Error(authError.message);

    // Return Supabase response data
    return authData
}

/**
 * updatePasswordAction
 *
 * Updates the user's password for the current session.
 *
 * Steps:
 * 1. Create a Supabase server client.
 * 2. Call `updateUser` with the new password.
 * 3. Return an object with error message if update fails.
 *
 * Notes:
 * - Assumes a valid Supabase session is available (e.g., via cookies).
 * - Returns undefined if the update succeeds without errors.
 *
 * @param {string} newPassword - New password to set for the user.
 * @returns {Promise<{error?: string} | void>} Error object if update fails.
 */
export async function updatePasswordAction(newPassword: string) {

    const supabase = await createClient();

    // Attempt to update the user's password
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    // Return error message if any
    if (error) return { error: error.message }
}