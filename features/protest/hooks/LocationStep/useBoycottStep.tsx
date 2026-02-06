import {useState} from "react";

import BoycottStep from "@/features/protest/components/steps/locationSteps/boycottStep/boycottStep";

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
        component: BoycottStep,
        validator: validator,
        controls: {
            reset: reset
        }
    }
}