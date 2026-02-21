import {Camera, Info, ListTodo, MapPin} from "lucide-react";

export const steps = [
    {
        title: ( // Just for testing
            <>
                <span>Informații de bază</span>
            </>

        ),
        description: 'Completați toate informațiile pentru a continua.',
        icon: (
            <Info  className="size-4" />
        ),
    },
    {
        title: "Locație",
        description: 'test 2',
        icon: (
            <MapPin  className="size-4" />
        ),
    },
    {
        title: "Media Vizuală",
        description: 'test 3',
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