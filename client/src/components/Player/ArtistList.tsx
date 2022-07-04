import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectTracks } from "../../features/player/playerSlice";

import { TrackFromDB, ArtistFromDB } from "../../features/player/playerSlice";

import ArtistCard from "./ArtistCard";

const ArtistContainer = styled.div`
    background-color: aliceblue;
    height: calc(100vh - 300px);
    position: relative;
    top: 150px;
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
            {currentArtists.map((artist: ArtistFromDB) => <ArtistCard key={artist._id.toString()} artist={artist}/>)}
        </ArtistContainer>
    )
}

export default ArtistList;