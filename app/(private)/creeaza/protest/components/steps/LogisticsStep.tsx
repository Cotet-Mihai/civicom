'use client'

import React, { useState } from "react";
import {User, Mail, PlusCircle, Save, Edit2} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LogisticsStepProps, Contact } from "@/app/(private)/creeaza/protest/types";

export default function LogisticsStep({ dataStates }: LogisticsStepProps) {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");

    const [equipmentInput, setEquipmentInput] = useState("");

    function handleAddContact() {
        const newContact: Contact = { firstName, lastName, mail };
        dataStates.contacts.set([...dataStates.contacts.value, newContact]);

        setFirstName("");
        setLastName("");
        setMail("");
        setContactDialogOpen(false);
    }

    // Editează contact existent
    function handleEditContact() {
        if (!editingContact) return;

        const updatedContact: Contact = { firstName, lastName, mail };
        dataStates.contacts.set(
            dataStates.contacts.value.map(c =>
                c === editingContact ? updatedContact : c
            )
        );

        setFirstName("");
        setLastName("");
        setMail("");
        setEditingContact(null);
        setContactDialogOpen(false);
    }

    function handleDeleteContact(contactToDelete: Contact) {
        dataStates.contacts.set(
            dataStates.contacts.value.filter(c => c !== contactToDelete)
        );
    }

    function addEquipment() {
        if (equipmentInput.trim() === "") return;
        dataStates.equipment.set([...dataStates.equipment.value, equipmentInput.trim()]);
        setEquipmentInput("");
    }

    function removeEquipment(index: number) {
        dataStates.equipment.set(dataStates.equipment.value.filter((_, i) => i !== index));
    }

    const isFormValid = firstName.trim() && lastName.trim() && mail.includes('@') && mail.includes('.');

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Participanți */}
            <div className="flex flex-col gap-2">
                <Label>Număr de participanți dorit</Label>
                <div className="flex gap-3 items-center">
                    <ToggleGroup
                        type="single"
                        value={dataStates.isLimited.value ? "yes" : "no"}
                        onValueChange={(v) => dataStates.isLimited.set(v==='yes')}
                        className={'border'}
                    >
                        <ToggleGroupItem
                            value="yes"
                            className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                        >Limitat</ToggleGroupItem>

                        <ToggleGroupItem
                            value="no"
                            className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                        >Nelimitat</ToggleGroupItem>
                    </ToggleGroup>
                    {dataStates.isLimited.value && (
                        <Input
                            type="number"
                            placeholder="Ex: 3000"
                            value={dataStates.participants.value ?? ""}
                            onChange={(e) => dataStates.participants.set(Number(e.target.value))}
                            className={'w-50'}
                        />
                    )}
                </div>
            </div>

            {/* Echipament recomandat */}
            <div className="flex flex-col gap-2">
                <Label>Echipament recomandat</Label>
                <div className="flex gap-2">
                    <Input
                        placeholder="Ex: pancarte, fluiere..."
                        value={equipmentInput}
                        onChange={(e) => setEquipmentInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // previne submit sau alte efecte
                                addEquipment();
                            }
                        }}
                        className={'w-68'}
                    />
                    <Button onClick={addEquipment}>Adaugă</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {dataStates.equipment.value.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                            <span>{eq}</span>
                            <Button size="icon" variant="ghost" onClick={() => removeEquipment(idx)}>✕</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reguli siguranță */}
            <div className="flex flex-col gap-2">
                <Label>Reguli de siguranță și comportament</Label>
                <Textarea
                    rows={4}
                    placeholder="Ex: Respectați indicațiile organizatorilor, nu aduceți obiecte periculoase..."
                    value={dataStates.safetyRules.value}
                    onChange={(e) => dataStates.safetyRules.set(e.target.value)}
                />
            </div>

            {/* Persoane de contact */}
            <div className="flex flex-col gap-2">
                <Label>Persoane de contact</Label>
                <div className="flex flex-wrap gap-2">
                    {dataStates.contacts.value.map((c, idx) => (
                        <div key={idx} className="flex gap-2 items-center border px-2 py-1 rounded">
                            <span>{c.firstName} {c.lastName} - {c.mail}</span>

                            {/* Edit */}
                            <Button size="icon" variant="ghost" onClick={() => {
                                setEditingContact(c);
                                setFirstName(c.firstName);
                                setLastName(c.lastName);
                                setMail(c.mail);
                                setContactDialogOpen(true);
                            }}>
                                <Edit2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={() => setContactDialogOpen(true)}>Adaugă contact</Button>
                </div>
            </div>

            <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-xl shadow-lg border-none">

                    <DialogHeader className="p-6 pb-2 ">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight">
                                    {editingContact ? "Editează contact" : "Adaugă contact nou"}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Completează detaliile de mai jos pentru a salva persoana.
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Corp Formular - Design din V1 (Grid + Iconițe), Spacing din V2 (space-y-1.5) */}
                    <div className="px-6 py-5 grid gap-6">
                        {/* Rând dublu pentru Nume și Prenume */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
                                    Prenume
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="firstName"
                                        placeholder="ex: Ion"
                                        className="pl-9 h-10 border-muted-foreground/20 focus-visible:ring-primary bg-background"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
                                    Nume
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="lastName"
                                        placeholder="ex: Popescu"
                                        className="pl-9 h-10 border-muted-foreground/20 focus-visible:ring-primary bg-background"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email - Rând întreg */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
                                Adresă Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email" // Tip email activat
                                    placeholder="nume@exemplu.ro"
                                    className="pl-9 h-10 border-muted-foreground/20 focus-visible:ring-primary bg-background"
                                    value={mail}
                                    onChange={e => setMail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 pt-0 flex sm:justify-end gap-3">
                        {/* Buton de ștergere dacă edităm un contact */}
                        {editingContact && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    dataStates.contacts.set(
                                        dataStates.contacts.value.filter(c => c !== editingContact)
                                    );
                                    setEditingContact(null);
                                    setFirstName("");
                                    setLastName("");
                                    setMail("");
                                    setContactDialogOpen(false);
                                }}
                                className="gap-2 px-6"
                            >
                                Șterge contact
                            </Button>
                        )}

                        <Button
                            onClick={editingContact ? handleEditContact : handleAddContact}
                            disabled={!isFormValid}
                            className="gap-2 px-6 shadow-md hover:shadow-lg transition-all"
                        >
                            <Save className="w-4 h-4" />
                            Salvează Contact
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}