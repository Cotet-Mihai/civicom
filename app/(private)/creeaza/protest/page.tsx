import React from "react";
import Image from "next/image";
import ProtestFlow from "@/features/protest/flow/ProtestFlow";

export default function Protest() {

    return (
        <div className="grid min-h-svh lg:grid-cols-[30%_70%]">

            <div className="relative flex-col gap-4 p-6 md:p-10 order-2 lg:order-1 lg:block hidden">
                <Image
                    src="/jpg/protest.jpg"
                    alt="Crează protest"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="100vw"
                />
            </div>

            <div className="relative order-1 lg:order-2 px-15 pt-10">
                <ProtestFlow />
            </div>

        </div>
    );
}