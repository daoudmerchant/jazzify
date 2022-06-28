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

const confirmPlaylist = async () => {
  // query user endpoint to check if Jazzify playlist exists
  // If not, create it
}

const playKurt = async ({deviceId, accessToken}: {deviceId: string, accessToken: string}) =>
  await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        uris: ["spotify:track:22MsyWQ5WFGv8GXP7qmzDP", "spotify:track:1kGQzSasZr4HY5CzjHqCPG"],
      })
    }
  )

export default { getDevices, playKurt }