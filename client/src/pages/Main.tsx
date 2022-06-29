import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import Player from "../components/Player";
import { setDeviceId } from "../features/player/playerSlice";
import { playKurt } from "../features/player/playerSlice"

interface Props {
    accessToken: string,
}

interface Album {
    name: string
    uri: string
}

interface Artist {
    name: string
    uri: string
}

export interface Track {
    name: string
    album: Album
    albumCover: string
    artists: Artist[]
}

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 150px;
    height: 100%;
`

const Main = ({ accessToken }: Props) => {
    const dispatch = useAppDispatch();
    const [player, setPlayer] = useState(null);
    const [paused, setPaused] = useState(false);
    const [track, setTrack] = useState<Track>({
        name: "",
        album: {
            name: "",
            uri: ""
        },
        albumCover: "",
        artists: [{ name: "", uri: ""}]
    })

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
                const currentTrack = state.track_window.current_track;
                setTrack({
                    name: currentTrack.name,
                    album: {
                        name: currentTrack.album.name,
                        uri: currentTrack.album.uri,
                    },
                    albumCover: currentTrack.album.images[0].url,
                    artists: currentTrack.artists
                })
                setPaused(state.paused);
                // player.getCurrentState().then( state => { 
                //     (!state)? setActive(false) : setActive(true) 
                // }),
            });
            player.connect();
        }
    }, []) // eslint-disable-line
    return (
        <MainContainer>
            <section>
                <p>Home page (logged in, with token)</p>
                <button onClick={() => dispatch(playKurt())}>Play Kurt</button>
            </section>
            {/*
            // @ts-ignore */}
            <Player track={track} paused={paused} player={player}/>
        </MainContainer>
    )
}

export default Main;