import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { getUserAccessToken, getUserDetails } from "../features/user/userSlice";

import Welcome from "./Welcome";
import Main from "./Main";
import Loading from "../components/Loading";

const Home = () => {
    const { code, state, error } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // @ts-ignore
    const { token, status, spotifyUser } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!code || status === 'loading') {
            return;
        }
        if (!token) {
            dispatch(getUserAccessToken({ code, state }))
            return;
        }
        if (!spotifyUser) {
            dispatch(getUserDetails(token.access_token))
        }
    }, [code, state, status, token, dispatch])
    if (status === "loading") {
        return <Loading/>;
    }
    if (error) {
        return <p>There was an error signing in: {error}</p>
    }
    if (!token) {
        return <Welcome/>
    }
    return <Main accessToken={token.access_token} />
}

export default Home;