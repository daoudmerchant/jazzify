import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

import { cancelOnLoading } from "../featureHelpers";

interface Token {
  access_token: string,
  token_type: "Bearer",
  scope: string,
  expires_in: number,
  refresh_token: string
}

export interface UserState {
  token: Token | null,
  username: string | null,
  deviceId: string | null
  status: 'idle' | 'loading' | 'failed';
}

export interface TokenQuery {
  code: string,
  state: string
}

const defaultState = { token: null, username: null, deviceId: null, status: 'idle'}

export const getUserAccessToken = createAsyncThunk(
  'users/getAccessToken',
  async ({ code, state }: TokenQuery) => {
    const token = await userAPI.getNewToken({code, state});
    console.log(token.access_token.slice(0, 4));

    const username = await userAPI.getUsername(token.access_token);
    const loginState = {
      username,
      token: {
        ...token,
        expires: new Date().getTime() + (token.expires_in * 1000)
      }
    };
    window.localStorage.setItem('jazzify', JSON.stringify(loginState));
    return loginState;
  },
  cancelOnLoading("user")
)

export const initAccessToken = createAsyncThunk(
  'users/initAccessToken',
  async () => {
    console.log("INITIALISING")
    const priorStateString = window.localStorage.getItem('jazzify');
    if (!priorStateString) {
      console.log("NO PRIOR TOKEN")
      return null;
    }
    const priorState = JSON.parse(priorStateString);
    console.log(priorState)
    const needsRefresh = new Date().getTime() - new Date(priorState.token.expires).getTime();
    console.log(needsRefresh)
    if (needsRefresh < 0) {
      console.log("TOKEN STILL GOOD")
      console.log(priorState.token.access_token.slice(0, 4));
      return priorState;
    }
    console.log("NEED NEW TOKEN")
    // const newToken = await userAPI.getNewToken(priorState.token.refresh_token);
    // return {
    //   ...priorState,
    //   token: {
    //     ...priorState.token,
    //     ...newToken 
    //   }
    // }  
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
          const { token, username } = action.payload;
          console.log(username)
          state.token = token;
          state.username = username;
        })
        .addCase(getUserAccessToken.rejected, (state) => {
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
          const { username, token } = action.payload;
          state.username = username;
          state.token = token;
        })
        .addCase(initAccessToken.rejected, (state) => {
          state.status = 'failed';
      });
    }
  })

  export const selectUser = (state: { user: UserState, player: any }) => state.user;
  export const selectToken = (state: { user: UserState, player: any }) => state.user.token?.access_token

  export const { signOut } = userSlice.actions;
  
  export default userSlice.reducer;

// https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts