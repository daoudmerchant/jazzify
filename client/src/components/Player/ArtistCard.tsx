import { useEffect } from "react";
import styled from "styled-components"

// functions
import { useStaggered } from "../../app/hooks"

// redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectArtistInfo, getArtistBio } from "../../features/artistInfo/artistInfoSlice";

// types
import { ArtistFromDB } from "../../features/player/playerSlice"

import instrumentIcons from "../../assets/instrumentIcons"
import upIcon from "../../assets/playerIcons/up-roundicons.png";


const Card = styled.div`
    padding: .3em 1em;
    margin-inline: 1.5em;
    margin-bottom: 1em;
    border-radius: 10px;
    position: relative;
    height: min-content;
    color: white;
`

const ArtistHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Icon = styled.img`
    height: 35px;
    filter: invert(1);
    margin-right: 20px;
`

const Name = styled.p`
    margin: 0;
    font-size: 1.2em;
    font-weight: bold;
`

const OpenIcon = styled.img`
    transition: .4s all;
    height: 25px;
    margin-left: auto;
    filter: invert(1);
    transform: rotate(${(props: { $open: boolean }) => props.$open ? "0" : "180"}deg);
`

interface BiographyStyleProps {
    $open: boolean
    $visible: boolean
}

const Biography = styled.div`
    transition: .4s all;
    padding-top: 1em;
    font-size: ${(props: BiographyStyleProps) => props.$open ? ".8em" : "0"};
    opacity: ${(props: BiographyStyleProps) => props.$visible ? "1" : "0"};
`

interface Props {
    artist: ArtistFromDB
    open: boolean
}

const ArtistCard = ({artist, open}: Props) => {
    const dispatch = useAppDispatch();
    const [{ first, second, control }, setOpen] = useStaggered(350);
    const artistInfo = useAppSelector(selectArtistInfo);
    const thisArtist = artistInfo[artist.name];
    const icon = instrumentIcons.find(({name}: {name: string}) => name === artist.instrument) || { url: '', name: ''};
    useEffect(() => {
        if (!open) {
            setOpen(false);
        }
    }, [open])
    const handleOpen = () => {
        setOpen(prev => !prev);
        if (artistInfo[artist.name]) {
            return;
        }
        dispatch(getArtistBio(artist.name))
    }
    return (
        <Card onClick={handleOpen}>
            <ArtistHeader>
                <Icon src={icon.url} alt={icon.name}/>
                <Name>{artist.name}</Name>
                <OpenIcon $open={control} src={upIcon} alt={`${open ? "hide" : "show"} biography`}/>
            </ArtistHeader>
            <Biography $open={!open ? false : first} $visible={!open ? false : second}>{thisArtist?.bio || "..."}</Biography>
        </Card>
    )
}

export default ArtistCard;