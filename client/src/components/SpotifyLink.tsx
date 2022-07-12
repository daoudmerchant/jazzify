import styled, {css} from "styled-components"

// redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../features/user/userSlice";
import { selectPlayer } from "../features/player/playerSlice";

// icons
import spotifyFull from "../assets/otherIcons/spotify-full-freepik.png";

const Action = css`
    margin-top: auto;
    margin-bottom: 3em;
    padding: .5em 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5em;
    font-weight: bold;
    border-radius: 1.5em;
    border-style: solid;
    border-width: 4px;
    border-color: #5C33F6 #5C33F6 white white;
    background-color: white;
`

const SignIn = styled.a`
    ${Action}
`

const SignOut = styled.button`
    ${Action}
`

const Icon = styled.img`
    height: 1.5em;
    margin-left: 10px;
`

interface Props {
    loggedIn: boolean
}

const SpotifyLink = ({loggedIn}: Props) => {
    const { player } = useAppSelector(selectPlayer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    if (loggedIn) {
        return (
            <SignOut onClick={async () => {
                // @ts-ignore
                await player.pause()
                dispatch(signOut())
                navigate('/')
            }}>
                Sign out
                <Icon src={spotifyFull} alt="spotify logo"/>
            </SignOut>
        )
    };
    return (
        <SignIn href="/spotify/login">
            Sign in
            <Icon src={spotifyFull} alt="spotify logo"/>
        </SignIn>
    )
}


export default SpotifyLink;