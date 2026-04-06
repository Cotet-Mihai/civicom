"use server";

import { createClient } from "@/lib/supabase/server";
import { createEvent, Event } from "@/app/(private)/creeaza/actions/createEvent";
import {
    Alternative,
    Brand,
    Contact,
    DataBasicInfo,
    DataBoycott, DataDefaultLocation,
    DataLogistics, DataMarchLocation, DataMedia
} from "@/app/(private)/creeaza/protest/types";

async function createEventBasicInfo({ event, dataBasicInfo }: { event: Event, dataBasicInfo: DataBasicInfo }) {
    const supabase = await createClient();

    const formatDate = (value: string | undefined) => {
        if (!value) return ;
        const date = new Date(value);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }

        return date.toISOString().split("T")[0];
    };

    const { error } = await supabase
        .from("event_basic_info")
        .insert([
            {
                event_id: event.id,
                title: dataBasicInfo.title,
                description: dataBasicInfo.description,
                protest_type: dataBasicInfo.type,
                date: formatDate(dataBasicInfo.date), // ✅ FIX
                from_time: dataBasicInfo.fromTime,     // deja bun
                to_time: dataBasicInfo.toTime,         // deja bun
            },
        ]);

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    return { success: true };
}

async function createLocations({ event, dataBasicInfo, dataMarchLocation, dataBoycotts, dataDefaultLocation }: { event: Event, dataBasicInfo: DataBasicInfo, dataMarchLocation: DataMarchLocation, dataBoycotts: DataBoycott, dataDefaultLocation: DataDefaultLocation }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('event_locations')
        .insert([
            {
                event_id: event.id,
                type: dataBasicInfo.type
            }
        ])
        .select()

    if (error) throw new Error(error.message);

    const location_id = data[0].id

    switch (dataBasicInfo.type) {
        default:
            await createLocationsPoints({location_id, dataDefaultLocation})
            break

        case 'march':
            await createLocationsRoutes({location_id, dataMarchLocation})
            break

        case 'boycott':
            await createEventBoycotts({ event, dataBoycotts })
            break
    }

    return { success: true };
}

async function createLocationsPoints({ location_id, dataDefaultLocation }: { location_id: string, dataDefaultLocation: DataDefaultLocation}) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('event_location_points')
        .insert([
            {
                location_id: location_id,
                lat: dataDefaultLocation.lat,
                lng: dataDefaultLocation.lng
            }
        ])

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    return { success: true };
}

async function createLocationsRoutes({ location_id, dataMarchLocation }: { location_id: string, dataMarchLocation: DataMarchLocation}) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('event_location_points')
        .insert([
            {
                location_id: location_id,
                points: dataMarchLocation.polylines
            }
        ])

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    return { success: true };
}

async function createEventBoycotts({ event, dataBoycotts }: { event: Event; dataBoycotts: DataBoycott }) {
    const supabase = await createClient();

    // Creează alternative pentru un brand
    async function createBoycottAlternatives(brand_id: string, alternatives: Alternative[]) {
        if (!alternatives || alternatives.length === 0) return;
        const { error } = await supabase
            .from("boycott_alternatives")
            .insert(alternatives.map(alternative => ({
                brand_id: brand_id,
                name: alternative.name,
                link: alternative.link,
                reason: alternative.reason,
            })));
        if (error) throw new Error(error.message);
    }

    // Creează un brand și apoi alternativele sale
    async function createBoycottBrand(boycott_id: string, brand: Brand) {
        const { data, error } = await supabase
            .from("boycott_brands")
            .insert([
                {
                    boycott_id: boycott_id,
                    name: brand.name,
                    link: brand.link
                }
                ])
            .select();

        if (error) throw new Error(error.message);

        const brand_id = data[0].id;
        await createBoycottAlternatives(brand_id, brand.alternatives);
    }

    // Creează boycott-ul
    const { data, error } = await supabase
        .from("event_boycotts")
        .insert([
            {
                event_id: event.id,
                reason: dataBoycotts.reason,
                method: dataBoycotts.method
            }
            ])
        .select();

    if (error) throw new Error(error.message);

    const boycott_id = data[0].id;

    // Creează toate brandurile și alternativele lor
    await Promise.all(dataBoycotts.brands.map(brand => createBoycottBrand(boycott_id, brand)));

    return { success: true };
}

