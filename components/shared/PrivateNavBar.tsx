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
import {counties} from '@/lib/counties'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu, UserRoundIcon} from "lucide-react";
import {Drawer} from 'vaul';
import {ButtonDonate} from "@/components/shared/ButtonDonate";
import {usePathname} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {signOutAction} from "@/lib/supabase/actions/signOut";
import {FlipButton, FlipButtonBack, FlipButtonFront} from "@/components/animate-ui/components/buttons/flip";
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/animate-ui/components/radix/dialog';

export default function PrivateNavBar() {
    const pathname = usePathname();
    const hidePaths = ["/auth", "/account/update-password"];
    const showNavbar = !hidePaths.some(path => pathname.startsWith(path));

    if (!showNavbar) return null;

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
                                                    <SelectLabel>București</SelectLabel>
                                                    <SelectItem value="bucuresti">București</SelectItem>
                                                    <SelectItem value="sector1">Sector 1</SelectItem>
                                                    <SelectItem value="sector2">Sector 2</SelectItem>
                                                    <SelectItem value="sector3">Sector 3</SelectItem>
                                                    <SelectItem value="sector4">Sector 4</SelectItem>
                                                    <SelectItem value="sector5">Sector 5</SelectItem>
                                                    <SelectItem value="sector6">Sector 6</SelectItem>
                                                </SelectGroup>

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
                                            <Button size="sm" asChild>
                                                <Link href="/auth/sign-up">Mai vedem</Link>
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
                                <SelectGroup>
                                    <SelectLabel>București</SelectLabel>
                                    <SelectItem value="bucuresti">București</SelectItem>
                                    <SelectItem value="sector1">Sector 1</SelectItem>
                                    <SelectItem value="sector2">Sector 2</SelectItem>
                                    <SelectItem value="sector3">Sector 3</SelectItem>
                                    <SelectItem value="sector4">Sector 4</SelectItem>
                                    <SelectItem value="sector5">Sector 5</SelectItem>
                                    <SelectItem value="sector6">Sector 6</SelectItem>
                                </SelectGroup>

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

                        <Input
                            className="w-52 h-8"
                            placeholder="Caută Eveniment..."
                        />
                    </div>

                    {/* RIGHT SIDE: Buttons */}
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger className={'border p-1 rounded-md hover:bg-muted'}>
                                <UserRoundIcon/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Profil</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Button onClick={signOutAction} className={'m-0'}>
                                        Deconecteză-te
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <FlipButton>
                            <FlipButtonFront variant={'accent'} size={'sm'}>Donează ❤</FlipButtonFront>
                            <FlipButtonBack variant={'destructive'} size={'sm'}>Donează ❤</FlipButtonBack>
                        </FlipButton>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    Creează Eveniment
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        <span className={'text-black'}>Ce tip de eveniment vrei sa creezi ?</span>
                                    </DialogTitle>
                                    <DialogDescription>
                                        Fiecare eveniment in parte are un meniu diferit de configurare.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                                    {/* Card 1 */}
                                    <DialogTrigger asChild>
                                        <Link href={'create/petition'}>
                                            <div
                                                className="relative w-full aspect-square bg-cover bg-center rounded-xl shadow-lg cursor-pointer group"
                                                style={{backgroundImage: "url('/jpg/petitie.jpg')"}}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out group-hover:bg-black/80">
                                                  <span
                                                      className="text-white font-bold text-lg text-center px-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                                                    Petiție
                                                  </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </DialogTrigger>

                                    {/* Card 2 */}
                                    <DialogTrigger asChild>
                                        <Link href={'/create/protest'}>
                                            <div
                                                className="relative w-full aspect-square bg-cover bg-center rounded-xl shadow-lg cursor-pointer group"
                                                style={{backgroundImage: "url('/jpg/protest.jpg')"}}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl transition-all duration-300  ease-in-out group-hover:bg-black/80">
                                                  <span
                                                      className="text-white font-bold text-lg text-center px-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                                                    Protest
                                                  </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </DialogTrigger>

                                    {/* Card 3 */}
                                    <DialogTrigger asChild>
                                        <Link href={'/create/community-activity'}>
                                            <div
                                                className="relative w-full aspect-square bg-cover bg-center rounded-xl shadow-lg cursor-pointer group"
                                                style={{backgroundImage: "url('/jpg/activitate-comunitara.jpg')"}}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out group-hover:bg-black/80">
                                                  <span
                                                      className="text-white font-bold text-lg text-center px-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                                                    Activitate Comunitară
                                                  </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </DialogTrigger>

                                    {/* Card 4 */}
                                    <DialogTrigger asChild>
                                        <Link href={'/create/charity-event'}>
                                            <div
                                                className="relative w-full aspect-square bg-cover bg-center rounded-xl shadow-lg cursor-pointer group"
                                                style={{backgroundImage: "url('/jpg/eveniment-caritabil.jpg')"}}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out group-hover:bg-black/80">
                                                  <span
                                                      className="text-white font-bold text-lg text-center px-2 transition-transform duration-300 ease-in-out group-hover:scale-125">
                                                    Eveniment <br/> caritabil
                                                  </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </DialogTrigger>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </nav>
    )
}
