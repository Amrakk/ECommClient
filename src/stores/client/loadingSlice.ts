import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: false,
    reducers: {
        setLoading: (_, action: { payload: boolean }) => {
            return action.payload;
        },
    },
});
export const { setLoading } = loadingSlice.actions;
export default loadingSlice;
