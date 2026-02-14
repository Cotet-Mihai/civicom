'use server'

import { createClient } from "@/lib/supabase/server";

/**
 * signUpAction
 *
 * Server Action responsible for creating a new user in Supabase.
 *
 * Usage:
 * - Call this from a client component via form submission.
 * - Returns the authenticated user data or throws if signup fails.
 *
 * @param email - User's email address
 * @param password - User's password
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns {Promise<{ authData: any }>} The created user authentication data from Supabase
 * @throws {Error} If signup fails
 */
export async function signUpAction(
    email: string,
    password: string,
    firstName: string,
    lastName: string
) {
    // Initialize Supabase server client with cookie support
    const supabase = await createClient();

    // Call Supabase signup API with user email, password, and additional metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                // Store full name in user metadata (display_name)
                display_name: `${lastName} ${firstName}`
            }
        }
    });

    // Handle signup errors
    if (authError) throw new Error(authError.message);

    // Return the authenticated user data
    return { authData };
}