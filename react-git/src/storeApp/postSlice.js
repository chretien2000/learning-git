import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import {sub} from 'date-fns'
import axios from 'axios'

const initialState={status:'idle',
    posts:[],error:null}
    const URL='https://jsonplaceholder.typicode.com/posts'
export const fetchPost=createAsyncThunk('fetchPost/post',async()=>{
    try{const response= await axios.get(URL)
    return response.data}
    catch(error){return error.message}
})
const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        postAdded:{
         reducer(state,action){
                state.posts.push(action.payload) },
         prepare({title,body:content,author}){
                return {payload:{title,
                                body:content,
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
            //console.log(pos)
            pos.reactions[reaction]++
         }}
        },
    extraReducers(builder){
        builder.addCase(fetchPost.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchPost.fulfilled,(state,action)=>{
            state.status='succeded'
            const baseDate=new Date()
            let mins=5
            const posting=action.payload.map(post=>{
                    return {...post,reactions:{like:0,
                        love:0,
                         angry:0,
                          rocket:0},date:sub(baseDate,{minutes:mins++}).toISOString()}
            })
    
            state.posts=state.posts.concat(posting)
        }).addCase(fetchPost.rejected,(state,action)=>{
            state.status='failed',
            state.error=action.payload
        })
    }
       })

export const {postAdded,postRemoved,countReactions}=postSlice.actions
export const selectAllPost=(state)=>state.myPosts

export default postSlice.reducer