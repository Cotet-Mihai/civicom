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