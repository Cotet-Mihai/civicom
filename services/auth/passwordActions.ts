'use server'

import {createClient} from "@/lib/supabase/server";

export async function resetPasswordAction(email: string) {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.resetPasswordForEmail(email);

    if (authError) throw new Error(authError.message);

    return authData
}