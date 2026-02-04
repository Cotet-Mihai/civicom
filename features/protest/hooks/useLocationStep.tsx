import useGatheringStep from "@/features/protest/hooks/LocationStep/useGatheringStep";
import useMarchStep from "@/features/protest/hooks/LocationStep/useMarchStep";
import usePicketStep from "@/features/protest/hooks/LocationStep/usePicketStep";
import useBoycottStep from "@/features/protest/hooks/LocationStep/useBoycottStep";

import {TypeProtest} from "@/features/protest/types/basicInfoTypes";

// TODO: De adaugat typeResult dupa ce ai toate controalele

export default function useLocationStep(type: TypeProtest) {
    // const registry = {
    //     gathering: useGatheringStep(),
    //     march: useMarchStep(),
    //     picket: usePicketStep(),
    //     boycott: useBoycottStep(),
    // };
    //
    // if (!type) return ;
    // return registry[type];

    return useGatheringStep();
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