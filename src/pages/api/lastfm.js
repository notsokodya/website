import { tracks } from "@/utils/lastfm";

export const prerender = false;

export const GET = async () => {
    if (!tracks) {
        return new Response(null, {status: 503})
    }

    return new Response(JSON.stringify(tracks), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}