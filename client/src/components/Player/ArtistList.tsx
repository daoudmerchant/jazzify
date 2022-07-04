import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectArtists } from "../../features/player/playerSlice";

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
    const artists = useAppSelector(selectArtists(id))
    return (
        <ArtistContainer $open={open}>
            {artists}
        </ArtistContainer>
    )
}

export default ArtistList;