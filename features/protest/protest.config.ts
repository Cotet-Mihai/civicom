import {LatLngExpression} from "leaflet";
import {Camera, Info, ListTodo, MapPin} from "lucide-react";

import BasicInfoStep from "@/features/protest/components/steps/BasicInfoStep";
import LocationFlowUI from "@/features/protest/components/LocationFlowUI";
import VisualMediaStep from "@/features/protest/components/steps/VisualMediaStep";
import LogisticsStep from "@/features/protest/components/steps/LogisticsStep";

import validateBasicInfo from "@/features/protest/validators/basicInfo";

import {Step} from "@/features/protest/types";



export const defaultLocation: [number, number] = [44.4358196, 26.1021932] satisfies LatLngExpression;

export const stepsData: Step[] = [
    {
        key: 'basicInfo',
        title: 'Informații de bază',
        icon: Info,
        component: BasicInfoStep,
        validator: validateBasicInfo
    },
    {
        key: 'location',
        title: 'Locație',
        icon: MapPin,
        component: LocationFlowUI
    },
    {
        key: "visualMedia",
        title: "Media vizuală",
        icon: Camera,
        component: VisualMediaStep,
    },
    {
        key: "logistics",
        title: "Logistică",
        icon: ListTodo,
        component: LogisticsStep,
    }
]