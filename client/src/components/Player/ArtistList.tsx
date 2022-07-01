import styled from "styled-components";

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
}

const ArtistList = ({open}: Props) => {
    return (
        <ArtistContainer $open={open}/>
    )
}

export default ArtistList;