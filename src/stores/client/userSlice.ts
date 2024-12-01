import { UserDetail } from "@/models/user";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null as UserDetail | null,
    reducers: {
        setUser: (_, action) => {
            return action.payload;
        },
        removeUser: (_) => {
            return null;
        },
    },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
