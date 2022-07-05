import { useEffect, useState, createContext } from "react";
import styled from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCurrentTrack } from "../features/player/playerSlice";
import { setDeviceId, setCurrentlyPlaying } from "../features/player/playerSlice";

import Player from "../components/Player/Player";
import Selection from "../components/Selection/Selection";

import { Track } from "../features/player/playerSlice";

export interface PlayerState {
    paused: boolean,
    player: any,
}

export const PlayStateContext = createContext<PlayerState>({ paused: false, player: {} });

interface Props {
    accessToken: string,
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
    const track = useAppSelector(selectCurrentTrack)
    useEffect(() => {
        if (!accessToken || player) {
            return;
        }
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
            player.addListener('ready', ({ device_id }: { device_id: string }) => {
                dispatch(setDeviceId(device_id))
            });
            // player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            //     console.log('Device ID has gone offline', device_id);
            // });
            player.addListener('player_state_changed', (state: any) => { // sorry
                if (!state) {
                    return;
                }
                const currentTrack = state.track_window.current_track;
                const parsedTrack = {
                    name: currentTrack.name,
                    id: currentTrack.id,
                    album: {
                        name: currentTrack.album.name,
                        uri: currentTrack.album.uri,
                    },
                    albumCover: currentTrack.album.images[0].url,
                    artists: currentTrack.artists
                }
                dispatch(setCurrentlyPlaying(parsedTrack))
                setPaused(state.paused);
            });
            player.connect();
        }
    }, [accessToken, player]);
    return (
        <MainContainer>
            <Selection />
            {/*
            // @ts-ignore */}
            <PlayStateContext.Provider value={{ paused, player }}>
                <Player track={track} />
            </PlayStateContext.Provider>
        </MainContainer>
    )
}

export default Main;