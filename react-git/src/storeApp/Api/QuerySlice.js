import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const mySlice=createApi({
    reducerPath:'jsonApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000'
    }),
    tagTypes:['post','user'],
    endpoints:(builder)=>({

    })
})