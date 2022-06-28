// @ts-nocheck sorry
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setDeviceId } from "../features/player/playerSlice";
import { playKurt } from "../features/player/playerSlice"

interface Props {
    accessToken: string,
}

interface Image {
    url: string
}

interface Album {
    images: [Image]
}

interface Artist {
    name: string
}

interface Track {
    name: string,
    album: Album
    artists: [Artist]
}

const Main = ({ accessToken }: Props) => {
    const dispatch = useAppDispatch();
    const [player, setPlayer] = useState(null);
    const [paused, setPaused] = useState(false);
    const [track, setTrack] = useState<Track>({
        name: "",
        album: {
            images: [
                { url: "" }
            ]
        },
        artists: [
            { name: "" }
        ]
    })

    useEffect(() => {
        // Have to initialise and store here because Redux reducers can't have side effects :(
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Jazzify',
                getOAuthToken: (cb: (token: string) => void) => cb(accessToken),
                volume: 0.5
            });

            setPlayer(player);
    
            player.addListener('ready', ({ device_id }: { device_id: string}) => {
                console.log('Ready with Device ID', device_id);
                dispatch(setDeviceId(device_id))
            });
    
            player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state: any) => { // sorry
                if (!state) {
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
            
            
                // player.getCurrentState().then( state => { 
                //     (!state)? setActive(false) : setActive(true) 
                // });
            
            });
            player.connect();
        }
    }, [])
    return (
        <div>
            <p>Home page (logged in, with token)</p>
            <button onClick={() => dispatch(playKurt())}>Play Kurt</button>
            <div className="container">
                <div className="main-wrapper">
                    <img src={track.album.images[0].url} 
                        className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                                    track.name
                                    }</div>

                        <div className="now-playing__artist">{
                                    track.artists[0].name
                                    }</div>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                player.togglePlay()
                }}>{paused ? "PLAY" : "PAUSE"}</button>
        </div>
    )
}

export default Main;