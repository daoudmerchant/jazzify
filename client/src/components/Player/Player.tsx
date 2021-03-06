import styled from "styled-components";

// hooks
import { useStaggered } from "../../app/hooks";

// types
import { Track } from "../../features/player/playerSlice";

// components
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import UserButtons from "./UserButtons";
import ArtistList from "./ArtistList";

interface Props {
    track: Track
}

const PlayerContainer = styled.section`
    position: absolute;
    bottom: 0;
    z-index: 200;
    height: ${(props: { $open: boolean }) => props.$open ? "100%" : "150px"};
    width: 100%;
    transition: .5s all;
    background: linear-gradient(153deg, rgba(1,1,1,1) 0%,
                                        rgba(143,143,143,1) 19%,
                                        rgba(73,73,73,1) 42%,
                                        rgba(0,0,0,1) 100%);
    overflow: hidden;
`

const PlayerSheen = styled.div`
    height: 100%;
    background: linear-gradient(0deg, #404040 0%,
                                      transparent 35%,
                                      transparent 65%,
                                      #404040 100%);
`

const PlayerFlexContainer = styled.div`
    position: absolute;
    height: 150px;
    width: 100%;
    padding: 20px;
    display: flex;
    bottom: ${(props: { $above: boolean}) => props.$above ? "0" : "auto"};
    & > * {
        &:first-child {
            height: 110px;
            width: 110px;
        }
        &:nth-child(2) {
            flex-grow: 1;
            min-width: 70px;
        }
        &:nth-child(3) {
            flex-grow: 1;
            min-width: 50px;
        }
    }
`

const AlbumPlaceholder = styled.div`
    box-shadow: -5px 5px 7px -3px #000;
    background-color: lightgrey;
`

const AlbumCover = styled.img`
    box-shadow: -5px 5px 7px -3px #000;
`

const Player = ({ track }: Props) => {
    const [{control, first, second}, setOpen] = useStaggered(350)
    const playing = Boolean(track.name.length)
    return (
        <PlayerContainer $open={first}>
            <PlayerSheen>
                <PlayerFlexContainer $above={false}>
                    {track.name
                        ? <AlbumCover src={track.albumCover} alt={`Album cover for ${track.name}`} />
                        : <AlbumPlaceholder />}
                    <TrackInfo open={second} track={track}/>
                </PlayerFlexContainer>
                <ArtistList open={second} id={track.id} />
                <PlayerFlexContainer $above={true}>
                    <Controls open={second} />
                    <UserButtons playing={playing} id={track.id} toggleOpen={() => setOpen(prev => !prev)} open={control} />
                </PlayerFlexContainer>
            </PlayerSheen>
        </PlayerContainer>
    )
}

export default Player;