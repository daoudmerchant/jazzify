import { TokenQuery } from "./userSlice";

const getNewToken = async ({ code, state }: TokenQuery) => {
    const response = await fetch(
        `http://localhost:3001/spotify/callback?${new URLSearchParams({code, state})}`
    );
    const token = await response.json();
    return token;
}

const refreshToken = async (refreshToken: string) => {
    const refreshResponse = await fetch(`http://localhost:3001/spotify/refresh?refreshToken=${refreshToken}`);
    const token = await refreshResponse.json();
    return token.access_token;
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
      const userData = await userResponse.json();
      return {
        username: userData.display_name,
        img: userData.images[0]?.url || null
      };
}

const getDevices = async (accessToken: string) => {
  const deviceResponse = await fetch(
    "https://api.spotify.com/v1/me/player/devices",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
  )
  return await deviceResponse.json();
}

export default { getNewToken,refreshToken, getUsername, getDevices }