import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { getUserAccessToken } from "../features/user/userSlice";

const Home = () => {
    const { code, state, error } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const { token, status } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!code || status === 'loading' || token) {
            return;
        }
        dispatch(getUserAccessToken({ code, state })) // FIX: Dispatches twice in Strict Mode
    }, [code, state, status, dispatch])

    if (status === "loading") {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>There was an error signing in: {error}</p>
    }
    if (!code) {
        return <p>Home Page (not logged in)</p>
    }
    if (!token) {
        return <p>Home page (logged in but without access token)</p>
    }
    return (
    <div>
        <p>Home page (logged in, with token)</p>
        <button>Play something</button>
    </div>
    )
}

export default Home;