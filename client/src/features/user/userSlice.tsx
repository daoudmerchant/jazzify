import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Token {
  access_token: string,
  token_type: "Bearer",
  scope: string,
  expires_in: number,
  refresh_token: string
}

export interface UserState {
  token: Token | null,
  name: string | null,
    status: 'idle' | 'loading' | 'failed';
}

interface TokenQuery {
  code: string,
  state: string
}

const initialState: UserState = {
  token: null,
  name: null,
  status: 'idle'
}

export const getUserAccessToken = createAsyncThunk(
  'users/getAccessToken',
  async ({ code, state }: TokenQuery) => {
    const tokenResponse = await fetch(
        `http://localhost:3001/spotify/callback?${new URLSearchParams({code, state})}`
    );
    const token = await tokenResponse.json();
    const userResponse = await fetch(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        }
      }
    )
    const { display_name } = await userResponse.json();
    return { token, name: display_name }
  }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      // reducers
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserAccessToken.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(getUserAccessToken.fulfilled, (state, action) => {
          state.status = 'idle'
          const { token, name } = action.payload;
          state.token = token;
          state.name = name;
        })
        .addCase(getUserAccessToken.rejected, (state) => {
            state.status = 'failed';
        });
    }
  })

  export const selectUser = (state: { user: UserState}) => state.user;
  
  export default userSlice.reducer;

// https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts