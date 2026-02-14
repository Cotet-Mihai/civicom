'use client'

import { useState, useEffect } from 'react'
import { getUserClaimsAction } from '@/services/auth/getUserClaimsAction'
import type { JwtPayload } from '@supabase/supabase-js'

/**
 * Hook to get the server-validated authenticated user claims.
 */
export function useAuthUser() {
    const [user, setUser] = useState<JwtPayload | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchClaims() {
            try {
                const claims = await getUserClaimsAction()
                setUser(claims ?? null)
            } catch (err) {
                console.error('Failed to fetch user claims:', err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchClaims()
    }, [])

    return { user, loading }
}