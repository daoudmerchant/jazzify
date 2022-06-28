import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setDeviceId } from "../features/player/playerSlice";

interface Props {
    accessToken: string,
}

const Main = ({ accessToken }: Props) => {
    console.log(accessToken)
    const dispatch = useAppDispatch();
    const [player, setPlayer] = useState(null);
    useEffect(() => {
        // Have to initialise and store here because Redux reducers can't have side effects :(
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
        // @ts-ignore
            const player = new window.Spotify.Player({
                name: 'Jazzify',
                // @ts-ignore
                getOAuthToken: cb => cb(accessToken),
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
            player.connect();
        }
    }, [])
    return (
        <div>
        <p>Home page (logged in, with token)</p>
        <button>Play something</button>
    </div>
    )
}

export default Main;