async function createEventBanner({ event, banner }: { event: Event, banner: File }) {
    const supabase = await createClient();

    const filePath = `events/${event.id}/banner-${Date.now()}-${banner.name}`;

    const { error } = await supabase.storage
        .from("banners")
        .upload(filePath, banner);

    if (error) {
        console.error("Banner upload error:", error);
        throw new Error(error.message);
    }

    return filePath;
}

async function createEventGallery({ event, gallery }: { event: Event, gallery: File[] }) {
    if (gallery.length === 0) return [];

    const supabase = await createClient();

    const uploadPromises = gallery.map((file, index) => {
        const filePath = `events/${event.id}/gallery-${Date.now()}-${index}-${file.name}`;

        return supabase.storage
            .from("banners")
            .upload(filePath, file)
            .then(({ error }) => {
                if (error) throw new Error(error.message);
                return filePath;
            });
    });

    return await Promise.all(uploadPromises);
}

async function createEventMedia({ event, dataMedia }: { event: Event; dataMedia: DataMedia }) {
    const supabase = await createClient();

    if (!dataMedia.banner) {
        throw new Error("Banner is required");
    }

    // 1️⃣ Upload banner
    const bannerPath = await createEventBanner({
        event,
        banner: dataMedia.banner,
    });

    // 2️⃣ Insert banner in event_media
    const { error: bannerError } = await supabase
        .from("event_media")
        .insert([
            {
                event_id: event.id,
                type: "banner",
                url: bannerPath,
            },
        ]);

    if (bannerError) throw new Error(bannerError.message);

    // 3️⃣ Upload gallery files
    const galleryPaths = await createEventGallery({
        event,
        gallery: dataMedia.gallery,
    });

    // 4️⃣ Insert gallery images in event_media
    if (galleryPaths.length > 0) {
        const { error: galleryError } = await supabase
            .from("event_media")
            .insert(
                galleryPaths.map((path) => ({
                    event_id: event.id,
                    type: "gallery",
                    url: path,
                }))
            );

        if (galleryError) throw new Error(galleryError.message);
    }

    return {
        success: true,
        bannerPath,
        galleryPaths,
    };
}

async function createEventContacts({ event, dataContacts }: { event: Event; dataContacts: Contact[] }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('event_contacts')
        .insert(dataContacts.map((contact) => ({
                event_id: event.id,
                first_name: contact.firstName,
                last_name: contact.lastName,
                email: contact.mail
            }
        )))

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    return { success: true };
}

async function createEventLogistics({ event, dataLogistics }: { event: Event; dataLogistics: DataLogistics }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('event_logistics')
        .insert([
            {
                event_id: event.id,
                is_limited: dataLogistics.isLimited,
                max_participants: dataLogistics.isLimited ? dataLogistics.participants : 0,
                rules: dataLogistics.safetyRules,
                equipment: dataLogistics.equipment
            }
        ])

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    const dataContacts = dataLogistics.contacts

    await createEventContacts({ event, dataContacts })

    return { success: true };
}



export async function createProtest(
    dataBasicInfo: DataBasicInfo,
    dataGathering: DataDefaultLocation,
    dataMarchLocation: DataMarchLocation,
    dataPicketLocation: DataDefaultLocation,
    dataBoycotts: DataBoycott,
    dataMedia: DataMedia,
    dataLogistics: DataLogistics
): Promise<Event> {
    const { event } = await createEvent("protest");

    await createEventBasicInfo({ event, dataBasicInfo });

    if (dataBasicInfo.type === 'gathering') {
        await createLocations( {event, dataBasicInfo, dataMarchLocation, dataBoycotts, dataDefaultLocation: dataGathering })
    } else {
        await createLocations( {event, dataBasicInfo, dataMarchLocation, dataBoycotts, dataDefaultLocation: dataPicketLocation })
    }

    await createEventMedia({ event, dataMedia });

    await createEventLogistics({ event, dataLogistics})

    return event;
}