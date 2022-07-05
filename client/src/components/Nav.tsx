import { useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../app/hooks";
import { selectSpotifyUser } from "../features/user/userSlice";
import { NavLink } from "react-router-dom"

import spotifyEmptyIcon from "../assets/otherIcons/spotify-empty-freepik.png";
import spotifyFullIcon from "../assets/otherIcons/spotify-full-freepik.png";

const Header = styled.header`
background: linear-gradient(90deg, rgba(0,85,214,1) 0%, rgba(255,119,224,1) 57%, rgba(218,120,255,1) 94%);
`

const NavElem = styled.nav`
    a, a:visited {
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }
    height: 100%;
    display: flex;
    padding-inline: 10px;
    align-items: center;
    background-color: white;
    mix-blend-mode: screen;
`

const Logo = styled(NavLink)`
    font-family: 'Monoton', cursive;
    font-size: 35px;
    margin-right: auto;
    height: 75%;
    padding-inline: 10px;
    color: black;
`

const MyLink = styled(NavLink)`
    border: 3px solid black;
    height: 70%;
    margin-inline: 5px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    &.active {
        background-color: black;
        opacity: .5;
        color: white;
    }
`

const About = styled(MyLink)`
    font-size: 30px;
    font-weight: bold;
`

const Login = styled(MyLink)`
    border: 0;
    padding: 0;
    background-size: contain;
    background-image: url(${spotifyEmptyIcon});
    &.active {
        background-color: white;
        background-image: url(${spotifyFullIcon})
    }
`

const UserIcon = styled.img`
    position: absolute;
    z-index: 100;
    height: 100%;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    right: 17px;
    top: 13px;
    object-fit: cover;
    pointer-events: none;
`

const UserInitial = styled.p`
    margin: none;
    font-size: 30px;
`

const Nav = () => {
    const [imgFailed, setImgFailed] = useState(false);
    const handleImgError = () => setImgFailed(true);
    // @ts-ignore
    const user = useAppSelector(selectSpotifyUser);
    return (
        <Header>
            {user?.img && !imgFailed ? <UserIcon src={user.img} alt={`Profile pic for ${user.username}`} onError={handleImgError} /> : null}
            <NavElem>
                <Logo to="/">Jazzify</Logo>
                <About to="/about">?</About>
                { !user
                    ? <Login to="login" />
                    : <MyLink to="/settings">
                        <UserInitial>{user.username.charAt(0).toUpperCase()}</UserInitial>
                    </MyLink>
                }
            </NavElem>
        </Header>
    )
}

export default Nav;