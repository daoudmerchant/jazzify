import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { Link } from "react-router-dom"

const Nav = () => {
    // @ts-ignore
    const { username } = useAppSelector(selectUser);
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                { username ? <Link to="/settings">{username}</Link> : <Link to="login">Login</Link>}
            </nav>
        </header>
    )
}

export default Nav;