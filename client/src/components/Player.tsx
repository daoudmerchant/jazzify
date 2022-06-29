import { Track } from "../pages/Main"
import styled, { css } from "styled-components";

import backIcon from "../assets/back-inkubators.png";
import nextIcon from "../assets/next-inkubators.png"
import playIcon from "../assets/play-freepik.png";
import pauseIcon from "../assets/pause-inkubators.png";
import playlistIcon from "../assets/playlist-rlkas-dzihab.png";

interface Props {
    track: Track,
    paused: boolean,
    player: any
}

const PlayerOuterContainer = styled.section`
    position: relative;
    background: linear-gradient(153deg, rgba(1,1,1,1) 0%,
                                        rgba(143,143,143,1) 19%,
                                        rgba(73,73,73,1) 42%,
                                        rgba(0,0,0,1) 100%);

`

const PlayerInnerContainer = styled.div`
    height: 100%;
    color: white;
    display: flex;
    position: relative;
    padding: 20px;
    background: linear-gradient(0deg, #404040 0%,
                                      transparent 15%,
                                      transparent 85%,
                                      #404040 100%);
`

const Album = css`
    flex-basis: 0;
    aspect-ratio: 1 / 1;
    box-shadow: -5px 5px 7px -3px #000;
`

const AlbumPlaceholder = styled.div`
    ${Album}
    background-color: lightgrey;
`

const AlbumCover = styled.img`
    ${Album}
`

const PlayerButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-inline: 10px;
    align-items: center;
    flex-grow: 1;
`

const buttonReset = css`
    border: none;
    background-color: transparent;
`

const PlayerButton = styled.button`
    ${buttonReset}
    color: white;
`

const PlayerIcon = styled.img`
    max-height: ${(props: { $big: boolean }) => props.$big ? "45px" : "25px"};
    filter: invert(1);
    transition: .1s linear all;
    &:active {
        transform: scale(0.9);
        filter: invert(0.9)
    }
`

const UserButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const Button = styled.button`
    ${buttonReset}
    background-color: white;
    mix-blend-mode: screen;
    flex: 1;
    border-radius: 18px;
    &:not(:first-child) {
        margin-top: 10px;
    }
    transition: .1s linear all;
    &:active {
        transform: scale(0.9);
        filter: invert(0.1)
    }
`

const ButtonIcon = styled.img`
    height: 30px;
`

const Player = ({ track, paused, player }: Props) => {
    console.log(track);
    return (
        <PlayerOuterContainer>
            <PlayerInnerContainer>
                {track.name
                    ? <AlbumCover src={track.albumCover} alt={`Album cover for ${track.name}`} />
                    : <AlbumPlaceholder />}
                {/* <div className="player__track-name">{
                    track.name
                }</div>

                <div className="player__artist">{
                    track.artists[0].name
                }</div> */}
                <PlayerButtonContainer>
                    <PlayerButton onClick={() => player.previousTrack()}>
                        <PlayerIcon src={backIcon} alt="previous track icon" $big={false} />
                    </PlayerButton>
                    <PlayerButton onClick={() => player.togglePlay()}>
                        <PlayerIcon src={paused ? playIcon : pauseIcon} alt={`${paused ? "play" : "pause"} icon`} $big={true} />
                    </PlayerButton>
                    <PlayerButton onClick={() => player.nextTrack()}>
                        <PlayerIcon src={nextIcon} alt="next track icon" $big={false} />
                    </PlayerButton>
                </PlayerButtonContainer>
                <UserButtonContainer>
                    <Button>
                        <ButtonIcon src={playlistIcon} alt="add to playlist icon"/>
                    </Button>
                    <Button>
                        <ButtonIcon src={playlistIcon} alt="add to playlist icon"/>
                    </Button>
                </UserButtonContainer>
            </PlayerInnerContainer>
        </PlayerOuterContainer>
    )
}

export default Player;