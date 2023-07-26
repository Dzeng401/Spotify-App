import {createSlice, configureStore} from '@reduxjs/toolkit'
import {userSlice} from './userslice.js'


const store = configureStore({
    reducer: {users: userSlice.reducer}
});

export default store;