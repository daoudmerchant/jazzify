import styled, {css} from "styled-components"

import { useAppDispatch } from "../app/hooks";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../features/user/userSlice";

import spotifyFull from "../assets/otherIcons/spotify-full-freepik.png";

const Action = css`
    background-color: white;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: 3em;
    padding: 1em 1.5em;
    border-radius: 1.5em;
    border-style: solid;
    border-width: 4px;
    border-color: #5C33F6 #5C33F6 white white;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    if (loggedIn) {
    return (
        <SignOut onClick={() => {
            // @ts-ignore
            dispatch(signOut())
            navigate('/')
        }}>
            Sign out
            <Icon src={spotifyFull} alt="spotify logo"/>
        </SignOut>
    )
    };
    return (
        <SignIn href="http://localhost:3001/spotify/login">
            Sign in with Spotify
            <Icon src={spotifyFull} alt="spotify logo"/>
        </SignIn>
    )
}


export default SpotifyLink;