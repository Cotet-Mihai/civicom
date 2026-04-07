'use server'

import {createClient} from "@/lib/supabase/server";

export async function getEvent(eventId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("events")
        .select(`
        *,
        event_basic_info (*),
        event_locations (
            *,
            event_location_points (*),
            event_location_routes (*)
        ),
        event_boycotts (
          *,
          boycott_brands (
            *,
            boycott_alternatives (*)
          )
        ),
        event_media (*),
        event_logistics (*),
        event_contacts (*)
        `)
        .eq("id", eventId)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Failed to fetch event");
    }

    return data;
}