import {StepperSteps} from "@/types/stepper";
import {Camera, Flag, FlagOff, Goal, Info, ListTodo, MapPin, MapPinIcon, WaypointsIcon} from "lucide-react";


export const stepperData: StepperSteps[] = [
    {
        title: 'Informații de bază',
        icon: Info,
        description: 'Completați toate informațiile pentru a continua.'
    },
    {
        title: 'Locație',
        icon: MapPin,
        description: {
            gathering: [
                {
                    icon: <MapPinIcon size={16}/>,
                    description: '- Unde este adunarea'
                }
            ],
            march: [
                {
                    icon: <Flag size={16}/>,
                    description: '- Unde începe marșul'
                },
                {
                    icon: <Goal size={16}/>,
                    description: '-  Unde sunt punctele intermediare'
                },
                {
                    icon: <FlagOff size={16}/>,
                    description: '-  Unde este finalul marșului'
                },
                {
                    icon: <WaypointsIcon size={16}/>,
                    description: '-  Trasează traseul exact pe hartă'
                }
            ]
        }
    },
    {
        title: 'Media Vizuală',
        icon: Camera,
        description: 'test'
    },
    {
        title: 'Logistică',
        icon: ListTodo,
        description: 'test'
    }
]