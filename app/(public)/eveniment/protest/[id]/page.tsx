import Image from "next/image";
import {getEvent, getEventParticipantsCount, incrementEventViews} from "@/app/(public)/eveniment/actions/Event";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {
    Calendar,
    CalendarPlus,
    Camera,
    Clock,
    Eye,
    Info,
    Mail,
    Printer,
    Share2,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GalleryCarouselWithModal from "@/app/(private)/creeaza/protest/components/GalleryCarouselWithModal";
import {Card} from "@/components/ui/card";
import {MapWithPolyline} from "@/app/(public)/components/MapWithPolyline";
import Link from "next/link";
import {ConfirmAttendanceButton} from "@/app/(public)/components/ConfirmAttendanceButton";
import {AddToCalendarButton, PrintButton, ShareButton} from "@/app/(public)/components/actionButtons";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

type Media = {
    id: string,
    url: string,
    type: string,
    event_id: string,
    created_at: string
}

type Contact = {
    id: string,
    email: string,
    event_id: string,
    last_name: string,
    first_name: string
}

export default async function EventPage({ params }: Props) {

    const { id } = await params;

    const event = await getEvent(id);
    console.log(event)

    await incrementEventViews(id);


    const basicInfo = event.event_basic_info[0];
    const logistics = event.event_logistics[0];
    const banner:Media = event.event_media.find((m: Media) => m.type === "banner");
    const gallery:Media[] = event.event_media.filter((m: Media) => m.type === "gallery");

     const location = event.event_locations[0].event_location_routes[0].points


    function translateProtestType(protestType: string) {
        switch (protestType) {
            case 'march':
                return 'Marș'
            case 'picket':
                return 'Pichet'
            case 'gathering':
                return 'Adunare'
            case 'boycott':
                return 'Boicot'
        }
    }

    function getInitialsFromName(fullName: string): string {
        if (!fullName) return "";

        // Desparte numele în cuvinte
        const words = fullName.trim().split(/\s+/);

        // Ia primele două cuvinte
        const firstTwo = words.slice(0, 2);

        // Ia primele 2 litere din fiecare cuvânt și concatenează
        return firstTwo.map(word => word.slice(0, 1)).join("");
    }

    console.log(location[0][0], location[0][1])

    return (
        <main className={'min-h-screen text-foreground p-4 md:p-12 fonts-sans selection:bg-primary/10'}>
            <div className={'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12'}>
                <div className={'lg:col-span-8 space-y-8'}>

                    {/* BANNER */}
                    <div className={'relative w-full aspect-[21/9] group rounded-3xl overflow-hidden border border-border shadow-xl'}>
                        <div className={'absolute top-4 left-4 z-20'}>
                            <Badge>
                             Protest: {translateProtestType(basicInfo.protest_type)}
                            </Badge>
                        </div>
                        <Image
                            src={`https://bslgppjjtfropjzccetj.supabase.co/storage/v1/object/public/banners/${banner.url}`}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02] z-0"
                            alt="Banner Protest"
                        />

                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none z-10" />
                    </div>

                    <div className={'space-y-6'}>
                        <div className={'space-y-4'}>
                            <div className={'flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground font-medium w-full border-b border-border pb-4'}>
                                <div className={'flex items-center gap-5'}>
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/>{basicInfo.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/>{basicInfo.from_time.slice(0, 5)} - {basicInfo.to_time.slice(0, 5)}</span>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-80 bg-muted px-2.5 py-1 rounded-md text-xs font-bold border border-border/50">
                                    <Eye size={14}/> <span>{event.views} vizualizări</span>
                                </div>
                            </div>

                            <h1 className="md:text-4xl font-black tracking-tighter leading-tight uppercase text-primary italic">
                                {basicInfo.title}
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <p className="text-md text-muted-foreground leading-relaxed">
                                {basicInfo.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-end gap-2 pt-4">
                                <ShareButton />
                                <AddToCalendarButton basicInfo={basicInfo} />
                                <PrintButton />
                            </div>
                        </div>
                    </div>

                    <section className={'space-y-4 pt-4'}>
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Camera size={14}/> Galerie Foto
                        </h3>
                        <div className={'grid grid-cols-1'}>
                            <GalleryCarouselWithModal gallery={gallery}/>
                        </div>
                    </section>

                    {/* REGULI & ECHIPAMENT */}
                    <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 pt-8 border-t border-border">
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={16} className="text-primary"/> Reguli de Siguranță
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                                {logistics.rules}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <Info size={16} className="text-primary"/> Echipament Sugerat
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                                {logistics.equipment.map((e: string) => (
                                    <li key={e}>• {e}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <aside className={'lg:col-span-4 space-y-6'}>
                    <Card className={'p-6 space-y-2 shadow-lg bg-white shadow-black/5 border-border'}>
                        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                            <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-xs text-primary shrink-0">
                                {getInitialsFromName(event.created_by_display_name)}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-0.5">Organizat de</p>
                                <p className="text-sm font-bold leading-none">{event.created_by_display_name}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Participanți estimați</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black italic tracking-tighter text-primary">
                                        {await getEventParticipantsCount(event.id)} / {logistics.is_limited ? logistics.max_participants : '∞'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ConfirmAttendanceButton eventId={id} />
                    </Card>

                    <Card className="p-1.5">
                        <div className="relative aspect-square bg-muted rounded-xl overflow-hidden border border-border">
                            <MapWithPolyline event_location_routes={location}/>
                        </div>
                        <Button asChild
                                className="uppercase font-bold">
                            <Link
                                target="_blank"
                                href={`https://www.google.com/maps/search/?api=1&query=${location[0][0]},${location[0][1]}`}
                            >
                                Arată-mi punctul de start
                            </Link>
                        </Button>
                    </Card>

                    {/* PERSOANE DE CONTACT */}
                    <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Persoane de contact</p>

                        {event.event_contacts.map((contact: Contact) => (
                            <div key={contact.email} className="flex items-center justify-between group border-b pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white border border-border flex items-center justify-center font-black text-xs text-primary shadow-sm">
                                        {getInitialsFromName(`${contact.last_name} ${contact.first_name}`)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tighter">
                                            {contact.last_name} {contact.first_name}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
                                            {contact.email}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="p-2 bg-white border border-border rounded-lg text-primary hover:bg-muted transition-colors shadow-sm"
                                    >
                                        <Mail size={14}/>
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div>
                </aside>
            </div>
        </main>
    );
}