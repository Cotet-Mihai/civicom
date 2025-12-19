import React, { JSX } from "react";
import { createClient } from "@/lib/supabase/client";
import NavBarPrivate from "@/components/NavBarPrivate";
import NavBarPublic from "@/components/NavBarPublic";

/**
 * Server Component that switches between Public and Private navbar
 * based on the current user's authentication session.
 *
 * @returns {JSX.Element} The appropriate navbar component depending on authentication state
 */
export default async function NavBarSwitcher(): Promise<JSX.Element> {
    // Initialize Supabase client to interact with authentication services
    const supabase = await createClient();

    // Fetch the current user's authentication claims from Supabase
    const { data } = await supabase.auth.getClaims();

    // Store the user's claims; undefined if not authenticated
    const user = data?.claims;

    // Render PrivateNavBar if the user is authenticated, otherwise render PublicNavBar
    return user ? <NavBarPrivate /> : <NavBarPublic />;
}
