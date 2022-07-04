import React, { useContext } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLiked, toggleLiked } from "../../features/player/playerSlice"



// icons
import emptyHeartIcon from "../../assets/playerIcons/heart-empty-freepik.png";
import fullHeartIcon from "../../assets/playerIcons/heart-full-freepik.png";
import upIcon from "../../assets/playerIcons/up-roundicons.png";

import { PlayStateContext } from "../../pages/Main";

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
    ready: boolean
    id: string
}

const UserButtons = ({toggleOpen, open, ready, id}: Props) => {
    const dispatch = useAppDispatch();
    const liked = useAppSelector(selectLiked);
    const isLiked = liked.find((likedId: string) => likedId === id);
    return (
        <UserButtonContainer>
            <Button disabled={!ready} onClick={() => dispatch(toggleLiked(id))}>
                <ButtonIcon
                    src={isLiked ? fullHeartIcon : emptyHeartIcon}
                    alt={`${isLiked ? "add to" : "remove from"} playlist icon`}
                />
            </Button>
            <Button onClick={toggleOpen} disabled={!ready}>
                <OpenIcon src={upIcon} alt="show more icon" $open={open}/>
            </Button>
        </UserButtonContainer>
    )
}

export default UserButtons;