import {getEvent} from "@/app/(public)/eveniment/actions/getEvent";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EventPage({ params }: Props) {
    const { id } = await params;

    const event = await getEvent(id);

    return (
        <pre>
      {JSON.stringify(event, null, 2)}
    </pre>
    );
}