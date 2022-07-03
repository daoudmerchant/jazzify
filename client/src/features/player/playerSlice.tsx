import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import playerAPI from './playerAPI';

export interface PlayerState {
  device_id: string,
  status: 'idle' | 'loading' | 'failed';
}

export const playTracks = createAsyncThunk(
  'player/playTracks',
  // @ts-ignore
  async (instruments: [string], { getState }) => {
    // @ts-ignore
    const { user, player } = getState();
    await playerAPI.playTracks({ deviceId: player.device_id, accessToken: user.token.access_token, instruments });
  },
  {
    condition: (_, { getState }) => {
      // @ts-ignore
      const { player: status } = getState()
      if (status === 'fulfilled' || status === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    },
  }
)

// TODO: Add backend

// export const playMatchingSongs = createAsyncThunk(
//   'player/playMatchingSongs',
//   // @ts-ignore
//   async (instruments: array, { getState }) => {
//     // Search my database for matching URIs
//     // Perform call to Spotify to start playing them
//   },
//   {
//     condition: (_, { getState }) => {
//       // @ts-ignore
//       const { player: status } = getState()
//       if (status === 'fulfilled' || status === 'loading') {
//         // Already fetched or in progress, don't need to re-fetch
//         return false
//       }
//     },
//   }
// )


export const playerSlice = createSlice({
  name: 'player',
  initialState: { device_id: null, status: "idle" },
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
      .addCase(playTracks.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(playTracks.rejected, (state) => {
        state.status = "failed"
      });
  }
})

export const selectPlayer = (state: any) => state.player;

export const { setDeviceId } = playerSlice.actions;

export default playerSlice.reducer;