import {ProtestType} from "@/app/(private)/creeaza/protest/types";

import useDefaultLocationStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useDefaultLocationStep";
import useMarchStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useMarchStep";
import useBoycottStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useBoycottStep";

export default function useLocationStep(type: ProtestType) {

    const defaultStep = useDefaultLocationStep()

    const registry = {
        gathering: defaultStep,
        march: useMarchStep(),
        picket: defaultStep,
        boycott: useBoycottStep(),
    };

    // Default return
    if (!type) return defaultStep

    return registry[type];
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