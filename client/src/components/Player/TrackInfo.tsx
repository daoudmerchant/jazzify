import styled from "styled-components";

import { Track, Artist } from "../../features/player/playerSlice";

interface Props {
    track: Track
    open: boolean
}

const TrackInfoContainer = styled.div`
    height: 110px;
    padding-inline: 10px;
    display: grid;
    grid-template-rows: 60px 30px 20px;
    align-items: center;
    color: white;
    transition: .3s all;
    opacity: ${(props: { $open: boolean} ) => props.$open ? "1" : "0"};
`

const Name = styled.h2`
    margin: 0;
    font-size: 18px;
    overflow-wrap: anywhere;
`

const Artists = styled.p`
    margin: 0;
    font-size: 14px;
`

const Album = styled.p`
    margin: 0;
    font-size: 12px;
`

const TrackInfo = ({track, open}: Props) => {
    return (
        <TrackInfoContainer $open={open}>
            <Name>{track.name}</Name>
            <Artists>{track.artists.map((artist: Artist) => artist.name).join(', ')}</Artists>
            <Album>{track.album.name}</Album>
        </TrackInfoContainer>
    )
}

export default TrackInfo;