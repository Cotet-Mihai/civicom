"use server"


export async function checkURLAccessible(url: string): Promise<boolean> {
    try {
        // HEAD este suficient pentru a verifica dacă site-ul există
        const res = await fetch(url, { method: "HEAD", redirect: "follow" });
        return res.ok;
    } catch {
        return false;
    }
}