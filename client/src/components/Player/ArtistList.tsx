import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectTracks } from "../../features/player/playerSlice";

import { TrackFromDB, ArtistFromDB } from "../../features/player/playerSlice";

import ArtistCard from "./ArtistCard";

const ArtistContainer = styled.div`
    height: calc(100vh - 320px);
    overflow-y: scroll;
    position: relative;
    top: calc(150px + 1.5em);
    transition: .3s all;
    opacity: ${(props: {$open: boolean}) => props.$open ? "1" : "0"};
`

interface Props {
    open: boolean
    id: string
}

const ArtistList = ({open, id}: Props) => {
    const tracks = useAppSelector(selectTracks)
    const currentArtists = tracks.find((track: TrackFromDB) => track.uri === id)?.artists || [];
    return (
        <ArtistContainer $open={open}>
            {currentArtists.map((artist: ArtistFromDB) => <ArtistCard open={open} key={artist._id.toString()} artist={artist}/>)}
        </ArtistContainer>
    )
}

export default ArtistList;