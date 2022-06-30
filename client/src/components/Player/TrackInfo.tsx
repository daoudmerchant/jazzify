import React from "react";
import styled from "styled-components";

import { Track, Artist } from "../../pages/Main";

interface Props {
    track: Track
}

const TrackInfoContainer = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Name = styled.h2`
    margin: 0;
`

const Artists = styled.p`
    margin: 0;
`

const Album = styled.p`
    margin: 0;
`

const TrackInfo = ({track}: Props) => {
    return (
        <TrackInfoContainer>
            <Name>{track.name}</Name>
            <Artists>{track.artists.map((artist: Artist) => artist.name).join(', ')}</Artists>
            <Album>{track.album.name}</Album>
        </TrackInfoContainer>
    )
}

export default TrackInfo;