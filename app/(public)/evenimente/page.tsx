"use client";

import React, { useState } from 'react';
import Image from "next/image";
import {
    Calendar, Clock, Eye, MapPin, Search,
    Filter, Users, ArrowRight, Megaphone,
    ChevronDown, LayoutGrid, List
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CIVIC_EVENTS = [
    {
        id: "1",
        title: "Protest: Stop defrișărilor în Parcul Național",
        type: "march",
        date: "24.04.2024",
        time: "14:00 - 18:00",
        location: "Piața Victoriei",
        participants: 1240,
        views: 3421,
        image: "https://images.unsplash.com/photo-1584362946341-995a165152a8?q=80&w=800",
        organizer: "Green Action RO"
    },
    {
        id: "2",
        title: "Petiție: Aer Curat pentru copiii din Sectorul 3",
        type: "petition",
        date: "Permanent",
        time: "Online",
        location: "București",
        participants: 8500,
        views: 12050,
        image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800",
        organizer: "Părinți Activi"
    },
    {
        id: "3",
        title: "Adunare: Reabilitarea centrului istoric",
        type: "gathering",
        date: "05.05.2024",
        time: "10:00 - 12:00",
        location: "Piața Unirii",
        participants: 450,
        views: 890,
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800",
        organizer: "Civic HUB"
    }
];

export default function CivicEventsList() {
    const [viewType, setViewType] = useState<'list' | 'grid'>('list');

    return (
        <main className="min-h-screen text-foreground p-4 md:p-12 font-sans selection:bg-primary/10 bg-background">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-12 bg-primary rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Platformă de Mobilizare
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase text-primary italic">
                            Implică-<span className="text-foreground not-italic">te</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon"
                                onClick={() => setViewType('list')}
                                className={viewType === 'list' ? 'border-primary text-primary' : ''}>
                            <List size={18} />
                        </Button>
                        <Button variant="outline" size="icon"
                                onClick={() => setViewType('grid')}
                                className={viewType === 'grid' ? 'border-primary text-primary' : ''}>
                            <LayoutGrid size={18} />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-4 space-y-6">
                        <Card className="p-6 shadow-lg shadow-black/5 border-border bg-white space-y-6">
                            {/* Header Filtru */}
                            <div className="space-y-1 border-b border-border/60 pb-4">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Filtrare Rapidă</p>
                                <h3 className="text-lg font-bold">Găsește cauze</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Căutare Text */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Căutare text</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                        <Input
                                            placeholder="Cuvinte cheie..."
                                            className="pl-9 border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </div>

                                {/* Select Tip Acțiune */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Tip Acțiune</label>
                                    <div className="relative">
                                        <select className="appearance-none flex h-10 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer">
                                            <option>Toate acțiunile</option>
                                            <option>Marș / Protest</option>
                                            <option>Petiție Online</option>
                                            <option>Adunare Publică</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
                                    </div>
                                </div>

                                {/* Select Oraș */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Oraș</label>
                                    <div className="relative">
                                        <select className="appearance-none flex h-10 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer">
                                            <option>Toată țara</option>
                                            <option>București</option>
                                            <option>Cluj-Napoca</option>
                                            <option>Timișoara</option>
                                            <option>Iași</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
                                    </div>
                                </div>

                                {/* Buton Aplică */}
                                <Button className="w-full uppercase font-black italic tracking-tight py-6 shadow-md hover:shadow-primary/20 transition-all">
                                    Aplică Filtrele
                                </Button>
                            </div>
                        </Card>

                        {/* Card "Vrei să organizezi?" - Reinstaurat */}
                        <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4 relative overflow-hidden group">

                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                                <div className="flex items-start gap-2 text-primary leading-none">
                                    <Megaphone size={18} className="mt-[3px]" />
                                    <span className="font-black uppercase text-[10px] tracking-widest">
                                        Vrei să organizezi?
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Adaugă propria ta cauză și mobilizează comunitatea din jurul tău.
                                </p>

                                <Button
                                    variant="outline"
                                    className="w-full border-primary/20 text-primary hover:bg-primary/10 font-bold uppercase text-xs"
                                >
                                    Creează Eveniment
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* EVENTS */}
                    <div className={`lg:col-span-8 ${viewType === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}`}>
                        {CIVIC_EVENTS.map((event) => (
                            <Card
                                key={event.id}
                                className={`group overflow-hidden border-border shadow-md hover:shadow-xl transition-all duration-500 p-0
                                ${viewType === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
                            >

                                {/* IMAGE */}
                                <div className={`relative overflow-hidden shrink-0
                                    ${viewType === 'list'
                                    ? 'w-full md:w-64 aspect-[4/3] md:aspect-square lg:aspect-[4/5]'
                                    : 'w-full aspect-[16/9]'
                                }`}
                                >
                                    <Image
                                        src={event.image}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={event.title}
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <Badge className="bg-white/90 backdrop-blur-md text-primary hover:bg-white text-[10px] font-black border-none shadow-sm uppercase">
                                            {event.type}
                                        </Badge>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="px-6 py-5 flex flex-col justify-between flex-1 space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-primary"/> {event.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-primary"/> {event.location}
                                            </span>
                                            <span className="hidden sm:flex items-center gap-1.5 opacity-60">
                                                <Eye size={12}/> {event.views}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight uppercase text-foreground group-hover:text-primary transition-colors italic">
                                            {event.title}
                                        </h2>

                                        <div className="flex items-center gap-3">
                                            <div className="size-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-[8px] text-primary">
                                                GA
                                            </div>
                                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                                                Organizat de <span className="text-foreground">{event.organizer}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                                Mobilizare
                                            </p>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-2xl font-black italic tracking-tighter text-primary">
                                                    {event.participants.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                                    Cetățeni implicați
                                                </span>
                                            </div>
                                        </div>

                                        <Button className="w-full sm:w-auto uppercase font-black italic tracking-tight group/btn">
                                            Detalii cauză
                                            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>

                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}