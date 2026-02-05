import {useState} from "react";

import VisualMediaStep from "@/features/protest/components/steps/VisualMediaStep";

import {VisualMedia} from "@/features/protest/types/visualMediaTypes";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useVisualMediaStep() {

    const [visualMedia, setVisualMedia] = useState<VisualMedia>(undefined);

    function validator(): boolean {
        return false
    }

    return {
        state: {
            value: visualMedia,
            set: setVisualMedia
        },
        component: VisualMediaStep,
        validator: validator
    }
}