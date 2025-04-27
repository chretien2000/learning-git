import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import{mySlice} from './Api/QuerySlice.js'


export const store=configureStore({
    reducer:{
        [mySlice.reducerPath]:mySlice.reducer},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(mySlice.middleware)
})
setupListeners(store.dispatch)