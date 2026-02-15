'use client'

import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'

type UseAuthUserReturn = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

export function useAuthUser(): UseAuthUserReturn {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
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
    }, [])

    return {
        user: user,
        setUser: setUser
    }
}