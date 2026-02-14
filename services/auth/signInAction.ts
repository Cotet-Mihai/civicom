'use server'

import { createClient } from "@/lib/supabase/server";

/**
 * signInAction
 *
 * Server Action responsible for signing in a user using Supabase.
 *
 * @param email - The user's email address
 * @param password - The user's password
 * @returns Object containing authenticated user data from Supabase
 * @throws Error if authentication fails
 *
 * Notes:
 * - This function runs on the server only (`'use server'` directive).
 * - Can be directly used in client components with `<form action={signInAction}>`.
 * - Uses `createClient()` from Supabase SSR setup to ensure cookies/session are handled correctly.
 */
export async function signInAction(email: string, password: string) {
    // Initialize Supabase client with server-side cookies support
    const supabase = await createClient();

    // Attempt to sign in with email and password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    // If Supabase returns an error, throw it so it can be caught client-side
    if (authError) throw new Error(authError.message);

    // Return the authentication data on success
    return { authData };
}