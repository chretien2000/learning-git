import {configureStore} from '@reduxjs/toolkit'
import postReducer from './postSlice'
import userReducer from './userStore'
export const store=configureStore({
    reducer:{
        myPosts:postReducer,
        users:userReducer
    }
})