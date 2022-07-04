import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import { getUserAccessToken } from "../features/user/userSlice";

import Main from "./Main";
import Loading from "../components/Loading";

const Home = () => {
    const { code, state, error } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // @ts-ignore
    const { token, status } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!code || status === 'loading' || token) {
            return;
        }
        dispatch(getUserAccessToken({ code, state }))
    }, [code, state, status, token, dispatch])
    if (status === "loading") {
        return <Loading/>;
    }
    if (error) {
        return <p>There was an error signing in: {error}</p>
    }
    if (!token) {
        return <p>Home page (logged out)</p>
    }
    return <Main accessToken={token.access_token} />
}

export default Home;