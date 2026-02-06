const USERNAME = import.meta.env.LASTFM_USERNAME;
const API_KEY = import.meta.env.LASTFM_API;

interface Track {
    name: string,
    artist: string,
    url: string,
    cover: string,
    loved: boolean,
    isPlaying: boolean,
    date: string
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
    },
    date: {
        uts: string
    }
}

export let tracks: (() => Track[]) | undefined;

if (API_KEY && USERNAME) {
    const fetchFM = async () => {
        const resp = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&limit=4&extended=1&format=json&api_key=${API_KEY}`, {
            headers: {
                "User-Agent": "notsokodya.ru Last.fm API (Astro)"
            }
        });
        const raw  = await resp.json();

        tracks = raw?.recenttracks?.track?.slice(0, 4).map((track: dataTrack) => {
            return {
                name: track.name,
                artist: track.artist.name,
                url: track.url,
                cover: (track.image.find((cover: any) => cover.size === "large") || track.image.pop())?.["#text"],
                loved: track.loved == 1,
                isPlaying: track["@attr"]?.nowplaying === "true",
                date: track.date ? track.date.uts : "nowplaying"
            }
        });
    }
    setInterval(fetchFM, 60000);
    setTimeout(fetchFM, 1500);
}