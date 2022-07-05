import styled from "styled-components";

// redux
import { useAppSelector } from "../../app/hooks";
import { selectArtists } from "../../features/player/playerSlice";

// types
import { ArtistFromDB } from "../../features/player/playerSlice";

// components
import ArtistCard from "./ArtistCard";

const ArtistContainer = styled.div`
    position: relative;
    top: calc(150px + 1.5em);
    height: calc(100vh - 320px);
    overflow-y: scroll;
    transition: .3s all;
    opacity: ${(props: {$open: boolean}) => props.$open ? "1" : "0"};
`

interface Props {
    open: boolean
    id: string
}

const ArtistList = ({open, id}: Props) => {
    const artists = useAppSelector(selectArtists(id))
    return (
        <ArtistContainer $open={open}>
            {artists.map((artist: ArtistFromDB) => <ArtistCard open={open} key={artist._id.toString()} artist={artist}/>)}
        </ArtistContainer>
    )
}

export default ArtistList;