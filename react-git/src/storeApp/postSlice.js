import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'

const initialState={status:'idle',
    posts:[],error:null}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        postAdded:{
         reducer(state,action){
                state.posts.push(action.payload)},
         prepare(title,content,author){
                return {payload:{title,
                                content,
                                author,
                                id:nanoid()}}
                            }
                        },
        postRemoved(state,action){
            const {id}=action.payload
            const poets= state.posts.filter(post=>post.id!==id)
            state.posts=poets
        }
                    }


})
export const {postAdded,postRemoved}=postSlice.actions
export const selectAllPost=(state)=>state.myPosts
export default postSlice.reducer