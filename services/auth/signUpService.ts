import { createClient } from "@/lib/supabase/client";

export async function signUpUser(email: string, password: string, firstName: string, lastName: string) {
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data:{
                display_name: `${lastName} ${firstName}`
            }
        }
    });

    if (authError) throw new Error(authError.message);

    return { authData };
}
