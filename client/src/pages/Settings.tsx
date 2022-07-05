import styled from "styled-components";
import SpotifyLink from "../components/SpotifyLink";

const SettingsContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 40px;
    color: #5C33F6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Settings = () => {
    return (
    <SettingsContainer>
        (Imagine a bunch of settings here)
        <SpotifyLink loggedIn={true}/>
    </SettingsContainer>
    )
}

export default Settings;