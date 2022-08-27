import {configureStore} from '@reduxjs/toolkit';
import  movieReducers from './movies/movieSlice';
import authReducers from './auth/authSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducers,
        auth:authReducers
    },
})


