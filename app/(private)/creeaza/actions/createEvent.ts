"use server"

import {createClient} from "@/lib/supabase/server";

export type Event = {
    id: string;
    type: string;
    created_by: string;
    created_by_display_name: string;
    created_at: string;
    status: string;
};

export async function createEvent(type: string):
    Promise<{
    'event': Event
}> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const display_name = user.user_metadata.display_name

    const { data, error } = await supabase
        .from("events")
        .insert([
            {
                type: type,
                created_by: user.id,
                created_by_display_name: display_name
            },
        ])
        .select();

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        throw new Error("Event creation failed");
    }

    return {
        event: data[0]
    };
}