import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoading: (state, action: { payload: boolean }) => {
            return state = action.payload;
        }
    }
})
export const { setLoading } = loadingSlice.actions;
export default loadingSlice;