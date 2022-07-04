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
  async (artistId: string, { getState }) => {
    // @ts-ignore
    const { artistInfo: artists } = getState()
    // @ts-ignore
    const hasBio = Boolean(artists[artistId]);
    if (hasBio) {
        return artists;
    }
    const bio = artistInfoAPI.getBio(artistId);
    return {
        ...artists,
        [artistId]: {
            bio
        }
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

export const selectArtist = (id: string) => (state: any) => state.artistInfo.artists[id];

// export const { setDeviceId } = playerSlice.actions;

export default artistInfoSlice.reducer;