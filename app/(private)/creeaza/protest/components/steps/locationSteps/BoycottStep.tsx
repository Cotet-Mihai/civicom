"use client"

import React, {JSX, useState} from "react"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
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
} from "@/app/(private)/creeaza/protest/components/brandDialog"
import {BrandViewDialog} from "@/app/(private)/creeaza/protest/components/brandViewDialog";
import {type BoycottStepProps, type Brand} from "@/app/(private)/creeaza/protest/types";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";



export default function BoycottStep({dataStates}: BoycottStepProps): JSX.Element {

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const [viewingBrandIndex, setViewingBrandIndex] = useState<number | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editingBrandIndex, setEditingBrandIndex] = useState<number | null>(null)

    function handleAddBrand(brand: Brand) {
        dataStates.brands.set((prev) => [...prev, brand])
    }

    function handleEditBrand(brand: Brand) {
        if (editingBrandIndex !== null) {
            dataStates.brands.set((prev) =>
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

    function handleDeleteFromView() {
        if (viewingBrandIndex === null) return;

        dataStates.brands.set((prev) =>
            prev.filter((_, idx) => idx !== viewingBrandIndex)
        );

        setViewDialogOpen(false);
        setViewingBrandIndex(null);
    }

    return (
        <TooltipProvider>
            <div className="w-full flex flex-col gap-5 mt-3">

                <div className="flex flex-col justify-center gap-2">
                    <Label><span className={'font-semibold text-sm'}>Motivul boicotului</span></Label>
                    <ToggleGroup
                        type="single"
                        className={'border'}
                        value={dataStates.reason.value}
                        onValueChange={(e) =>  dataStates.reason.set(e)}
                    >
                        <ToggleGroupItem
                            value="unethical practices"
                            aria-label="Toggle unethical practices"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Practici neetice</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="environmental issues"
                            aria-label="Toggle environmental issues"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Probleme de mediu</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="exploitation of workers"
                            aria-label="Toggle exploitation of workers"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Exploatare muncitori</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="political position"
                            aria-label="Toggle political position"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Poziție politică</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="other"
                            aria-label="Toggle other"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Altele</span>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="flex flex-col justify-center gap-2">
                    <Label><span className={'font-semibold text-sm'}>Mod de operare</span></Label>
                    <ToggleGroup
                        type="single"
                        className={'border'}
                        value={dataStates.operation.value}
                        onValueChange={(e) =>  dataStates.operation.set(e)}
                    >
                        <ToggleGroupItem
                            value="not buying anymore"
                            aria-label={'Toggle not buying anymore'}
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Nu mai cumpăr acest brand</span>
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="public pressure"
                            aria-label="Toggle public pressure"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Presiune publică online</span>
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="inform people"
                            aria-label="Toggle inform people"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Informare publică</span>
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="any"
                            aria-label="Toggle any"
                            className={'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground'}
                        >
                            <span>Orice mod</span>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <Separator />

                {/* BRANDS */}
                <section className="flex flex-col gap-4">
                    <div>
                        <Label className="text-base font-semibold">Adaugă brand</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Adaugă brandurile pe care vrei să le boicotezi și sugerează alternative.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {dataStates.brands.value.map((brand, idx) => (
                            <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-yellow-300 bg-yellow-300/10 hover:bg-yellow-300/30"
                                        onClick={() => openViewDialog(idx)}
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-300 text-green-900 font-bold">
                                            {brand.name.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="line-clamp-2 text-xs font-medium">
                                            {brand.name}
                                        </span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Apasă pentru a vedea detaliile</span>
                                </TooltipContent>
                            </Tooltip>
                        ))}

                        <Button
                            variant="outline"
                            className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-xl border-dashed"
                            onClick={() => setAddDialogOpen(true)}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="text-xs font-medium">Adaugă</span>
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
                        viewingBrandIndex !== null ? dataStates.brands.value[viewingBrandIndex] : null
                    }
                    onEdit={handleEditFromView}
                    onDelete={handleDeleteFromView}
                />

                <BrandDialog
                    open={editDialogOpen}
                    onOpenChange={(val) => {
                        setEditDialogOpen(val)
                        if (!val) setEditingBrandIndex(null)
                    }}
                    onSave={handleEditBrand}
                    initialData={
                        editingBrandIndex !== null ? dataStates.brands.value[editingBrandIndex] : null
                    }
                />
            </div>
        </TooltipProvider>
    )
}