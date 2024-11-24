import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        loading: loadingSlice.reducer,
        user: userSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;