import {FormDataBasicInfo} from "@/types/protestStepper";

export type CalendarWithStartStopTimeProps = {
    date?: Date,
    time: {
        from: string,
        to: string
    }
    onChange: (partial: Partial<FormDataBasicInfo>) => void;
}