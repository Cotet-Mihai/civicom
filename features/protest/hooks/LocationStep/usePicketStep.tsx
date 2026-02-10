import {useState} from "react";

import {PicketMap} from "@/features/protest/components/steps/locationSteps/maps.dynamic";

import {Picket} from "@/features/protest/types/locationTypes";
import {checkLocation} from "@/features/protest/utils";
import {toast} from "sonner";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function usePicketStep(){
    const [picket, setPicket] = useState<Picket>({
        location: {
            lat: undefined,
            lng: undefined
        }
    });

    function reset(): void {
        setPicket(() => {
            return {
                location: {lat: undefined, lng: undefined}
            }
        })
    }

    function validator(): boolean {
        const missingFields: string[] = [];

        checkLocation({location: picket.location, name: 'Locația', missingFields: missingFields});

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
        state: { value: picket, set: setPicket },
        component: PicketMap,
        validator: validator,
        controls: {
            reset: reset
        }
    };
};