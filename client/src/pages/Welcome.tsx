import styled from "styled-components";

import SpotifyLink from "../components/SpotifyLink";

const WelcomeContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 25px;
`

const WelcomeCard = styled.div`
    height: 100%;
    padding-inline: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    border-width: 4px;
    border-color: white white #5C33F6 #5C33F6;
    border-radius: 10px;
`

const Logo = styled.h1`
    font-family: 'Monoton', cursive;
    font-size: 2.5em;
    color: #5C33F6;
`

const Subtitle = styled.h2`
    text-align: center;
    font-size: 1.4em;
    font-weight: normal;
    color: #5C33F6;
`

const Fallback = styled.p`
    color: #5C33F6;
    font-size: 1em;
    text-align: center;
    margin-bottom: .2em;
`

const YouTube = styled.a`
    border-bottom: 1px dashed black;
    color: black;
    &:visited {
        color: black;
    }
    padding: 0 .2em .2em;
    display: block;
`

const Welcome = () => {
    return (
        <WelcomeContainer>
            <WelcomeCard>
                <Logo>Jazzify</Logo>
                <Subtitle>The Spotify-powered jazz discovery app</Subtitle>
                <Fallback>No Spotify Premium?</Fallback>
                <YouTube href="https://www.youtube.com/watch?v=wkLdCrWnmng" target="_blank">Watch the video</YouTube>
                <SpotifyLink loggedIn={false} />
            </WelcomeCard>
        </WelcomeContainer>
    )
}

export default Welcome;