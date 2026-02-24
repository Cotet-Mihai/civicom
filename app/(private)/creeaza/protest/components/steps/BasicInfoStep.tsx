import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import CalendarWithStartStopTime from "@/components/CalendarWithStartStopTime";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {BasicInfoStates, ProtestType} from "@/app/(private)/creeaza/protest/types";

export type BasicInfoStepProps = {
    dataStates: BasicInfoStates
}

export default function BasicInfoStep({dataStates}: BasicInfoStepProps) {

    return (
        <div className="flex flex-col gap-5 w-full">

            <div className="flex flex-col justify-center gap-2">
                <span>Ce tip de protest este ?</span>
                <ToggleGroup
                    type="single"
                    className={'border'}
                    value={dataStates.type.value}
                    onValueChange={(e) =>  dataStates.type.set(e as ProtestType)}
                >
                    <ToggleGroupItem
                        value="gathering"
                        aria-label="Toggle gathering"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <span>Adunare</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="march"
                        aria-label="Toggle march"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <span>Marș</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="picket"
                        aria-label="Toggle picket"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <span>Pichet</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="boycott"
                        aria-label="Toggle boycott"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <span>Boicot</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titlu</Label>
                <Input
                    id="title"
                    placeholder="Adaugă titlul protestului"
                    value={dataStates.title.value}
                    onChange={(e) => dataStates.title.set(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                    id="description"
                    placeholder="Adaugă descrierea aici..."
                    rows={6}
                    value={dataStates.description.value}
                    onChange={(e) => dataStates.description.set(e.target.value)}
                />
            </div>

            <CalendarWithStartStopTime
                date={dataStates.date}
                fromTime={dataStates.fromTime}
                toTime={dataStates.toTime}
            />
        </div>
    )
}