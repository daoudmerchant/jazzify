import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    name: string
}

export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'failed';
  }

const initialState: UserState = {
    user: null,
    status: 'idle'
  }

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (id: string) => {
    // TODO: Replace with real database query
    console.log("Fetching user " + id)
    await new Promise((res) => setTimeout(res, 1000));
    return {
      name: "Jim Jones",
    };
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
        .addCase(fetchUserById.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          console.log(state.user);
          state.status = 'idle'
          state.user = action.payload;
        })
        .addCase(fetchUserById.rejected, (state) => {
            state.status = 'failed';
        });
    }
  })

  export const selectUser = (state: UserState) => state.user;
  
  export default userSlice.reducer;

// https://github.com/reduxjs/cra-template-redux-typescript/blob/master/template/src/features/counter/counterSlice.ts