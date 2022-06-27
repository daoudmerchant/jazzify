import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

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
    status: 'idle' | 'loading' | 'failed';
}

export interface TokenQuery {
  code: string,
  state: string
}

const initialState: UserState = {
  token: null,
  username: null,
  status: 'idle'
}

export const getUserAccessToken = createAsyncThunk(
  'users/getAccessToken',
  async ({ code, state }: TokenQuery) => {
    const token = await userAPI.getToken({code, state});
    const username = await userAPI.getUsername(token.access_token);
    return { token, username };
  }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signOut: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserAccessToken.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(getUserAccessToken.fulfilled, (state, action) => {
          state.status = 'idle'
          const { token, username } = action.payload;
          state.token = token;
          state.username = username;
        })
        .addCase(getUserAccessToken.rejected, (state) => {
            state.status = 'failed';
        });
    }
  })

  export const selectUser = (state: { user: UserState}) => state.user;

  export const { signOut } = userSlice.actions;
  
  export default userSlice.reducer;

// https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts