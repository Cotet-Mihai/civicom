import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import CalendarWithStartStopTime from "@/components/calendarWithStartStopTime";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

type Props = {
    titleState: {
        title: string;
        setTitle: (title: string) => void;
    },
    descriptionState: {
        description: string;
        setDescription: (description: string) => void;
    },
    dateState: {
        date: Date | undefined,
        setDate: (date: Date | undefined) => void
    },
    fromTimeState: {
        fromTime: string,
        setFromTime: (fromTime: string) => void
    },
    toTimeState: {
        toTime: string,
        setToTime: (toTime: string) => void
    },
    typeState: {
        type: string | undefined,
        setType: (type: string | undefined) => void
    }
}

export default function BasicInfo({titleState, descriptionState, dateState, fromTimeState, toTimeState, typeState}: Props) {

    return (
        <div className="flex flex-col gap-5">

            <div className="flex items-center gap-2">
                <p>Ce tip de protest este ?</p>
                <ToggleGroup type="single" className={'border'} value={typeState.type} onValueChange={typeState.setType}>
                    <ToggleGroupItem value="gathering" aria-label="Toggle gathering" className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}>
                        <p>Adunare</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="march" aria-label="Toggle march" className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}>
                        <p>Marș</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="picket" aria-label="Toggle picket" className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}>
                        <p>Pichet</p>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="boycott" aria-label="Toggle boycott" className={'data-[state=on]:bg-yellow-300 data-[state=on]:text-green-900'}>
                        <p>Boicot</p>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titlu</Label>
                <Input
                    id="title"
                    placeholder="Adaugă titlul protestului"
                    value={titleState.title}
                    onChange={(e) => titleState.setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                    id="description"
                    placeholder="Adaugă descrierea aici..."
                    rows={6}
                    value={descriptionState.description}
                    onChange={(e) => descriptionState.setDescription(e.target.value)}
                />
            </div>

            <CalendarWithStartStopTime
                dateState={{date: dateState.date, setDate: dateState.setDate}}
                fromTimeState={{fromTime: fromTimeState.fromTime, setFromTime: fromTimeState.setFromTime}}
                toTimeState={{toTime: toTimeState.toTime, setToTime: toTimeState.setToTime}}
            />
        </div>
    )
}