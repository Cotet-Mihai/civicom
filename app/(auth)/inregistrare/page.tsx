import { SignUpForm } from "@/app/(auth)/inregistrare/components/signUpForm";
import Link from "next/link";
import Image from "next/image";

/**
 * SignUpPage (Server Component)
 *
 * Responsible only for layout structure:
 * - Splits the screen into a form section (left) and an image section (right)
 * - Renders SignUpForm, which handles all client-side logic
 * - Uses responsive layout for different screen sizes
 *
 * No client logic is handled here, this is purely presentational.
 */
export default function SignUpPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            {/* Left side: Form Section */}
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
                        {/* Client-side component handling the signup form */}
                        <SignUpForm />
                    </div>
                </div>
            </div>

            {/* Right side: Decorative Image (hidden on small screens) */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/images/signin_page.webp"
                    alt="Signup background"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    fill
                    sizes="auto"
                    loading="eager"
                />
            </div>

        </div>
    )
}