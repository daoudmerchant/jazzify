import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { Link } from "react-router-dom"

const Nav = () => {
    const { name } = useAppSelector(selectUser);
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                { name ? <p>{name}</p> : <Link to="login">Login</Link>}
            </nav>
        </header>
    )
}

export default Nav;