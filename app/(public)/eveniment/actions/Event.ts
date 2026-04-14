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


export async function incrementEventViews(eventId: string) {
    const supabase = await createClient();
    const { error } = await supabase.rpc("increment_event_views", { event_id: eventId });

    if (error) {
        console.error("Failed to increment event views:", error);
    }
}

export async function registerForEvent(eventId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser()

    if (userError) throw new Error(`Failed to get authenticated user ${userError.message}`);
    if (!user) {
        alert('Conecteaza-te')
        return
    }

    const { data, error } = await supabase
        .from('event_participants')
        .insert({
            event_id: eventId,
            participant_id: user.id,
        })
        .select()


    if (error) throw new Error(error.message);

    return data;
}

export async function getEventParticipantsCount(eventId: string): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase
        .from("event_participants")
        .select("*", { count: "exact", head: true })
        .eq("event_id", eventId);

    if (error) throw new Error(`Failed to get participants count: ${error.message}`);

    return count || 0;
}

export async function isUserRegistered(eventId: string): Promise<boolean> {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(`Failed to get authenticated user: ${userError.message}`);
    if (!user) return false;

    const { data, error } = await supabase
        .from("event_participants")
        .select("participant_id")
        .eq("event_id", eventId)
        .eq("participant_id", user.id)
        .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message); // ignore not found

    return !!data;
}

/**
 * Remove the current user from event participants
 */
export async function unregisterFromEvent(eventId: string) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(`Failed to get authenticated user: ${userError.message}`);
    if (!user) return;

    const { error } = await supabase
        .from("event_participants")
        .delete()
        .eq("event_id", eventId)
        .eq("participant_id", user.id);

    if (error) throw new Error(error.message);
}