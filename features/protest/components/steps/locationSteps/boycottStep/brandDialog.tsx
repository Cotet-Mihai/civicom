"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Link as LinkIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface Alternative {
    title: string
    link: string
    reason: string
}

export interface Brand {
    name: string
    link: string
    alternatives: Alternative[]
}

interface BrandDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (brand: Brand) => void
    initialData?: Brand | null
}

export function BrandDialog({
                                open,
                                onOpenChange,
                                onSave,
                                initialData,
                            }: BrandDialogProps) {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [alternatives, setAlternatives] = useState<Alternative[]>([])

    useEffect(() => {
        if (open) {
            setName(initialData?.name ?? "")
            setLink(initialData?.link ?? "")
            setAlternatives(initialData?.alternatives ?? [])
        }
    }, [open, initialData])

    function resetForm() {
        setName("")
        setLink("")
        setAlternatives([])
    }

    function addAlternative() {
        setAlternatives((prev) => [...prev, { title: "", link: "", reason: "" }])
    }

    function updateAlternative(
        index: number,
        field: keyof Alternative,
        value: string
    ) {
        setAlternatives((prev) =>
            prev.map((alt, i) => (i === index ? { ...alt, [field]: value } : alt))
        )
    }

    function removeAlternative(index: number) {
        setAlternatives((prev) => prev.filter((_, i) => i !== index))
    }

    function handleSave() {
        if (!name.trim()) return
        onSave({ name: name.trim(), link: link.trim(), alternatives })
        resetForm()
        onOpenChange(false)
    }

    return (
        <TooltipProvider>
            <Dialog
                open={open}
                onOpenChange={(val) => {
                    if (!val) resetForm()
                    onOpenChange(val)
                }}
            >
                <DialogContent
                    className="flex max-h-[85vh] flex-col sm:max-w-lg p-0 overflow-hidden"
                >

                <DialogHeader className="px-6 pt-6 shrink-0">
                        <DialogTitle>
                            {initialData ? "Editare brand" : "Adaugare brand"}
                        </DialogTitle>
                        <DialogDescription>
                            {initialData
                                ? "Modifici datele brandului pe care vrei sa il boicotezi."
                                : "Completeaza datele brandului pe care vrei sa il boicotezi."}
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="flex-1 overflow-y-auto px-6">

                    <div className="flex flex-col gap-5 pb-4">
                            {/* Brand Name */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="brand-name">
                                    Nume brand <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="brand-name"
                                    placeholder="ex: FastFashion Corp"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Brand Link */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="brand-link">
                                    Link brand <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="brand-link"
                                        placeholder="https://www.exemplu.com"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Alternatives */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Label>Alternative</Label>
                                        {alternatives.length > 0 && (
                                            <Badge variant="secondary" className="text-xs">
                                                {alternatives.length}
                                            </Badge>
                                        )}
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addAlternative}
                                                className="gap-1.5 bg-transparent"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Adauga alternativa
                                            </Button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </div>

                                {alternatives.length === 0 && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Nicio alternativa adaugata. Poti sugera alternative etice la acest brand.
                                    </p>
                                )}

                                {alternatives.map((alt, idx) => (
                                    <Card key={idx} className="relative border-border bg-muted/50">
                                        <CardContent className="flex flex-col gap-3 p-4">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider">
                                                    Alternativa {idx + 1}
                                                </Badge>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeAlternative(idx)}
                                                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                            aria-label={`Sterge alternativa ${idx + 1}`}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                </Tooltip>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor={`alt-title-${idx}`}>
                                                    Titlu <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id={`alt-title-${idx}`}
                                                    placeholder="Nume alternativa"
                                                    value={alt.title}
                                                    onChange={(e) =>
                                                        updateAlternative(idx, "title", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor={`alt-link-${idx}`}>
                                                    Link <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id={`alt-link-${idx}`}
                                                    placeholder="https://www.alternativa.com"
                                                    value={alt.link}
                                                    onChange={(e) =>
                                                        updateAlternative(idx, "link", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor={`alt-reason-${idx}`}>
                                                    De ce e o alternativa buna?{" "}
                                                    <span className="font-normal text-muted-foreground">
                            (optional)
                          </span>
                                                </Label>
                                                <Textarea
                                                    id={`alt-reason-${idx}`}
                                                    placeholder="Explica de ce recomanzi aceasta alternativa..."
                                                    value={alt.reason}
                                                    onChange={(e) =>
                                                        updateAlternative(idx, "reason", e.target.value)
                                                    }
                                                    className="min-h-[60px]"
                                                    rows={2}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="shrink-0 gap-2 border-t px-6 py-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                resetForm()
                                onOpenChange(false)
                            }}
                        >
                            Anuleaza
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!name.trim() || !link.trim()}
                            className="bg-yellow-300 text-green-900 hover:bg-yellow-300/60"
                        >
                            {initialData ? "Salveaza" : "Adauga brand"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
