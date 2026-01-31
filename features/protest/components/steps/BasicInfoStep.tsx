import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import CalendarWithStartStopTime from "@/components/calendarWithStartStopTime";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

import {BasicInfoProps, TypeProtest} from "@/features/protest/types";

export default function BasicInfoStep({dataState}: BasicInfoProps) {
    const {value: data, set: onChange} = dataState

    return (
        <div className="flex flex-col gap-5">

            <div className="flex items-center gap-2">
                <p>Ce tip de protest este ?</p>
                <ToggleGroup
                    type="single"
                    className={'border'}
                    value={data.typeProtest}
                    onValueChange={(e: TypeProtest) => onChange({ ...data, typeProtest: e })}
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
                    value={data.title}
                    onChange={(e) => onChange({...data, title: e.target.value})}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                    id="description"
                    placeholder="Adaugă descrierea aici..."
                    rows={6}
                    value={data.description}
                    onChange={(e) => onChange({...data, description: e.target.value})}
                />
            </div>

            <CalendarWithStartStopTime
                dataState={dataState}
            />
        </div>
    )
}