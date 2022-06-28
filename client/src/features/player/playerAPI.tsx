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
        context_uri: "spotify:album:6ga60ZhJrOpJVRDu0ENrst",
        "offset": {
          "position": 5
        },
        "position_ms": 0
      })
    }
  )

export default { getDevices, playKurt }