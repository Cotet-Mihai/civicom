'use client'

import {Input} from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {counties} from '@/data/counties'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Drawer} from 'vaul';
import {ButtonDonate} from "@/components/ButtonDonate";
import {FlipButton, FlipButtonBack, FlipButtonFront} from "@/components/animate-ui/components/buttons/flip";

export default function NavBarPublic() {

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
            {/* NAVBAR WRAPPER */}
            <div className="flex items-center justify-between h-14 px-4">

                {/* MOBILE MENU BUTTON */}
                <div className="lg:hidden">
                    <Drawer.Root direction="left">
                        <Drawer.Trigger className="p-2">
                            <Menu className="w-6 h-6"/>
                        </Drawer.Trigger>

                        <Drawer.Portal>
                            <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                            <Drawer.Content
                                className="fixed left-3 top-2 bottom-2 w-[300px] z-50 outline-none flex"
                                style={{'--initial-transform': 'calc(100% - 8px)'} as React.CSSProperties}
                            >
                                <div className="bg-zinc-50 h-full w-full p-5 flex flex-col rounded-2xl">
                                    <Drawer.Title className="text-2xl font-bold mb-4">
                                        Meniu
                                    </Drawer.Title>

                                    <div className="flex flex-col gap-4">

                                        <Input placeholder="Caută eveniment..." className="w-full"/>

                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selectează Orașul..."/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Județe</SelectLabel>
                                                    {counties.map((county) => (
                                                        <SelectItem value={county.name} key={county.id}>
                                                            {county.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>

                                            </SelectContent>
                                        </Select>

                                        {/* Buttons */}
                                        <div className="flex flex-col gap-3 mt-2">
                                            <Button size="sm" asChild variant={'mainButton'}>
                                                <Link href="/sign-up">Creează cont</Link>
                                            </Button>

                                            <Button size="sm" asChild variant={'mainButton'}>
                                                <Link href="/sign-in">Autentifică-te</Link>
                                            </Button>

                                            <ButtonDonate link="#" className="mr-2"/>
                                        </div>

                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>

                <Link href="/">
                    <h1 className="text-xl font-extrabold text-green-800">CIVICOM✨</h1>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden lg:flex items-center justify-between w-full">

                    {/* MIDDLE: Select + Input */}
                    <div className="flex items-center gap-4 ml-10">
                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Selectează Orașul..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {counties.map((county) => (
                                    <SelectItem value={county.name} key={county.id}>
                                        {county.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            className="w-52 h-8"
                            placeholder="Caută Eveniment..."
                        />
                    </div>

                    {/* RIGHT SIDE: Buttons */}
                    <div className="flex items-center gap-2">
                        <Button size="sm" asChild variant={'mainButton'}>
                            <Link href="/sign-up">Creează cont</Link>
                        </Button>

                        <Button size="sm" asChild variant={'mainButton'}>
                            <Link href="/sign-in">Autentifică-te</Link>
                        </Button>

                        <FlipButton>
                            <FlipButtonFront variant={'accent'} size={'sm'}>Donează ❤</FlipButtonFront>
                            <FlipButtonBack variant={'destructive'} size={'sm'}>Donează ❤</FlipButtonBack>
                        </FlipButton>
                    </div>
                </div>
            </div>
        </nav>
    )
}
