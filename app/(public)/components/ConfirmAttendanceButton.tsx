'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { registerForEvent, unregisterFromEvent, isUserRegistered } from "@/app/(public)/eveniment/actions/Event";

type ConfirmAttendanceProps = {
    eventId: string;
    onSuccess?: () => void;
};

export function ConfirmAttendanceButton({ eventId, onSuccess }: ConfirmAttendanceProps) {
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        async function fetchStatus() {
            setLoading(true);
            try {
                const registered = await isUserRegistered(eventId);
                setIsRegistered(registered);
            } catch (err: any) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStatus();
    }, [eventId]);

    async function handleClick() {
        setLoading(true);
        try {
            if (isRegistered) {
                await unregisterFromEvent(eventId);
                setIsRegistered(false);
            } else {
                await registerForEvent(eventId);
                setIsRegistered(true);
            }
            onSuccess?.();
        } catch (err: any) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={`uppercase font-bold ${isRegistered ? 'bg-red-500 text-white hover:bg-red-700' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Se încarcă...' : isRegistered ? 'Anulează participarea' : 'Confirmă prezența'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{isRegistered ? 'Anulează participarea' : 'Confirmă participarea'}</DialogTitle>
                </DialogHeader>
                <p className="py-2 text-sm text-muted-foreground">
                    {isRegistered
                        ? "Ești deja înscris la acest eveniment. Confirmarea anulării va șterge participarea ta."
                        : "Confirmarea participării implică responsabilitatea ta față de organizator. Ești sigur că vrei să te implici?"
                    }
                </p>
                <DialogFooter className="flex justify-end gap-2">
                    {/* Buton de închidere simplu */}
                    <DialogClose asChild>
                        <Button variant="outline">Închide</Button>
                    </DialogClose>

                    {/* Butonul de confirmare/anulare */}
                    <DialogClose asChild>
                        <Button onClick={handleClick} disabled={loading}>
                            {isRegistered ? "Anulează" : "Confirmă"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}