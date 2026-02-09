import {SignupForm} from "@/app/(auth)/inscriere/components/signupForm";
import Link from "next/link";
import Image from "next/image";


export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col p-6 md:p-10">
                <div className="flex justify-center md:justify-start">
                    <Link href="/" className="flex items-center font-extrabold text-primary">
                        CIVICOM✨
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/images/signin_page.webp"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    fill
                />
            </div>
        </div>
    )
}
