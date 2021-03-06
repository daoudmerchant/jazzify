import { useEffect } from "react";
import styled from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectPlayer, setPlayer, setPlayState } from "../features/player/playerSlice";
import { setDeviceId, setCurrentlyPlaying } from "../features/player/playerSlice";

import Player from "../components/Player/Player";
import Selection from "../components/Selection/Selection";

export interface PlayerState {
    paused: boolean,
    player: any,
}

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
    const { currentTrack, player } = useAppSelector(selectPlayer);
    useEffect(() => {
        if (!accessToken || player) {
            return;
        }
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
            dispatch(setPlayer(player));
            player.addListener('ready', ({ device_id }: { device_id: string }) => {
                dispatch(setDeviceId(device_id))
            });
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
                dispatch(setPlayState(state.paused));
            });
            player.connect();
        }
    }, [accessToken, player]);
    return (
        <MainContainer>
            <Selection />
            <Player track={currentTrack} />
        </MainContainer>
    )
}

export default Main;