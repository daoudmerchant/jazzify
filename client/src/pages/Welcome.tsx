import styled from "styled-components";

import spotifyFull from "../assets/otherIcons/spotify-full-freepik.png";

const WelcomeContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 25px;
`

const WelcomeCard = styled.div`
    height: 100%;
    border-style: solid;
    border-width: 4px;
    border-color: white white #5C33F6 #5C33F6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 40px;
`

const Logo = styled.h1`
    font-family: 'Monoton', cursive;
    font-size: 2.5em;
    color: #5C33F6;
`

const Subtitle = styled.h2`
    text-align: center;
    font-size: 1.3em;
    color: #5C33F6;
    opacity: .6;
`

const SignIn = styled.a`
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

const Icon = styled.img`
    height: 1.5em;
    margin-left: 10px;
`

const Welcome = () => {
    return (
        <WelcomeContainer>
            <WelcomeCard>
                <Logo>Jazzify</Logo>
                <Subtitle>The Spotify-powered jazz discovery app</Subtitle>
                <SignIn>
                    Sign in with Spotify
                    <Icon src={spotifyFull} alt="spotify logo"/>
                </SignIn>
            </WelcomeCard>
        </WelcomeContainer>
    )
}

export default Welcome;