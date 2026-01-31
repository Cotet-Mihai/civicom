import {LogisticsProps} from "@/features/protest/types";

export default function LogisticsStep({dataState}: LogisticsProps) {
    const {value: data, set: onChange} = dataState

    return (
        <div className="flex flex-col gap-5">
            Logistics
        </div>
    )
}