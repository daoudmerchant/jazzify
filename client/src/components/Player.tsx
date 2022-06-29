import { Track } from "../pages/Main"
import styled, { css } from "styled-components";

import backIcon from "../assets/back-inkubators.png";
import nextIcon from "../assets/next-inkubators.png"
import playIcon from "../assets/play-freepik.png";
import pauseIcon from "../assets/pause-inkubators.png";

interface Props {
    track: Track,
    paused: boolean,
    player: any
}

const PlayerContainer = styled.section`
    background-color: black;
    color: white;
    display: flex;
    position: relative;
    padding: 20px;
`

const Album = css`
    flex-basis: 0;
    aspect-ratio: 1 / 1;
`

const AlbumPlaceholder = styled.div`
    ${Album}
    background-color: lightgrey;
`

const AlbumCover = styled.img`
    ${Album}
`

const PlayerButton = styled.button`
    border: none;
    background-color: transparent;
    color: white;
`

const PlayerIcon = styled.img`
    max-height: ${(props: { $big: boolean }) => props.$big ? "50px" : "20px"};
    filter: invert(1);
`

const Player = ({ track, paused, player }: Props) => {
    console.log(track);
    return (
        <PlayerContainer>
            {track.name
                ? <AlbumCover src={track.album.images[0].url} alt={`Album cover for ${track.name}`} />
                : <AlbumPlaceholder />}
            {/* <div className="player__track-name">{
                track.name
            }</div>

            <div className="player__artist">{
                track.artists[0].name
            }</div> */}
            <PlayerButton onClick={() => player.previousTrack()}>
                <PlayerIcon src={backIcon} alt="previous track icon" $big={false} />
            </PlayerButton>
            <PlayerButton onClick={() => player.togglePlay()}>
                <PlayerIcon src={paused ? playIcon : pauseIcon} alt={`${paused ? "play" : "pause"} icon`} $big={true} />
            </PlayerButton>
            <PlayerButton onClick={() => player.nextTrack()}>
                <PlayerIcon src={nextIcon} alt="next track icon" $big={false} />
            </PlayerButton>
        </PlayerContainer>
    )
}

export default Player;