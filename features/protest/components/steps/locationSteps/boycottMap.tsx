'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Alternative {
    brandName: string;
    brandUrl: string;
    reason?: string;
}

export default function BoycottMap() {
    const [reason, setReason] = useState<string | undefined>(undefined);
    const [operatingMode, setOperatingMode] = useState<string | undefined>(undefined);
    const [otherReason, setOtherReason] = useState('');

    const [brandName, setBrandName] = useState("");
    const [brandUrl, setBrandUrl] = useState("");
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [savedBrands, setSavedBrands] = useState<
        { name: string; url: string; alternatives: Alternative[] }[]
    >([]);

    // --- Handlers Alternative ---
    const handleAddAlternative = () => {
        setAlternatives(prev => [...prev, { brandName: "", brandUrl: "", reason: "" }]);
    };

    const handleRemoveAlternative = (index: number) => {
        setAlternatives(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeAlternative = (index: number, field: keyof Alternative, value: string) => {
        setAlternatives(prev =>
            prev.map((alt, i) => (i === index ? { ...alt, [field]: value } : alt))
        );
    };

    // --- Finalizează Brand ---
    const handleFinalizeBrand = () => {
        if (!brandName) return;
        setSavedBrands(prev => [
            ...prev,
            { name: brandName, url: brandUrl, alternatives },
        ]);
        setBrandName("");
        setBrandUrl("");
        setAlternatives([]);
    };

    return (
        <div className="flex flex-col gap-6">
            <Separator className={'mt-3'} />
            {/* Motivul boycott-ului */}
            <div className="flex flex-col">
                <div className={'flex flex-col justify-between gap-5'}>
                    <div className={'flex items-end-safe'}>
                        <div className={'mr-8'}>
                            <span className="font-semibold">Care este motivul boycott-ului?</span>
                            <Select
                                value={reason}
                                onValueChange={setReason}
                            >
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Selectează motivul..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unethicalPractices">Practici neetice</SelectItem>
                                    <SelectItem value="environmentalIssues">Probleme de mediu</SelectItem>
                                    <SelectItem value="laborExploitation">Exploatare muncitori</SelectItem>
                                    <SelectItem value="politicalStance">Poziție politică</SelectItem>
                                    <SelectItem value="other">Altele</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {reason === "other" && (
                            <div className={'flex flex-col'}>
                                <span className="font-semibold">Care e motivul</span>
                                <Input
                                    placeholder="Scrie motivul tău..."
                                    value={otherReason}
                                    onChange={e => setOtherReason(e.target.value)}
                                    className="mt-2 "
                                />
                            </div>
                        )}
                    </div>
                    <div className={'flex items-end-safe'}>
                        <div className={'mr-8 '}>
                            <span className="font-semibold">Care este motivul boycott-ului?</span>
                            <Select
                                value={operatingMode}
                                onValueChange={setOperatingMode}
                            >
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Selectează motivul..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="stopBuying">Nu mai cumpăr acest brand</SelectItem>
                                    <SelectItem value="publicPressure">Presiune publică (email / social)</SelectItem>
                                    <SelectItem value="criticalReviews">Recenzii critice online</SelectItem>
                                    <SelectItem value="informing">Informez / educ oameni</SelectItem>
                                    <SelectItem value="other">Altele</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {operatingMode === "other" && (
                            <div className={'flex flex-col'}>
                                <span className="font-semibold">Care e modul tău de operare ?</span>
                                <Input
                                    placeholder="Scrie modul tău de operare..."
                                    value={otherReason}
                                    onChange={e => setOtherReason(e.target.value)}
                                    className="mt-2 w-full"
                                />
                            </div>
                        )}
                    </div>
                </div>


            </div>

            <Separator />

            {/* Adaugă Brand */}
            <div className="flex flex-col items-start gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="mainButton"
                            size="icon"
                            className="w-35 h-12 flex items-center justify-center"
                        >
                            Adaugă Brand
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[80vh] overflow-y-auto flex flex-col gap-4 p-6 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Adaugă Brand</DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Poți adăuga alternative, dar nu este obligatoriu.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">
                            {/* Brand principal */}
                            <div className="flex flex-col gap-2 border rounded-lg p-4 shadow-sm">
                                <Input
                                    value={brandName}
                                    onChange={e => setBrandName(e.target.value)}
                                    placeholder="Nume Brand"
                                />
                                <Input
                                    value={brandUrl}
                                    onChange={e => setBrandUrl(e.target.value)}
                                    placeholder="URL Brand"
                                />
                            </div>

                            {/* Alternative */}
                            {alternatives.map((alt, i) => (
                                <div key={i} className="flex flex-col gap-2 border rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">Alternativă {i + 1}</span>
                                        <Button variant="destructive" size="icon" onClick={() => handleRemoveAlternative(i)}>
                                            <Trash size={16} />
                                        </Button>
                                    </div>
                                    <Input
                                        placeholder="Nume Brand"
                                        value={alt.brandName}
                                        onChange={e => handleChangeAlternative(i, "brandName", e.target.value)}
                                    />
                                    <Input
                                        placeholder="URL"
                                        value={alt.brandUrl}
                                        onChange={e => handleChangeAlternative(i, "brandUrl", e.target.value)}
                                    />
                                    <Textarea
                                        placeholder="De ce este o alternativă mai bună?"
                                        value={alt.reason}
                                        onChange={e => handleChangeAlternative(i, "reason", e.target.value)}
                                    />
                                </div>
                            ))}

                            <div className="flex justify-between mt-2">
                                <Button variant="secondary" onClick={handleAddAlternative}>
                                    Adaugă alternativă
                                </Button>
                                <Button variant="mainButton" onClick={handleFinalizeBrand}>
                                    Finalizează
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Brand-uri salvate */}
                <div className="flex flex-col gap-2 w-full">
                    {savedBrands.map((b, i) => (
                        <Dialog key={i}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full text-left justify-start px-4 py-2 rounded-lg shadow-sm">
                                    {b.name}
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[80vh] overflow-y-auto flex flex-col gap-4 p-6 rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold">{b.name}</DialogTitle>
                                    <DialogDescription className="text-sm text-muted-foreground">
                                        Detalii despre brand și alternative
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 border rounded-lg p-4 shadow-sm">
                                        <span className="font-medium text-sm">Brand principal</span>
                                        <Input value={b.name} readOnly />
                                        <Input value={b.url} readOnly />
                                    </div>

                                    {b.alternatives.map((alt, j) => (
                                        <div key={j} className="flex flex-col gap-2 border rounded-lg p-4 shadow-sm">
                                            <span className="font-medium text-sm">Alternativă {j + 1}</span>
                                            <Input value={alt.brandName} readOnly />
                                            <Input value={alt.brandUrl} readOnly />
                                            <Textarea value={alt.reason} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </div>
    );
}
