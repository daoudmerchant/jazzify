import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import playerAPI from './playerAPI';

import { cancelOnLoading } from '../featureHelpers';

import { ObjectId } from 'mongodb';

export interface Album {
  name: string
  uri: string
}

export interface Artist {
  name: string
  uri: string
}

export interface Track {
  name: string
  id: string
  album: Album
  albumCover: string
  artists: Artist[]
}

export interface ArtistFromDB {
  name: string,
  instrument: string,
  _id: ObjectId
}

export interface TrackFromDB {
  _id: ObjectId
  uri: string,
  instruments: [string],
  artists: [ArtistFromDB]
}

export interface PlayerState {
  player: any,
  device_id: string,
  status: 'idle' | 'loading' | 'failed';
  tracks: [string],
  liked: [string],
  currentTrack: Track | null,
  paused: boolean
}

const DEFAULT_TRACK: Track = {
  name: "",
  id: '',
  album: {
      name: "",
      uri: ""
  },
  albumCover: "",
  artists: [{ name: "", uri: "" }]
}

const DEFAULT_STATE = {
  player: null,
  device_id: null,
  status: "uninitialised",
  tracks: [],
  liked: [],
  currentTrack: DEFAULT_TRACK,
  paused: false
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
    await playerAPI.toggleLiked({ accessToken: user.token.access_token, id, isLiked });
    return isLiked
      ? player.liked.filter((likedId: string) => likedId !== id)
      : [id, ...player.liked]
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: DEFAULT_STATE,
  reducers: {
    setDeviceId: (state, action) => {
      state.device_id = action.payload;
      state.status = "idle";
    },
    setCurrentlyPlaying: (state, action) => {
      state.currentTrack = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setPlayState: (state, action) => {
      state.paused = action.payload;
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
      .addCase(toggleLiked.pending, (state) => {
        state.status = "posting"
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
export const selectLiked = (id: string) => (state: any) => 
  state.player.liked.find((likedId: string) => likedId === id);
export const selectArtists = (id: string) => (state: any) =>
  state.player.tracks.find((track: TrackFromDB) => track.uri === id)?.artists || [];

export const { setDeviceId, setCurrentlyPlaying, setPlayer, setPlayState } = playerSlice.actions;

export default playerSlice.reducer;