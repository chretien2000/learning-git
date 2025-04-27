import { createEntityAdapter,createSelector
} from '@reduxjs/toolkit'
import{mySlice} from './Api/QuerySlice.js'
import {sub} from 'date-fns'

const userAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialUser=userAdapter.getInitialState()

export const extendedUser=mySlice.injectEndpoints({
    endpoints:(builder)=>({
        getUser:builder.query({
          query:()=>'/users',  
        transformResponse:responseData=>{
            let min=0
           const userToLoad= responseData.map(user=>{
            const myuser={...user,date:user?.date||sub(new Date(),{minutes:min++}).toISOString()}
            return myuser
           })
        return userAdapter.setAll(initialUser,userToLoad) },
        providesTags:(result,error,arg)=>[
            {type:'user',id:'list'},
            ...result.ids.map(id=>({type:'user',id}))
        ]
        }),
        getUserById:builder.query({
            query:(id)=>`/users/${id}`,
            transformResponse:responseData=>{
                const baseUser={...responseData,
                    date:responseData?.date||new Date().toISOString()}
                    return userAdapter.setAll(initialUser,[baseUser])
            },
            providesTags:(result,error,arg)=>[{type:'user',id:result.id}]
        }),
        AddUser:builder.mutation({
            query:(user)=>({
                url:'/users',
                method:'POST',
                body:{...user,date:user?.date||new Date().toISOString()}
            }),
            invalidatesTags:[{type:'user',id:'list'}]
        })
    })
})
export const {useGetUserQuery,useAddUserMutation,useGetUserByIdQuery}=extendedUser
const allUsers=extendedUser.endpoints.getUser.select()
export const userData=createSelector(
    allUsers,
    myusers=>myusers?.data
)
export const {selectAll:selectAllUsers,
             selectById:selectUsersById,
              selectIds:selectUserIds}=userAdapter.getSelectors(state=>userData(state)??initialUser)


