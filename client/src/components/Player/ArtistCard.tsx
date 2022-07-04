import styled from "styled-components"

import { ArtistFromDB } from "../../features/player/playerSlice"

const Name = styled.p`
    margin: 0;
`

interface Props {
    artist: ArtistFromDB
}

const ArtistCard = ({artist}: Props) => {
    return (
        <Name>{artist.name}</Name>
    )
}

export default ArtistCard;