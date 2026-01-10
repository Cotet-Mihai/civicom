'use server'

import {createClient} from "@/lib/supabase/client";

export async function signupAction(formData: FormData) {

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const username = formData.get('name') as string;

    if (password.length < 8) {
        return { error: "Parola trebuie să aibă cel puțin 8 caractere." };
    }

    if (password !== confirmPassword ) {
        return { error: "Parolele nu coincid." };
    }

    const supabase = await createClient();

    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'http://localhost:3000/dashboard',
            data: {
                display_name: username
            }
        }
    })

    if (error) return {error: error.message}
}