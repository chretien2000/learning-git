import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import {sub} from 'date-fns'

const initialState={status:'idle',
    posts:[],error:null}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        postAdded:{
         reducer(state,action){
                state.posts.push(action.payload) },
         prepare(title,content,author){
                return {payload:{title,
                                content,
                                author,
                                id:nanoid(),
                                reactions:{like:0,
                                        love:0,
                                        angry:0,
                                        rocket:0
                            },
                            date:new Date().toISOString()
                        
                        }}
                            }
                        },
        postRemoved(state,action){
            const {id}=action.payload
            const poets= state.posts.filter(post=>post.id!==id)
            console.log(poets)
            state.posts=poets
            
        },
        countReactions(state,action){
            const {id,reaction}=action.payload
            const pos=state.posts.find(post=>post.id===id) 
            
         if(pos){
            console.log(pos)
            pos.reactions[reaction]++
         }}
        }
})
export const {postAdded,postRemoved,countReactions}=postSlice.actions
export const selectAllPost=(state)=>state.myPosts
export default postSlice.reducer