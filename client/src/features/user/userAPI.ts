import { TokenQuery } from "./userSlice";

const getToken = async ({ code, state }: TokenQuery) => {
    const response = await fetch(
        `http://localhost:3001/spotify/callback?${new URLSearchParams({code, state})}`
    );
    return await response.json();
}

const getUsername = async (accessToken: string) => {
    const userResponse = await fetch(
        "https://api.spotify.com/v1/me",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }
      )
      const { display_name } = await userResponse.json();
      return display_name;
}

export default { getToken, getUsername }