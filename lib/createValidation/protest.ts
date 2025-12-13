import {Shape} from "@/types/marchLocation";

export function validateBasicInfo({
                               title,
                               description,
                               date,
                               fromTime,
                               toTime,
                               type
                           }: {
    title: string;
    description: string;
    date: Date | undefined;
    fromTime: string;
    toTime: string;
    type: string | undefined;
}) {
    return (
        title.trim().length > 0 &&
        description.trim().length > 0 &&
        date !== undefined &&
        fromTime.trim().length > 0 &&
        toTime.trim().length > 0 &&
        !!type
    );
}

type ShapeType = 'start' | 'inter' | 'finish' | 'polyline';

export function validateLocationData(locationData: Shape[] | undefined) {
    if (!Array.isArray(locationData) || locationData.length === 0) return false;

    const requiredTypes: ShapeType[] = ['start', 'inter', 'finish', 'polyline'];

    // verificăm dacă fiecare tip există măcar o dată
    return requiredTypes.every((type) =>
        locationData.some((shape) => shape.type === type)
    );
}
