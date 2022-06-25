const Home = () => {
    const { code, error, state } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // If 'error', user denied access etc.
    // Otherwise, use code to request token
    // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
    return <p>Home Page</p>
}

export default Home;