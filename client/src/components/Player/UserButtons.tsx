import React from "react";
import styled from "styled-components";

// icons
import playlistIcon from "../../assets/playlist-rlkas-dzihab.png";
import upIcon from "../../assets/up-roundicons.png";

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

interface Props {
    toggleOpen: () => void,
    open: boolean
}

const UserButtons = ({toggleOpen, open}: Props) => {
    return (
        <UserButtonContainer>
            <Button>
                <ButtonIcon src={playlistIcon} alt="add to playlist icon"/>
            </Button>
            <Button onClick={toggleOpen}>
                <OpenIcon src={upIcon} alt="show more icon" $open={open}/>
            </Button>
        </UserButtonContainer>
    )
}

export default UserButtons;