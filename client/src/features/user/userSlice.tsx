import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

import { cancelOnLoading, getExpiry } from "../featureHelpers";

interface Token {
  access_token: string,
  token_type: "Bearer",
  scope: string,
  expires_in: number,
  refresh_token: string
}

interface SpotifyUser {
  username: string
  img: string | null
}

export interface UserState {
  token: Token | null,
  spotifyUser: SpotifyUser | null,
  deviceId: string | null
  status: 'idle' | 'loading' | 'failed';
}

export interface TokenQuery {
  code: string,
  state: string
}

const defaultState = { token: null, spotifyUser: null, deviceId: null, status: 'idle'}

// export const getUserAccessToken = createAsyncThunk(
//   'users/getAccessToken',
//   async ({ code, state }: TokenQuery) => {
//     const token = await userAPI.getNewToken({code, state});
//     const spotifyUser = await userAPI.getUsername(token.access_token);
//     const loginState = {
//       spotifyUser,
//       token: {
//         ...token,
//         expires: getExpiry(token.expires_in)
//       }
//     };
//     return loginState;
//   },
//   cancelOnLoading("user")
// )

export const getUserAccessToken = createAsyncThunk(
    'users/getAccessToken',
    async ({ code, state }: TokenQuery) => {
      const token = await userAPI.getNewToken({code, state});
      return {
          ...token,
          expires: getExpiry(token.expires_in)
        }
    },
    cancelOnLoading("user")
  )

export const getUserDetails = createAsyncThunk(
  'users/getUserDetails',
  async (accessToken: string, { getState }) => {
    // @ts-ignore
    const { user } = getState();
    const spotifyUser = await userAPI.getUsername(accessToken);
    const userState = { token: user.token, spotifyUser }
    window.localStorage.setItem('jazzify', JSON.stringify(userState));
    return spotifyUser;
  },
  cancelOnLoading("user")
)

export const initAccessToken = createAsyncThunk(
  'users/initAccessToken',
  async () => {
    const priorStateString = window.localStorage.getItem('jazzify');
    if (!priorStateString) {
      return null;
    }
    const priorState = JSON.parse(priorStateString);
    const needsRefresh = new Date().getTime() - priorState.token.expires;
    if (needsRefresh < 0) {
      return priorState;
    }
    const newToken = await userAPI.refreshToken(priorState.token.refresh_token);
    const newState = {
      ...priorState,
      token: {
        ...newToken,
        expires: getExpiry(newToken.expires_in)
      }
    }
    window.localStorage.setItem('jazzify', JSON.stringify(newState));
    return newState;
  },
  cancelOnLoading("user")
)

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    signOut: () => {
      window.localStorage.removeItem('jazzify');
      return defaultState;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccessToken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserAccessToken.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload;
      })
      .addCase(getUserAccessToken.rejected, (state) => {
          state.status = 'failed';
      })
      .addCase(getUserDetails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = 'idle'
        // @ts-ignore
        state.spotifyUser = action.payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
          state.status = 'failed';
      })
      .addCase(initAccessToken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initAccessToken.fulfilled, (state, action) => {
        state.status = 'idle';
        if (!action.payload) {
          return;
        }
        const { spotifyUser, token } = action.payload;
        state.spotifyUser = spotifyUser;
        state.token = token;
      })
      .addCase(initAccessToken.rejected, (state) => {
        state.status = 'failed';
    });
  }
})

export const selectUser = (state: { user: UserState, player: any }) => state.user;
export const selectToken = (state: { user: UserState, player: any }) => state.user.token?.access_token
export const selectSpotifyUser = (state: { user: UserState, player: any }) => state.user.spotifyUser

export const { signOut } = userSlice.actions;

export default userSlice.reducer;