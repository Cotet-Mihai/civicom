'use server'

import { createClient } from '@/lib/supabase/server'
import type { JwtPayload } from '@supabase/supabase-js'

/**
 * getUserClaimsAction
 *
 * Server Action to fetch the current authenticated user's claims.
 *
 * Notes:
 * - Runs on the server, so it can safely validate the JWT.
 * - Uses Supabase's `getClaims` method, which verifies the JWT signature.
 * - Returns `null` if no user is authenticated or an error occurs.
 *
 * @returns {Promise<JwtPayload | null>} The user's JWT claims or null
 */
export async function getUserClaimsAction(): Promise<JwtPayload | null> {
    // Create a Supabase client with server-side cookies support
    const supabase = await createClient()

    try {
        // Fetch the authenticated user's claims
        const { data, error } = await supabase.auth.getClaims()

        if (error) {
            // Log expected errors (e.g., user not authenticated)
            console.error('Error fetching claims:', error)
            return null
        }

        // Return the claims object if available, otherwise null
        return data?.claims ?? null
    } catch (err) {
        // Catch any unexpected runtime errors
        console.error('Unexpected error fetching claims:', err)
        return null
    }
}