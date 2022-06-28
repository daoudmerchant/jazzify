import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import playerAPI from './playerAPI';

export interface PlayerState {
    device_id: string,
    status: 'idle' | 'loading' | 'failed';
}

export const playKurt = createAsyncThunk(
  'player/playKurt',
  // @ts-ignore
  async (_, { getState }) => {
  // @ts-ignore
    const { user, player } = getState();
    const response = await playerAPI.playKurt({ deviceId: player.device_id, accessToken: user.token.access_token});
    const data = await response.json();
    console.log(data)
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
        .addCase(playKurt.pending, (state) => {
          state.status = "loading"
        })
        .addCase(playKurt.fulfilled, (state) => {
          state.status = "idle"
        })
        .addCase(playKurt.rejected, (state) => {
          state.status = "failed"
        });
    }
  })

  export const selectPlayer = (state: any) => state.player;

  export const { setDeviceId } = playerSlice.actions;
  
  export default playerSlice.reducer;