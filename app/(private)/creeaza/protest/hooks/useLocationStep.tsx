import useGatheringStep from "@/app/(private)/creeaza/protest/hooks/LocationSteps/useGatheringStep";
import {ProtestType} from "@/app/(private)/creeaza/protest/types";

export default function useLocationStep(type: ProtestType) {

    const gathering = useGatheringStep()

    if (type === 'gathering') return gathering

    return gathering;
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