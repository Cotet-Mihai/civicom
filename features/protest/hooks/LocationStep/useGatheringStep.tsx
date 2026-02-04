import {useState} from "react";

import GatheringMap from "@/features/protest/components/steps/locationSteps/gatheringMap.client";

import {Gathering} from "@/features/protest/types/locationTypes";
import {checkLocation} from "@/features/protest/utils";
import {toast} from "sonner";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useGatheringStep(){
    const [gathering, setGathering] = useState<Gathering>({
        location: {lat: undefined, lng: undefined}
    });

    function reset(): void {
        setGathering(() => {
            return {
                location: {lat: undefined, lng: undefined}
            }
        })
    }

    function validator(): boolean {
        const missingFields: string[] = [];

        checkLocation({location: gathering.location, name: 'Locația', missingFields: missingFields});

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
        state: {
            value: gathering,
            set: setGathering
        },
        component: GatheringMap,
        validator: validator,
        controls: {
            reset: reset
        }
    }
}