"use client"

import * as React from "react"
import {useState} from "react"
import {ChevronDownIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

type CalendarWithStartStopTimeProps = {
    date: {
        value: Date | undefined,
        set: (value: Date| undefined) => void
    },
    fromTime: {
        value: string,
        set: (value: string) => void
    },
    toTime: {
        value: string,
        set: (value: string) => void
    }
}

export default function CalendarWithStartStopTime({date, fromTime, toTime}: CalendarWithStartStopTimeProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex gap-6">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                    Când se organizeaza ?
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                        >
                            {date?.value ? date.value.toLocaleDateString() : "Selectează data"}
                            <ChevronDownIcon/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date?.value}
                            captionLayout="dropdown"
                            onSelect={(e: Date | undefined) => {
                                if (!e) return
                                date.set(e)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex gap-4 ml-auto">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="time-from" className="px-1">
                        De la
                    </Label>
                    <Input
                        type="time"
                        id="time-from"
                        step="1"
                        value={fromTime.value}
                        onChange={(e) =>
                            fromTime.set(e.target.value)
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="time-to" className="px-1">
                        Până la
                    </Label>
                    <Input
                        type="time"
                        id="time-to"
                        step="1"
                        value={toTime.value}
                        onChange={(e) =>
                            toTime.set(e.target.value)
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                </div>
            </div>
        </div>
    )
}