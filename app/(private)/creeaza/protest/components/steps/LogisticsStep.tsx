'use client'

import React, { useState } from "react";
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
        setFirstName(""); setLastName(""); setMail("");
        setContactDialogOpen(false);
    }

    function addEquipment() {
        if (equipmentInput.trim() === "") return;
        dataStates.equipment.set([...dataStates.equipment.value, equipmentInput.trim()]);
        setEquipmentInput("");
    }

    function removeEquipment(index: number) {
        dataStates.equipment.set(dataStates.equipment.value.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Participanți */}
            <div className="flex flex-col gap-2">
                <Label>Număr de participanți dorit</Label>
                <div className="flex gap-3 items-center">
                    <ToggleGroup
                        type="single"
                        value={dataStates.isUnlimited.value ? "yes" : "no"}
                        onValueChange={(v) => dataStates.isUnlimited.set(v === "yes")}
                        className={'border'}
                    >
                        <ToggleGroupItem
                            value="no"
                            className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                        >Limitat</ToggleGroupItem>

                        <ToggleGroupItem
                            value="yes"
                            className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                        >Nelimitat</ToggleGroupItem>
                    </ToggleGroup>
                    {!dataStates.isUnlimited.value && (
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
                            <Button size="icon" variant="ghost" onClick={() => {
                                setEditingContact(c);
                                setFirstName(c.firstName); setLastName(c.lastName); setMail(c.mail);
                                setContactDialogOpen(true);
                            }}>✏️</Button>
                        </div>
                    ))}
                    <Button onClick={() => setContactDialogOpen(true)}>Adaugă contact</Button>
                </div>
            </div>

            {/* Dialog adaugare/editare contact */}
            <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                <DialogContent className="flex flex-col gap-3 p-6">
                    <DialogHeader>
                        <DialogTitle>{editingContact ? "Editează contact" : "Adaugă contact"}</DialogTitle>
                    </DialogHeader>

                    <Input placeholder="Prenume" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Input placeholder="Nume" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Input placeholder="Email" type={'email'} value={mail} onChange={e => setMail(e.target.value)} />

                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setContactDialogOpen(false)}>Anulează</Button>
                        <Button onClick={handleAddContact}>Salvează</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}