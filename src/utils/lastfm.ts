const USERNAME = import.meta.env.LASTFM_USERNAME;
const API_KEY = import.meta.env.LASTFM_API;

interface Track {
    name: string,
    artist: string,
    url: string,
    cover: string,
    loved: boolean,
    isPlaying: boolean
}

interface dataTrack {
    name: string,
    url: string,
    loved: number,
    artist: {
        name: string
    },
    image: [],
    "@attr": {
        nowplaying: string
    }
}

export let tracks: (() => Track[]) | undefined;

if (API_KEY && USERNAME) {
    setInterval(async () => {
        const resp = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&limit=4&extended=1&format=json&api_key=${API_KEY}`, {
            headers: {
                "User-Agent": "notsokodya.ru Last.fm API (Astro)"
            }
        });
        const raw  = await resp.json();

        tracks = raw.recenttracks.track.map((track: dataTrack) => {
            return {
                name: track.name,
                artist: track.artist.name,
                url: track.url,
                cover: track.image.find((cover: any) => cover.size === "extralarge")?.["#text"],
                loved: track.loved == 1,
                isPlaying: track["@attr"]?.nowplaying === "true"
            }
        });

        console.log("!")
    }, 60000);
}