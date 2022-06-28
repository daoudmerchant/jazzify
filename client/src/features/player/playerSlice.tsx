import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState } from "../user/userSlice";

interface PlayerState {
    device_id: string
}


// export const getUserAccessToken = createAsyncThunk(
//   'users/getAccessToken',
//   async ({ code, state }: TokenQuery) => {
//     const token = await userAPI.getToken({code, state});
//     const username = await userAPI.getUsername(token.access_token);
//     return { token, username };
//   }
// )

export const playerSlice = createSlice({
    name: 'player',
    initialState: { device_id: null },
    reducers: {
      setDeviceId: (state, action) => {
        state.device_id = action.payload
      }
    }
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(getUserAccessToken.pending, (state) => {
    //       state.status = 'loading'
    //     })
    //     .addCase(getUserAccessToken.fulfilled, (state, action) => {
    //       state.status = 'idle'
    //       const { token, username } = action.payload;
    //       state.token = token;
    //       state.username = username;
    //     })
    //     .addCase(getUserAccessToken.rejected, (state) => {
    //         state.status = 'failed';
    //     });
    // }
  })

  export const selectPlayer = (state: any) => state.player;

  export const { setDeviceId } = playerSlice.actions;
  
  export default playerSlice.reducer;