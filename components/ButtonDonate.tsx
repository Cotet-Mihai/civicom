import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DonateButtonProps {
    link: string;
    target?: string;
    children?: React.ReactNode;
    className?: string;
}

export function ButtonDonate({ link, target = "_self", className }: DonateButtonProps) {
    return (
        <Button asChild variant={'donate'} className={`hover:border-transparent ${className}`}>
            <Link href={link} target={target}>
                <span>❤</span>
                Donează
            </Link>
        </Button>
    );
}
