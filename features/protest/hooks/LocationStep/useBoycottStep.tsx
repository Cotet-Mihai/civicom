import {useState} from "react";

import BoycottMap from "@/features/protest/components/steps/locationSteps/boycottMap";

import {Boycott} from "@/features/protest/types/locationTypes";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useBoycottStep(){
    const [boycott, setBoycott] = useState<Boycott>(undefined);

    function reset() {
        setBoycott(() => {
            return undefined
        })
    }

    function validator(): boolean {
        return true
    }

    return {
        state: {value: boycott, set: setBoycott},
        component: BoycottMap,
        validator: validator,
        controls: {
            reset: reset
        }
    }
}