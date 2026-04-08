'use client'

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, CalendarPlus, Printer } from "lucide-react";

export function ShareButton() {

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";

    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Distribuie
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Distribuie evenimentul</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <input
                        className="border border-border rounded-md px-2 py-1 w-full text-sm"
                        readOnly
                        value={pageUrl}
                    />
                    <Button size="sm" onClick={handleCopy}>
                        {copied ? "Copiat!" : "Copiază link-ul"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function PrintButton() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print materiale
        </Button>
    );
}

function formatDateForCalendar(dateStr: string, timeStr: string) {
    // dateStr = "2026-04-09", timeStr = "14:30"
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);

    // Creăm un obiect Date în UTC
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

    // Formatare YYYYMMDDTHHMMSSZ
    const YYYY = date.getUTCFullYear().toString().padStart(4, "0");
    const MM = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const DD = date.getUTCDate().toString().padStart(2, "0");
    const hh = date.getUTCHours().toString().padStart(2, "0");
    const mm = date.getUTCMinutes().toString().padStart(2, "0");
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    return `${YYYY}${MM}${DD}T${hh}${mm}${ss}Z`;
}

export function AddToCalendarButton({ basicInfo }: { basicInfo: { title: string, date: string, from_time: string, to_time: string, description: string } }) {
    const handleAdd = () => {

        const start = formatDateForCalendar(basicInfo.date, basicInfo.from_time);
        const end = formatDateForCalendar(basicInfo.date, basicInfo.to_time);
        const url = new URL("https://www.google.com/calendar/render");

        url.searchParams.set("action", "TEMPLATE");
        url.searchParams.set("text", basicInfo.title);
        url.searchParams.set("dates", `${start}/${end}`);
        url.searchParams.set("details", basicInfo.description);

        window.open(url.toString(), "_blank");
    };

    return (
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleAdd}>
            <CalendarPlus className="w-4 h-4" />
            Adaugă în Calendar
        </Button>
    );
}