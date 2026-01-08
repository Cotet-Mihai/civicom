import { createClient } from '@/lib/supabase/client';
import type { JSX } from 'react';

/**
 * Page that informs the user that they have successfully logged in.
 * Fetches the user's auth state from Supabase.
 */
export default async function SuccessPage(): Promise<JSX.Element> {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims ?? null;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Autentificare reușită 🎉
                </h1>
                {user && (
                    <p className="text-gray-700 text-lg">
                        Bun venit, <span className="font-semibold">{user.email ?? 'utilizator'}</span>!
                    </p>
                )}
                {!user && (
                    <p className="text-gray-500 text-lg">
                        User-ul nu a putut fi detectat, dar autentificarea a fost înregistrată.
                    </p>
                )}
                <div className="mt-6">
                    <a
                        href="/public"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Du-te la Dashboard
                    </a>
                </div>
            </div>
        </main>
    );
}
