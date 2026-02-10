import {StandardStepProp} from "@/features/protest/types/type";
import {Logistics} from "@/features/protest/types/logisticsTypes";

export default function LogisticsStep({dataState}: StandardStepProp<Logistics>) {
    const {value: data, set: onChange} = dataState

    return (
        <div className="flex flex-col gap-5">
            Logistics
        </div>
    )
}