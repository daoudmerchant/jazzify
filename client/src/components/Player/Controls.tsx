import styled, {css} from "styled-components";

// redux
import { useAppSelector } from "../../app/hooks";
import { selectPlayer } from "../../features/player/playerSlice";

// icons
import backIcon from "../../assets/playerIcons/back-inkubators.png";
import nextIcon from "../../assets/playerIcons/next-inkubators.png"
import playIcon from "../../assets/playerIcons/play-freepik.png";
import pauseIcon from "../../assets/playerIcons/pause-inkubators.png";
import curveLeft from "../../assets/playerIcons/curve-left-revicon.png";
import curveRight from "../../assets/playerIcons/curve-right-revicon.png";


const depressButton = (inverted: boolean) => css`
    &:active {
        transform: scale(0.9);
        filter: invert(0.${inverted ? "9" : "1"});
    }
`

const SkipButtonContainer = styled.div`
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SkipButton = styled.button`
    position: relative;
    transition: .3s all;
    color: white;
    opacity: ${(props: { $open: boolean}) => props.$open ? "1" : "0"};
    ${depressButton(false)}
`

const SkipText = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 0;
    font-size: 20px;
    transform: translate(-50%, -50%);
`

const Seconds = styled.span`
    font-size: 15px;
`

const PlayerButtonContainer = styled.div`
    padding-inline: 10px;
    max-width: 170px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
`

const PlayerIcon = styled.img`
    max-height: ${(props: { $big: boolean }) => props.$big ? "45px" : "25px"};
    filter: invert(1);
    transition: .05s linear all;
    ${depressButton(true)}
`

const Skip = () => <SkipText>10<Seconds>s</Seconds></SkipText>

interface Props {
    open: boolean
}

const Controls = ({open}: Props) => {
    const { paused, player } = useAppSelector(selectPlayer)
    const skip = async (isBack: boolean) => {
        const { duration, position } = await player.getCurrentState();
        const tenSecs = 1000 * 10;
        const move = isBack ? position - tenSecs : position + tenSecs;
        const newPosition = move < 0 ? 0 : move > duration ? duration : move;
        player.seek(newPosition);
    }
    return (
        <>
            <SkipButtonContainer>
                <SkipButton $open={open} disabled={!open} onClick={() => skip(true)}>
                    <PlayerIcon src={curveLeft} alt="skip back icon" $big={true} />
                    <Skip/>
                </SkipButton>
                <SkipButton $open={open} disabled={!open} onClick={() => skip(false)}>
                    <PlayerIcon src={curveRight} alt="skip forwards icon" $big={true} />
                    <Skip/>
                </SkipButton>
            </SkipButtonContainer>
            <PlayerButtonContainer>
                <button onClick={() => player.previousTrack()}>
                    <PlayerIcon src={backIcon} alt="previous track icon" $big={false} />
                </button>
                <button onClick={() => player.togglePlay()}>
                    <PlayerIcon src={paused ? playIcon : pauseIcon} alt={`${paused ? "play" : "pause"} icon`} $big={true} />
                </button>
                <button onClick={() => player.nextTrack()}>
                    <PlayerIcon src={nextIcon} alt="next track icon" $big={false} />
                </button>
            </PlayerButtonContainer>
        </>
    )
}

export default Controls;