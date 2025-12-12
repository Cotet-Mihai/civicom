export type Props = {
    titleState: {
        title: string;
        setTitle: (title: string) => void;
    },
    descriptionState: {
        description: string;
        setDescription: (description: string) => void;
    },
    dateState: {
        date: Date | undefined,
        setDate: (date: Date | undefined) => void
    },
    fromTimeState: {
        fromTime: string,
        setFromTime: (fromTime: string) => void
    },
    toTimeState: {
        toTime: string,
        setToTime: (toTime: string) => void
    },
    typeState: {
        type: string | undefined,
        setType: (type: string | undefined) => void
    }
}