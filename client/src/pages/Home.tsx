import { useState, useEffect } from "react";

interface Token {
    access_token: string,
    token_type: "Bearer",
    scope: string,
    expires_in: number
}

const Home = () => {
    const { code, state, error } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState<null | Token>(null)
    useEffect(() => {
        if (!code || token) {
            return;
        }
        const abortController = new AbortController();
        const fetchToken = async () => {
            const response = await fetch(
                `http://localhost:3001/spotify/callback?${new URLSearchParams({code, state})}`,
                { signal: abortController.signal }
            );
            const token = await response.json();
            console.log(token)
            setToken(token);
        }
        fetchToken()
        return () => {
            abortController.abort();
          };
    }, [code, state])

    if (loading) {
        return <p>Loading...</p>
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
    return <p>Home page (logged in, with token)</p>
}

export default Home;