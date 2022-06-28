import { Track } from "../pages/Main"

interface Props {
    track: Track,
    paused: boolean,
    togglePlay: () => void,
    next: () => void
}

const Player = ({ track, paused, togglePlay, next }: Props) => {
    return (
        <div className="player">
            <img src={track.album.images[0].url}
                className="player__cover" alt="" />

            <div className="player__track-name">{
                track.name
            }</div>

            <div className="player__artist">{
                track.artists[0].name
            }</div>
            <button onClick={togglePlay}>{paused ? "PLAY" : "PAUSE"}</button>
            <button onClick={next}>NEXT TRACK</button>
        </div>
    )
}

export default Player;