import {StandardStepProp} from "@/features/protest/types/type";
import {VisualMedia} from "@/features/protest/types/visualMediaTypes";



export default function VisualMediaStep({dataState}: StandardStepProp<VisualMedia>) {
    const {value: data, set: onChange} = dataState

    return (
        <div className="flex flex-col gap-5">
            Visual Media
        </div>
    )
}