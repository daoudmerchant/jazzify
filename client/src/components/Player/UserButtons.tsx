import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLiked, toggleLiked } from "../../features/player/playerSlice"

// icons
import emptyHeartIcon from "../../assets/playerIcons/heart-empty-freepik.png";
import fullHeartIcon from "../../assets/playerIcons/heart-full-freepik.png";
import upIcon from "../../assets/playerIcons/up-roundicons.png";

const UserButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    flex: 1;
    background-color: white;
    mix-blend-mode: screen;
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
    playing: boolean
    id: string
}

const UserButtons = ({toggleOpen, open, playing, id}: Props) => {
    const dispatch = useAppDispatch();
    const isLiked = useAppSelector(selectLiked(id));
    return (
        <UserButtonContainer>
            <Button disabled={!playing} onClick={() => dispatch(toggleLiked({id, isLiked}))}>
                <ButtonIcon
                    src={isLiked ? fullHeartIcon : emptyHeartIcon}
                    alt={`${isLiked ? "add to" : "remove from"} playlist icon`}
                />
            </Button>
            <Button disabled={!playing} onClick={toggleOpen}>
                <OpenIcon src={upIcon} alt="show more icon" $open={open}/>
            </Button>
        </UserButtonContainer>
    )
}

export default UserButtons;