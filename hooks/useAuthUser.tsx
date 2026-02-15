'use client'

import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import type { User } from '@supabase/supabase-js'
import {isAuthUser} from "@/services/auth/isAuthUser";

type UseAuthUserReturn = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

export function useAuthUser(): UseAuthUserReturn {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        isAuthUser(setUser);
    }, [])

    return {
        user: user,
        setUser: setUser
    }
}