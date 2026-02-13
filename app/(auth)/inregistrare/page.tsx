import { SignupForm } from "@/app/(auth)/inregistrare/components/signupForm";
import Link from "next/link";
import Image from "next/image";

/**
 * SignupPage (Server Component)
 *
 * Responsible only for layout structure.
 * - Splits screen into form section + image section
 * - Renders SignupForm (Client Component)
 * - Handles responsive layout
 *
 * No client logic needed here.
 */
export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            {/* Left side - Form Section */}
            <div className="flex flex-col p-6 md:p-10">

                {/* Logo / Brand link */}
                <div className="flex justify-center md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center font-extrabold text-green-700 text-xl"
                    >
                        CIVICOM✨
                    </Link>
                </div>

                {/* Centered form container */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>

            {/* Right side - Decorative Image (hidden on small screens) */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/images/signin_page.webp"
                    alt="Signup background"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    fill
                />
            </div>

        </div>
    )
}