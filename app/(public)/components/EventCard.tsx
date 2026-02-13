"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    BadgeCheck,
    Calendar,
    Clock,
    MapPin,
    Users,
} from "lucide-react";
import { ngos } from "@/data/seedHome";

interface EventTime {
    from: string;
    to: string;
}

interface Event {
    id: number;
    banner: string;
    title: string;
    description: string;
    type: string;
    date: string;
    time: EventTime;
    location: string;
    creatorId: number;
    volunteersNeeded: number;
    registeredVolunteers: number;
    verified?: boolean;
}

export function EventCard({ event }: { event: Event }) {
    const creator = ngos.find((ngo) => ngo.id === event.creatorId);
    const volunteerPercentage = Math.round(
        (event.registeredVolunteers / event.volunteersNeeded) * 100
    );

    return (
        <Card className="group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lg">
            {/* Banner */}
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={event.banner || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />

                {/* Type Badge */}
                <div className="absolute left-3 top-3">
                    <Badge variant={"secondary"} className={'font-semibold'}>
                        {event.type}
                    </Badge>
                </div>

                {/* Date Badge */}
                <div className="absolute right-3 top-3">
                    <div className="flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 shadow-sm backdrop-blur-sm">
                        <Calendar className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                {event.date}
            </span>
                    </div>
                </div>
            </div>


            {/* Header */}
            <CardHeader className="pb-2">
                <h3 className="text-lg font-bold leading-tight text-foreground text-balance">
                    {event.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                </p>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex flex-1 flex-col gap-3 pb-3">
                {/* Event Details */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0 text-primary" />
                        <span>
              {event.time.from} - {event.time.to}
            </span>
                    </div>

                </div>

                {/* Volunteer Progress */}
                <div className="mt-auto flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Voluntari</span>
                        </div>
                        <span className="font-semibold text-foreground">
              {event.registeredVolunteers}/{event.volunteersNeeded}
            </span>
                    </div>
                    <Progress
                        value={volunteerPercentage}
                        className="h-2 bg-muted "

                    />
                </div>

            </CardContent>

            {/* Footer */}
            <CardFooter className="gap-2 border-t pt-4">
                <Button
                    variant="outline"
                    className={'flex-1'}
                >
                    Detalii
                </Button>
                <Button variant={"default"} className={'flex-1 font-semibold'}>
                    Participă
                </Button>
            </CardFooter>
        </Card>
    );
}
