import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import artistInfoAPI from './artistInfoAPI';

import { cancelOnLoading } from '../featureHelpers';

interface Artist {
    bio: string
}

interface ArtistDirectory {
    [key: string]: Artist
}

interface ArtistInfoState {
    artists: ArtistDirectory,
    status: 'idle' | 'loading' | 'failed';
}

export const getArtistBio = createAsyncThunk(
  'artistInfo/getArtistBio',
  // @ts-ignore
  async (name: string, { getState }) => {
    // @ts-ignore
    const { artistInfo } = getState()
    const artists = artistInfo.artists;
    const hasBio = Boolean(artists[name]);
    if (hasBio) {
        return artistInfo;
    }
    const bio = await artistInfoAPI.getBio(name);
    return {
        ...artists,
        [name]: bio
    }
  },
  cancelOnLoading('artistInfo')
)

export const artistInfoSlice = createSlice({
  name: 'player',
  initialState: { artists: {}, status: "idle"},
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtistBio.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getArtistBio.fulfilled, (state, action) => {
        state.status = "idle"
        state.artists = action.payload;
      })
      .addCase(getArtistBio.rejected, (state) => {
        state.status = "failed"
      });
  }
})

export const selectArtistInfo = (name: string) => (state: any) =>
  ({ status: state.artistInfo.status, thisArtist: state.artistInfo.artists[name]});

export default artistInfoSlice.reducer;