import { createClient } from "@/lib/supabase/client"

/**
 * signOutAction
 *
 * Signs out the currently authenticated user.
 *
 * Notes:
 * - Uses the Supabase client to end the user's session.
 * - Throws an error if the sign-out operation fails.
 *
 * @returns {Promise<void>} Resolves when the user is signed out successfully
 * @throws {Error} If sign out fails
 */
export async function signOutAction(): Promise<void> {
    // Create a Supabase client (browser/client-side)
    const supabase = createClient()

    // Attempt to sign out the user
    const { error } = await supabase.auth.signOut()

    // Throw an error if sign out fails
    if (error) {
        throw new Error(error.message)
    }
}