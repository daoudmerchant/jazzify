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
      const userData = await userResponse.json();
      console.log(userData)
      return userData.display_name;
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

export default { getToken, getUsername, getDevices }