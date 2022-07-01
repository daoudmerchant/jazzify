import React from "react";
import styled from "styled-components";

import { Track, Artist } from "../../pages/Main";


interface Props {
    track: Track
    open: boolean
}

const TrackInfoContainer = styled.div`
    color: white;
    height: 110px;
    display: grid;
    grid-template-rows: 60px 30px 20px;
    align-items: center;
    padding-inline: 10px;
    transition: .3s all;
    opacity: ${(props: { $open: boolean} ) => props.$open ? "1" : "0"};
`

const Name = styled.h2`
    font-size: 18px;
    overflow-wrap: anywhere;
    margin: 0;
`

const Artists = styled.p`
    font-size: 14px;
    margin: 0;
`

const Album = styled.p`
    font-size: 12px;
    margin: 0;
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