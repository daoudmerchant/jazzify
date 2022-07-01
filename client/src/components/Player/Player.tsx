import { useState } from "react";
import styled, { css } from "styled-components";

// hooks
import { useStaggered } from "../../app/hooks";

// types
import { Track } from "../../pages/Main"

// icons
import playlistIcon from "../../assets/playlist-rlkas-dzihab.png";
import upIcon from "../../assets/up-roundicons.png";

// components
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";

interface Props {
    track: Track,
    player: any
}

const PlayerContainer = styled.section`
    position: absolute;
    bottom: 0;
    transition: .5s all;
    background: linear-gradient(153deg, rgba(1,1,1,1) 0%,
                                        rgba(143,143,143,1) 19%,
                                        rgba(73,73,73,1) 42%,
                                        rgba(0,0,0,1) 100%);
    height: ${(props: { $open: boolean }) => props.$open ? "100vh" : "150px"};
    width: 100%;
`

const PlayerSheen = styled.div`
    height: 100%;
    background: linear-gradient(0deg, #404040 0%,
                                      transparent 35%,
                                      transparent 65%,
                                      #404040 100%);
`

const PlayerFlexContainer = styled.div`
    height: 150px;
    width: 100%;
    display: flex;
    position: absolute;
    padding: 20px;
    bottom: ${(props: { $above: boolean}) => props.$above ? "0" : "auto"};
    & > * {
        &:first-child {
            height: 110px;
            width: 110px;
        }
        &:nth-child(2) {
            flex-grow: 1;
            min-width: 70px;
        }
        &:nth-child(3) {
            flex-grow: 1;
            min-width: 50px;
        }
    }
`

const AlbumPlaceholder = styled.div`
    box-shadow: -5px 5px 7px -3px #000;
    background-color: lightgrey;
`

const AlbumCover = styled.img`
    box-shadow: -5px 5px 7px -3px #000;
`

const UserButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    background-color: white;
    mix-blend-mode: screen;
    flex: 1;
    border-radius: 18px;
    &:not(:first-child) {
        margin-top: 10px;
    }
    transition: .1s linear all;
    &:active {
        transform: scale(0.9);
        filter: invert(0.1)
    }
`

const ButtonIcon = styled.img`
    height: 30px;
`

const OpenIcon = styled(ButtonIcon)`
    transition: .4s all;
    transform: rotate(${(props: { $open: boolean }) => props.$open ? "180" : "0"}deg);
`

const Player = ({ track }: Props) => {
    const [{open, first, second}, setOpen] = useStaggered(350)
    return (
        <PlayerContainer $open={first}>
            <PlayerSheen>
                <PlayerFlexContainer $above={false}>
                    {track.name
                        ? <AlbumCover src={track.albumCover} alt={`Album cover for ${track.name}`} />
                        : <AlbumPlaceholder />}
                    <TrackInfo open={second} track={track}/>
                </PlayerFlexContainer>
                <PlayerFlexContainer $above={true}>
                    <Controls open={second} />
                    <UserButtonContainer>
                        <Button>
                            <ButtonIcon src={playlistIcon} alt="add to playlist icon"/>
                        </Button>
                        <Button onClick={() => setOpen(prev => !prev)}>
                            <OpenIcon src={upIcon} alt="show more icon" $open={open}/>
                        </Button>
                    </UserButtonContainer>
                </PlayerFlexContainer>
            </PlayerSheen>
        </PlayerContainer>
    )
}

export default Player;