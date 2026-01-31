import {LocationFlowUIProps} from "@/features/protest/types";

export default function LocationFlowUI({children}: LocationFlowUIProps) {

    return (
        <div className="flex flex-col gap-5">
            Location
            {children}
        </div>
    )
}