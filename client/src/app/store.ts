import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import playerReducer from '../features/player/playerSlice';
import artistInfoReducer from '../features/artistInfo/artistInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    artistInfo: artistInfoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
