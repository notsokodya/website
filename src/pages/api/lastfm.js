import { tracks } from "@/utils/lastfm";

export function GET() {
    return new Response(JSON.stringify(tracks), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}