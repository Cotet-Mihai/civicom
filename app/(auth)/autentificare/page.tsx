import { SignInForm } from "@/app/(auth)/autentificare/components/signInForm"
import Image from "next/image";
import Link from "next/link";

/**
 * SignInPage
 *
 * Responsible only for layout structure:
 * - Splits screen into form section and decorative image section
 * - Renders SignInForm (Client Component)
 * - Handles responsive layout for mobile/desktop
 *
 * No client logic is handled here; the form handles its own state and submission.
 */
export default function SignInPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            {/* ---------------- LEFT SIDE: Form Section ---------------- */}
            <div className="flex flex-col gap-4 p-6 md:p-10">

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
                        {/* SignInForm is a Client Component that handles state, validation, and submission */}
                        <SignInForm />
                    </div>
                </div>

            </div>

            {/* ---------------- RIGHT SIDE: Decorative Image ---------------- */}
            {/* Hidden on small screens (mobile), shown only on lg+ */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/images/signup_page.webp" // Decorative background image
                    alt="Image"                     // Alt text for accessibility
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    fill                             // Make image cover entire container
                    sizes={'auto'}                   // Responsive image sizing
                    loading="eager"                  // Load image immediately
                />
            </div>
        </div>
    )
}