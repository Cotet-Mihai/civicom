

type LocationInfoProps = {
    typeProtest?: string;
}

export default function LocationInfo({ typeProtest }: LocationInfoProps) {
    return (
        <div>
            {typeProtest === 'march' ? (
                <div>Traseu pentru Marș</div>
            ) : typeProtest === 'gathering' ? (
                <div>Locație fixă pentru Adunare</div>
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