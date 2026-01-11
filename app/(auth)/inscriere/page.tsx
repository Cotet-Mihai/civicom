import { SignupForm } from "@/app/(auth)/inscriere/components/signup-form"
import Image from "next/image";
import Link from "next/link";

/**
 * SignupPage component
 *
 * Renders the sign-up page layout with:
 * - Branding / logo link
 * - Sign-up form
 * - Side hero image (desktop only)
 */
export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            {/* Left column: branding + signup form */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                {/* Logo / Home link */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-green-800 ">
                        CIVICOM
                    </Link>
                </div>

                {/* Centered form */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm /> {/* The actual form component */}
                    </div>
                </div>
            </div>

            {/* Right column: Hero image (desktop only) */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/png/sign-up-page.png"
                    alt="Image"
                    fill
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
