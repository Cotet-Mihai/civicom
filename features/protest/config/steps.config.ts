import {Step} from "@/types/protestStepper";
import {Camera, Info, ListTodo, MapPin} from "lucide-react";
import BasicInfoStep from "@/components/containers/protest/steps/BasicInfoStep";
import LocationStep from "@/components/containers/protest/steps/LocationStep";
import VisualMediaStep from "@/components/containers/protest/steps/VisualMediaStep";
import LogisticsStep from "@/components/containers/protest/steps/LogisticsStep";

export const protestSteps: Step[] = [
    {
        key: "basic-info",
        title: "Informații de bază",
        icon: Info,
        component: BasicInfoStep,
    },
    {
        key: "location",
        title: "Locație",
        icon: MapPin,
        component: LocationStep,
    },
    {
        key: "media",
        title: "Media vizuală",
        icon: Camera,
        component: VisualMediaStep,
    },
    {
        key: "logistics",
        title: "Logistică",
        icon: ListTodo,
        component: LogisticsStep,
    },
];