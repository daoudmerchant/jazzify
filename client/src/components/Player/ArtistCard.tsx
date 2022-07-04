import styled from "styled-components"

import { ArtistFromDB } from "../../features/player/playerSlice"
import instrumentIcons from "../../assets/instrumentIcons"

import { useStaggered } from "../../app/hooks"

const Card = styled.div`
    padding: .3em 1em;
    margin-inline: 1.5em;
    margin-bottom: 1em;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid white;
    box-shadow: -5px 5px 5px -3px #FFF;
    mix-blend-mode: screen;
    position: relative;
    height: min-content;
    color: white;
`

const ArtistInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Icon = styled.img`
    height: 40px;
    filter: invert(1)
`

const Name = styled.p`
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
`

interface BiographyStyleProps {
    $open: boolean
    $visible: boolean
}

const Biography = styled.div`
    transition: .35s all;
    height: ${(props: BiographyStyleProps) => props.$open ? "7em" : "0"};
    opacity: ${(props: BiographyStyleProps) => props.$visible ? "1" : "0"};

`

interface Props {
    artist: ArtistFromDB
    open: boolean
}

const ArtistCard = ({artist, open}: Props) => {
    const [{ first, second }, setOpen] = useStaggered(350);
    const icon = instrumentIcons.find(({name}: {name: string}) => name === artist.instrument) || { url: '', name: ''};
    return (
        <Card onClick={() => setOpen(prev => !prev)}>
            <ArtistInfo>
                <Icon src={icon.url} alt={icon.name}/>
                <Name>{artist.name}</Name>
            </ArtistInfo>
            <Biography $open={first} $visible={second}>Biography!</Biography>
        </Card>
    )
}

export default ArtistCard;