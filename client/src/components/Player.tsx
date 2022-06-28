import { Track } from "../pages/Main"

interface Props {
    track: Track,
    paused: boolean,
    togglePlay: () => void,
    next: () => void
}

const Player = ({ track, paused, togglePlay, next }: Props) => {
    return (
        <div className="container">
        <div className="main-wrapper">
            <img src={track.album.images[0].url} 
                className="now-playing__cover" alt="" />

            <div className="now-playing__side">
                <div className="now-playing__name">{
                            track.name
                            }</div>

                <div className="now-playing__artist">{
                            track.artists[0].name
                            }</div>
            </div>
        </div>
    <button onClick={togglePlay}>{paused ? "PLAY" : "PAUSE"}</button>
    <button onClick={next}>NEXT TRACK</button>
    </div>
    )
}

export default Player;