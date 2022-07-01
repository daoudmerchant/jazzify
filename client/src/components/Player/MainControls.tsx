import { useContext } from "react";
import styled from "styled-components";

// icons
import backIcon from "../../assets/back-inkubators.png";
import nextIcon from "../../assets/next-inkubators.png"
import playIcon from "../../assets/play-freepik.png";
import pauseIcon from "../../assets/pause-inkubators.png";

import { PlayStateContext } from "../../pages/Main";

// types
import { PlayerState } from "../../pages/Main";

const PlayerButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-inline: 10px;
    align-items: center;
    flex-grow: 1;
    max-width: 170px;
`

const PlayerButton = styled.button`
    color: white;
`

const PlayerIcon = styled.img`
    max-height: ${(props: { $big: boolean }) => props.$big ? "45px" : "25px"};
    filter: invert(1);
    transition: .05s linear all;
    &:active {
        transform: scale(0.9);
        filter: invert(0.9)
    }
`

const MainControls = () => {
    const { paused, player } = useContext<PlayerState>(PlayStateContext)
    return (
        <PlayerButtonContainer>
            <PlayerButton onClick={() => player.previousTrack()}>
                <PlayerIcon src={backIcon} alt="previous track icon" $big={false} />
            </PlayerButton>
            <PlayerButton onClick={() => player.togglePlay()}>
                <PlayerIcon src={paused ? playIcon : pauseIcon} alt={`${paused ? "play" : "pause"} icon`} $big={true} />
            </PlayerButton>
            <PlayerButton onClick={() => player.nextTrack()}>
                <PlayerIcon src={nextIcon} alt="next track icon" $big={false} />
            </PlayerButton>
        </PlayerButtonContainer>
    )
}

export default MainControls;