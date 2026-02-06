"use client"

import React, { useState } from "react"
import { Plus, ShieldAlert, Megaphone } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    BrandDialog,
    type Brand,
} from "@/features/protest/components/steps/locationSteps/boycottStep/brandDialog"
import { BrandViewDialog } from "@/features/protest/components/steps/locationSteps/boycottStep/brandViewDialog"

const REASONS = [
    "Practici neetice",
    "Probleme de mediu",
    "Exploatare muncitori",
    "Pozitie politica",
    "Altele",
] as const

const OPERATIONS = [
    "Nu mai cumpar acest brand",
    "Presiune publica (email / social)",
    "Recenzii critice online",
    "Informez / educ oameni",
    "Altele",
] as const

export default function BoycottStep() {
    const [selectedReasons, setSelectedReasons] = useState<string[]>([])
    const [customReason, setCustomReason] = useState("")
    const [selectedOperations, setSelectedOperations] = useState<string[]>([])
    const [customOperation, setCustomOperation] = useState("")

    const [brands, setBrands] = useState<Brand[]>([])
    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const [viewingBrandIndex, setViewingBrandIndex] = useState<number | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editingBrandIndex, setEditingBrandIndex] = useState<number | null>(null)

    function toggleSelection(
        value: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    function handleAddBrand(brand: Brand) {
        setBrands((prev) => [...prev, brand])
    }

    function handleEditBrand(brand: Brand) {
        if (editingBrandIndex !== null) {
            setBrands((prev) =>
                prev.map((b, i) => (i === editingBrandIndex ? brand : b))
            )
            setEditingBrandIndex(null)
        }
    }

    function openViewDialog(index: number) {
        setViewingBrandIndex(index)
        setViewDialogOpen(true)
    }

    function handleEditFromView() {
        setViewDialogOpen(false)
        if (viewingBrandIndex !== null) {
            setEditingBrandIndex(viewingBrandIndex)
            setEditDialogOpen(true)
        }
    }

    return (
        <TooltipProvider>
            <div className="w-full flex flex-col gap-5 mt-3">

                {/* REASONS */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
                            <ShieldAlert className="h-4 w-4" />
                        </div>
                        <Label className="text-base font-semibold">
                            Motivul boicotului
                        </Label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {REASONS.map((reason) => (
                            <Toggle
                                key={reason}
                                variant="outline"
                                size="sm"
                                pressed={selectedReasons.includes(reason)}
                                onPressedChange={() =>
                                    toggleSelection(reason, selectedReasons, setSelectedReasons)
                                }
                                className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                {reason}
                            </Toggle>
                        ))}
                    </div>

                    {selectedReasons.includes("Altele") && (
                        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                            <Label htmlFor="custom-reason">Specifica motivul tau</Label>
                            <Input
                                id="custom-reason"
                                placeholder="Descrie motivul boicotului..."
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                            />
                        </div>
                    )}
                </section>

                <Separator />

                {/* OPERATIONS */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
                            <Megaphone className="h-4 w-4" />
                        </div>
                        <Label className="text-base font-semibold">Mod de operare</Label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {OPERATIONS.map((op) => (
                            <Toggle
                                key={op}
                                variant="outline"
                                size="sm"
                                pressed={selectedOperations.includes(op)}
                                onPressedChange={() =>
                                    toggleSelection(
                                        op,
                                        selectedOperations,
                                        setSelectedOperations
                                    )
                                }
                                className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                {op}
                            </Toggle>
                        ))}
                    </div>

                    {selectedOperations.includes("Altele") && (
                        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                            <Label htmlFor="custom-operation">
                                Specifica modul tau de operare
                            </Label>
                            <Input
                                id="custom-operation"
                                placeholder="Descrie cum vrei sa actionezi..."
                                value={customOperation}
                                onChange={(e) => setCustomOperation(e.target.value)}
                            />
                        </div>
                    )}
                </section>

                <Separator />

                {/* BRANDS */}
                <section className="flex flex-col gap-4">
                    <div>
                        <Label className="text-base font-semibold">Adauga brand</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Adauga brandurile pe care vrei sa le boicotezi si sugereaza
                            alternative.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {brands.map((brand, idx) => (
                            <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-primary bg-primary/10"
                                        onClick={() => openViewDialog(idx)}
                                    >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                      {brand.name.charAt(0).toUpperCase()}
                    </span>
                                        <span className="line-clamp-2 text-xs font-medium">
                      {brand.name}
                    </span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Apasa pentru a vedea detaliile</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}

                        <Button
                            variant="outline"
                            className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-xl border-dashed"
                            onClick={() => setAddDialogOpen(true)}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="text-xs font-medium">Adauga</span>
                        </Button>
                    </div>
                </section>

                {/* Dialogs */}
                <BrandDialog
                    open={addDialogOpen}
                    onOpenChange={setAddDialogOpen}
                    onSave={handleAddBrand}
                />

                <BrandViewDialog
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    brand={
                        viewingBrandIndex !== null ? brands[viewingBrandIndex] : null
                    }
                    onEdit={handleEditFromView}
                />

                <BrandDialog
                    open={editDialogOpen}
                    onOpenChange={(val) => {
                        setEditDialogOpen(val)
                        if (!val) setEditingBrandIndex(null)
                    }}
                    onSave={handleEditBrand}
                    initialData={
                        editingBrandIndex !== null ? brands[editingBrandIndex] : null
                    }
                />
            </div>
        </TooltipProvider>
    )
}
