import {createSlice} from "@reduxjs/toolkit"

const userModel = {
    id: 1,
    username: "",
    password: "",
    refreshToken: ""
}

export const userSlice = createSlice({
    name: "users",
    initialState : {
        user: userModel
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserName: (state, action) => {
            state.user.username = action.payload;
        },
        setUserPassword: (state, action) => {
            state.user.password = action.payload;
        }
    }
});

export const userActions = userSlice.actions;