import {useState} from "react";

import LogisticsStep from "@/features/protest/components/steps/LogisticsStep";

import {Logistics} from "@/features/protest/types/logisticsTypes";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useLogisticsStep() {
    const [logistics, setLogistics] = useState<Logistics>(undefined);

    function validator(): boolean {
        return true
    }

    return {
        state: {
            value: logistics,
            set: setLogistics
        },
        component: LogisticsStep,
        validator: validator
    }
}