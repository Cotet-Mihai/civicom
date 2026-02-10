import {Camera, Info, ListTodo, MapPin} from "lucide-react";

import {Step} from "@/features/protest/types/navigationTypes";
import {LatLngExpression} from "leaflet";



export const defaultLocation: [number, number] = [44.4358196, 26.1021932] satisfies LatLngExpression; // Bucharest, România

export const stepsData: Step[] = [
    {
        title: 'Informații de bază',
        icon: Info
    },
    {
        title: 'Locație',
        icon: MapPin,
    },
    {
        title: "Media vizuală",
        icon: Camera,
    },
    {
        title: "Logistică",
        icon: ListTodo,
    }
]