import {useState} from "react";

import {MarchMap} from "@/features/protest/components/steps/locationSteps/maps.dynamic";

import {March} from "@/features/protest/types/locationTypes";
import {checkLocation, checkMultiLocation} from "@/features/protest/utils";
import {toast} from "sonner";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useMarchStep(){
    const [march, setMarch]= useState<March>({
        start: {lat: undefined, lng: undefined},
        inter: [],
        polylines: [],
        finish: {lat: undefined, lng: undefined}
    });

    function reset() {
        setMarch(() => {
            return {
                start: {lat: undefined, lng: undefined},
                inter: [],
                polylines: [],
                finish: {lat: undefined, lng: undefined}
            }
        })
    }

    function validator(): boolean {
        const missingFields: string[] = [];

        checkLocation({location: march.start, name: 'Startul', missingFields: missingFields});
        checkMultiLocation({locations: march.inter, name: 'Punctul/Punctele intermediare', missingFields: missingFields});
        checkMultiLocation({locations: march.polylines, name: 'Traseul', missingFields: missingFields});
        checkLocation({location: march.finish, name: 'Finalul', missingFields: missingFields});

        if (missingFields.length > 0) {
            (toast.error(
                <span>
                    <span className={'font-bold'}>Câmpuri lipsă:</span>
                    <ol>
                        {missingFields.map((field, index) => (
                            <li key={index}>• {field}</li>
                        ))}
                    </ol>
                </span>
            ));
            return false
        }
        return true;
    }

    return {
        state: {value: march, set: setMarch},
        component: MarchMap,
        validator: validator,
        controls: {
            reset: reset
        }
    }
}