import { SigninForm } from "@/app/(auth)/conectare/components/signin-form"
import Link from "next/link";
import Image from "next/image";
import {JSX} from "react";

/**
 * LoginPage component renders the login page with a sign-in form
 * and a decorative side image for larger screens.
 *
 * @returns {JSX.Element} The login page layout
 */

export default function LoginPage(): JSX.Element {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Left column: Sign-in form */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                {/* Logo and link to home */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <h4 className={`text-xl font-extrabold text-green-800`}>CIVICOM</h4>
                    </Link>
                </div>

                {/* Centered sign-in form */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SigninForm />
                    </div>
                </div>
            </div>

            {/* Right column: Decorative image for large screens */}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/png/sign-in-page.png"
                    alt="Decorative sign-in image"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    sizes="100vw"
                />
            </div>
        </div>
    )
}
