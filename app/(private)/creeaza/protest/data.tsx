import {Camera, Info, ListTodo, MapPin} from "lucide-react";
import {LatLngExpression} from "leaflet";

export const defaultLocation: [number, number] = [44.4358196, 26.1021932] satisfies LatLngExpression; // Bucharest, România

export const steps = [
    {
        title: 'Informații de bază',
        description: 'Completați toate informațiile pentru a continua.',
        icon: (
            <Info  className="size-4" />
        )
    },
    {
        title: "Locație",
        description: 'Adăugați punctul de întâlnire pe hartă pentru a continua.',
        icon: (
            <MapPin  className="size-4" />
        )
    },
    {
        title: "Media Vizuală",
        description: 'Adaugă imaginea pentru bannerul protestului, opțional poți adăuga și fișiere media pentru pancardele pe care le dorești la protest.',
        icon: (
            <Camera  className="size-4" />
        ),
    },
    {
        title: "Logistică",
        description: 'test 4',
        icon: (
            <ListTodo  className="size-4" />
        ),
    },
]