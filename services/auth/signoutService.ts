import { createClient } from "@/lib/supabase/client"

/**
 * Signs out the currently authenticated user.
 *
 * @returns Promise<void>
 * @throws Error if sign out fails
 */
export async function signOutUser(): Promise<void> {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}