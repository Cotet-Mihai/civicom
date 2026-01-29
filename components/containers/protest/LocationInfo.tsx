import {MarchLocation} from "@/components/containers/protest/locationForms/marchLocation";
import GatheringLocation from "@/components/containers/protest/locationForms/gatheringLocation";
import {LocationInfoProps} from "@/types/protestStepper";

export default function LocationInfo({ typeProtest }: LocationInfoProps) {
    const marchLocation = (
        <MarchLocation/>
    )

    const gatheringLocation = (
        <GatheringLocation/>
    )

    return (
        <div>
            {typeProtest === 'march' ? (
            marchLocation
        ) : typeProtest === 'gathering' ? (
            gatheringLocation
        ) : typeProtest === 'picket' ? (
            <div>Locație fixă pentru Pichet</div>
) : typeProtest === 'boycott' ? (
        <div>Link-uri pentru firmele boicotate</div>
) : (
        <div>Selectați un tip de protest</div>
)}
    </div>
);
}



// Adunare → locație fixă, Alias, Adresa completa
//
// Marș → traseu complet, punct de start, punct final, puncte intermediare / opriri, estimare timp parcurgere traseu ?
//
// Pichet → locație fixă (instituție/firma), Adresa completa, link insitutie/firma
//
// Boicot → firma/firme, link-uri pentru fiecare firma, sugestie de alternativa la produs/serviciu vizat ?