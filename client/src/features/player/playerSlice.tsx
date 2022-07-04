import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import playerAPI from './playerAPI';

import { cancelOnLoading } from '../featureHelpers';

export interface PlayerState {
  device_id: string,
  status: 'idle' | 'loading' | 'failed';
  tracks: [string],
  liked: [string];
}

export const playTracks = createAsyncThunk(
  'player/playTracks',
  // @ts-ignore
  async (instruments: [string], { getState }) => {
    // @ts-ignore
    const { user, player } = getState();
    const tracks = await playerAPI.playTracks({ deviceId: player.device_id, accessToken: user.token.access_token, instruments });
    return tracks;
  },
  cancelOnLoading('player')
)

export const toggleLiked = createAsyncThunk(
  'player/toggleLiked',
  // @ts-ignore
  async ({id, isLiked}: {id: string, isLiked: boolean}, { getState }) => {
    // @ts-ignore
    const { user, player } = getState();
    const liked = await playerAPI.toggleLiked({ accessToken: user.token.access_token, id, isLiked });
    return isLiked
      ? player.liked.filter((likedId: string) => likedId !== id)
      : [id, ...player.liked]
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: { device_id: null, status: "idle", tracks: [], liked: [] },
  reducers: {
    setDeviceId: (state, action) => {
      state.device_id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(playTracks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(playTracks.fulfilled, (state, action) => {
        state.status = "idle"
        state.tracks = action.payload;
      })
      .addCase(playTracks.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(toggleLiked.fulfilled, (state, action) => {
        state.liked = action.payload;
      })
      .addCase(toggleLiked.rejected, (state) => {
        state.status = "failed"
      });
  }
})

export const selectPlayer = (state: any) => state.player;
export const selectLiked = (state: any) => state.player.liked;

export const { setDeviceId } = playerSlice.actions;

export default playerSlice.reducer;