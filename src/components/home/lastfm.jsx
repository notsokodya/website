import { useEffect, useState } from "react";

export default function LastFM({className, ...props}) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrack = async () => {
            setLoading(true);
            setTracks([]);

            const data = await fetch("/api/lastfm");
            const tracksData = await data?.json();

            setTracks(tracksData || []);
            setLoading(false);
        }

        fetchTrack();
        setInterval(fetchTrack, 60000);
    }, [])

    return <>
        <ul className={className} {...props}>
            {tracks.map((track) => {
                return <li key={track.date}>
                    <a className="track" href={track.url} {...props}>
                        <img width="160px" height="160px" src={track.cover} {...props}/>
                        <div class="meta" {...props}>
                            <strong className="title" {...props}>{track.name}</strong>
                            <span className="artist" {...props}>{track.artist}</span>
                            <span className="icons" {...props}>
                                {track.isPlaying ? <span className="playing" title="Now Playing" {...props}>▶</span> : ""}
                                {track.loved ? <span className="loved" title="Loved" {...props}>❤</span> : ""}
                            </span>
                        </div>
                    </a>
                </li>
            })}
        </ul>
    </>
}