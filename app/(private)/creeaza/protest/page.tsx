import React from "react";
import Image from "next/image";
import ProtestFlow from "@/app/(private)/creeaza/protest/ProtestFlow";

export default function Protest() {

    return (
        <div className="grid min-h-svh lg:grid-cols-[30%_70%]">

            <div className="hidden lg:block lg:col-span-1 relative h-screen sticky top-0">
                <Image
                    src="/images/protest.webp"
                    alt="Crează protest"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="100vw"
                />
            </div>

            <div className="relative order-1 lg:order-2 px-15 pt-5 w-full">
                <div className={'mb-5 ml-auto'}>
                    <h1 className={'text-3xl font-bold'}>Creează Protest</h1>
                    <p className={'text-sm text-muted-foreground'}>Adaugă toate informațiile pentru a putea creea un protest</p>
                </div>
                <ProtestFlow/>
            </div>

        </div>
    );
}