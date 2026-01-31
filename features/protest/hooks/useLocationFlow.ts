import {useState} from "react";
import {Boycott, Gathering, March, Picket, UseLocationFlow} from "@/features/protest/types";

export default function useLocationFlow(): UseLocationFlow {
    const [gathering, setGathering] = useState<Gathering>({
        location: {
            lat: undefined,
            lng: undefined
        }
    });

    const [march, setMarch] = useState<March>({
        start: {
            lat: undefined,
            lng: undefined
        },
        inter: [],
        polylines: [],
        finish: {
            lat: undefined,
            lng: undefined
        }
    });

    const [picket, setPicket] = useState<Picket>({
        location: {
            lat: undefined,
            lng: undefined
        }
    });

    const [boycott, setBoycott] = useState<Boycott>(undefined);

    return {
        gatheringState: {
            value: gathering,
            set: setGathering
        },
        marchState: {
            value: march,
            set: setMarch
        },
        picketState: {
            value: picket,
            set: setPicket
        },
        boycottState: {
            value: boycott,
            set: setBoycott
        }
    }
}

/*
                        +---------------------------+
                        |      Tipuri de protest    |
                        +---------------------------+
                                      |
       -------------------------------------------------------------
       |                   |                   |                   |
     Gathering           Picket              March               Boycott
       |                   |                   |                   |
- Adunare publică   - Pașnic, vizibil   - Grup în           - Refuz de a
- Scop social/      - Țintă clară       mișcare             cumpăra sau
  informativ        - Presiune directă  organizată          refuza servicii
- Poate include     - Pancarte/bannere  - Urmează un        - Poate fi
  discursuri,       - În fața unei      traseu              individual sau
  activități          instituții        - Poate fi          colectiv
  culturale         - Ex: în fața unei  - Ex: marș
- Ex: adunare în      fabrici, bănci    pentru drepturi
  parc pentru         sau guvern        civile
  schimbări
  climatice

*/

