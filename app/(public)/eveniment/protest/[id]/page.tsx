import Image from "next/image";
import {getEvent} from "@/app/(public)/eveniment/actions/getEvent";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {Calendar, CalendarPlus, Clock, Eye, Printer, Share2} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EventPage({ params }: Props) {
    const { id } = await params;

    const event = await getEvent(id);
    console.log(event)

    const basicInfo = event.event_basic_info[0];
    const banner = event.event_media.find((m) => m.type === "banner");

    console.log(banner.url)

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
                                    <Eye size={14}/> <span>2,405 vizualizări</span>
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
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </Button>

                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <CalendarPlus className="w-4 h-4" />
                                    Adaugă în Calendar
                                </Button>

                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <Printer className="w-4 h-4" />
                                    Print materiale
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}