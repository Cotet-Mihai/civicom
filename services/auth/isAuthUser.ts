import {createBrowserClient} from "@supabase/ssr";
import {Dispatch, SetStateAction} from "react";
import {User} from "@supabase/supabase-js";


export function isAuthUser(setUser: Dispatch<SetStateAction<User | null>>) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
    })

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
}