import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/Apis/MovieApi";
import { Apikey } from "../../common/Apis/MovieApiKey";

export const fetcAsynchMovies = createAsyncThunk(
  "movies/fetchAsynMovies",
  async (term, { rejectWithValue }) => {
    try {
      const response = await movieApi
        .get(`?apikey=${Apikey}&s=${term}&type=movie`)
        .catch((err) => {
          rejectWithValue(err)
        });
    
      return response.data;
    } catch (error) {
     
      rejectWithValue(error);
    }
  }
);

export const fetcAsynchShows = createAsyncThunk(
  "movies/fetchAsynShows",
  async (term) => {
    const response = await movieApi
      .get(`?apikey=${Apikey}&s=${term}&type=series`)
      .catch((err) => {
        console.log("Err", err);
      });
    return response.data;
  }
);
export const fetcAsynchMovieOrShowDetails = createAsyncThunk(
  "movies/fetcAsynchMovieOrShowDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apikey=${Apikey}&i=${id}&plot=full`
      );
      return response.data;
    } catch (error) {

      rejectWithValue(error);
    }
  }
);

const initialState = {
  movies: {
    pending: "",
  },
  shows: {},
  selectedmovieorshow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectedmovieorshow = {};
    },
  },
  extraReducers: {
    [fetcAsynchMovies.pending]: (state, { payload }) => {
      state.movies.pending = "pending";
    },
    [fetcAsynchMovies.fulfilled]: (state, { payload }) => {
      console.log(" fetched successfully");
      return { ...state, movies: payload };
    },

    [fetcAsynchMovies.rejected]: () => {
      console.log("rejected");
    },
    //    fetching shows successfully

    [fetcAsynchShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload };
    },

    //   fecting movie or show details
    [fetcAsynchMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log(" fetched  movie or show successfully");
      return { ...state, selectedmovieorshow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedmovieorshow;
export default movieSlice.reducer;
