import { USER_ROLE } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";


interface UserData {
    _id: string;
    name: string;
    email: string;
    role: USER_ROLE;
    avatarUrl: string;
    cartId?: string;
}


const userSlice = createSlice({
    name: "user",
    initialState: null as UserData | null,
    reducers: {
        setUser: (state, action) => {
            return state = action.payload;
        },
        removeUser: (state) => {
            return state = null
        }
    }
})
export const { setUser, removeUser } = userSlice.actions;
export default userSlice;