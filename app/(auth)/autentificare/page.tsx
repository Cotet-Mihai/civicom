import { GalleryVerticalEnd } from "lucide-react"

import { SignInForm } from "@/app/(auth)/autentificare/components/signInForm"
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

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
                        <SignInForm />
                    </div>
                </div>

            </div>

            {/* Right side - Decorative Image (hidden on small screens) */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/images/signup_page.webp"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    fill
                    sizes={'auto'}
                    loading="eager"
                />
            </div>
        </div>
    )
}
