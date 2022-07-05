import { useState } from "react";
import styled, { css } from "styled-components";

// redux
import { useAppSelector } from "../app/hooks";
import { selectSpotifyUser } from "../features/user/userSlice";
import { NavLink } from "react-router-dom"

// icons
import spotifyEmptyIcon from "../assets/otherIcons/spotify-empty-freepik.png";
import spotifyFullIcon from "../assets/otherIcons/spotify-full-freepik.png";

const Header = styled.header`
    background: linear-gradient(90deg, rgba(0,85,214,1) 0%, rgba(255,119,224,1) 57%, rgba(218,120,255,1) 94%);  
`

const NavElem = styled.nav`
    height: 100%;
    display: flex;
    padding-inline: 10px;
    align-items: center;
    background-color: white;
    mix-blend-mode: screen;
`

const Logo = styled(NavLink)`
    height: 75%;
    margin-right: auto;
    padding-inline: 10px;
    font-family: 'Monoton', cursive;
    font-size: 35px;
    color: black;
`

const LinkStyle = css`
    position: relative;
    height: 70%;
    margin-inline: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    border: 3px solid black;
    border-radius: 50%;
    overflow: hidden;
    &.active {
        background-color: black;
        opacity: .5;
        color: white;
    }
`

const MyLink = styled(NavLink)`
    ${LinkStyle}
`

const SignIn = styled.a`
    ${LinkStyle}
    padding: 0;
    border: 0;
    background-size: contain;
    background-image: url(${spotifyEmptyIcon});
    &.active {
        background-color: white;
        background-image: url(${spotifyFullIcon})
    }
`

const About = styled(MyLink)`
    font-size: 30px;
    font-weight: bold;
`

const UserIcon = styled.img`
    position: absolute;
    right: 17px;
    top: 13px;
    z-index: 100;
    height: 45px;
    width: 45px;
    border-radius: 50%;
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
                <About to="about">?</About>
                { !user
                    ? <SignIn href="http://localhost:3001/spotify/login" />
                    : <MyLink to="settings">
                        <UserInitial>{user.username.charAt(0).toUpperCase()}</UserInitial>
                    </MyLink>
                }
            </NavElem>
        </Header>
    )
}

export default Nav;