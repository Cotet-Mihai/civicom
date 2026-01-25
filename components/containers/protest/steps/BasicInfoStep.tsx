import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import CalendarWithStartStopTime from "@/components/calendarWithStartStopTime";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {ProtestChildComponentArgs} from "@/types/protestStepper";

export default function BasicInfoStep({data, onChange}: ProtestChildComponentArgs) {

    return (
        <div className="flex flex-col gap-5">

            <div className="flex items-center gap-2">
                <p>Ce tip de protest este ?</p>
                <ToggleGroup
                    type="single"
                    className={'border'}
                    value={data.typeProtest}
                    onValueChange={(e) => onChange({ typeProtest: e})}
                >
                    <ToggleGroupItem
                        value="gathering"
                        aria-label="Toggle gathering"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <p>Adunare</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="march"
                        aria-label="Toggle march"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <p>Marș</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="picket"
                        aria-label="Toggle picket"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <p>Pichet</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="boycott"
                        aria-label="Toggle boycott"
                        className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}
                    >
                        <p>Boicot</p>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titlu</Label>
                <Input
                    id="title"
                    placeholder="Adaugă titlul protestului"
                    value={data.title}
                    onChange={(e) => onChange({title: e.target.value})}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                    id="description"
                    placeholder="Adaugă descrierea aici..."
                    rows={6}
                    value={data.description}
                    onChange={(e) => onChange({description: e.target.value})}
                />
            </div>

            <CalendarWithStartStopTime
                date={data.date}
                time={data.time}
                onChange={onChange}
            />
        </div>
    )
}