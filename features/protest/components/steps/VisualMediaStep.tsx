import {VisualMediaProps} from "@/features/protest/types";

export default function VisualMediaStep({dataState}: VisualMediaProps) {
    const {value: data, set: onChange} = dataState

    return (
        <div className="flex flex-col gap-5">
            Visual Media
        </div>
    )
}