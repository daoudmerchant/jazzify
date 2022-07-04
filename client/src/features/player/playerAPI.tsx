interface PostRequest {
  accessToken: string
}

interface TrackQuery extends PostRequest {
  deviceId: string,
  instruments: [string]
}

interface LikeQuery extends PostRequest {
  id: string
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

const toggleLiked = async ({accessToken, id}: LikeQuery) => {
  return await fetch(
    `https://api.spotify.com/v1/me/tracks?ids=${id}`,
    {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
  );
}

const playTracks = async ({deviceId, accessToken, instruments}: TrackQuery) => {
  let instrumentQuery = new URLSearchParams();
  instruments.forEach(instr => instrumentQuery.append('instruments', instr));
  const response = await fetch(`http://localhost:3001/api/tracks?${instrumentQuery.toString()}`);
  const tracks = await response.json();
  const uris = tracks.map(({uri}: {uri: string}) => `spotify:track:${uri}`);
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
        uris
      })
    }
  );
  return tracks;
}

export default { getDevices, playTracks, toggleLiked }