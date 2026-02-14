import { createClient } from "@/lib/supabase/client"

/**
 * Sign in a user with email and password.
 *
 * @param email - User's email
 * @param password - User's password
 * @returns The authenticated user data from Supabase
 * @throws Error if sign in fails
 */
export async function signInUser(email: string, password: string) {
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) throw new Error(authError.message);

    return { authData };
}