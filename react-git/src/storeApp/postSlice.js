import {createSlice,createAsyncThunk,createSelector} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import {sub} from 'date-fns'
import axios from 'axios'

const initialState={status:'idle',
    posts:[],error:null,count:0}
    const URL='https://jsonplaceholder.typicode.com/posts'
export const fetchPost=createAsyncThunk('fetchPost/post',async()=>{
    try{const response= await axios.get(URL)
    return response.data}
    catch(error){return error.message}
})

export const addNewPost=createAsyncThunk('add/post',async(PostToAdd)=>{
    try{const response= await axios.get(URL,PostToAdd)
    return response.data}
    catch(error){return error.message}
})

export const UpdatePost=createAsyncThunk('updatePost/post',async(postToUpdate)=>{
    const {id}=postToUpdate;
    try{
        const response=await axios.put(`${URL}/${id}`,postToUpdate)
        console.log(postToUpdate)
        return response.data
    }
    catch(error){return rejectWithValue(error.message) }
})  
export const DeletePost=createAsyncThunk('deletePost/post',async(postTodelete)=>{
    const {id}=postTodelete
    try{const resp=await axios.delete(`${URL}/${id}`)
     console.log(resp)     
    return {id}}
          catch(err){return err.message}
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
                            date:new Date().toISOString() }}
                            }
                        },
        postRemoved(state,action){
            const {id}=action.payload
            const poets= state.posts.filter(post=>post.id!==id)
            console.log(action.payload)
            state.posts=poets
            
        },
        addCount(state,action){
            state.count++
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
        .addCase(addNewPost.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.posts.push(action.payload)
        })
        .addCase(addNewPost.rejected,state=>{
            state.error=action.payload
        })
        .addCase(UpdatePost.fulfilled,(state,actions)=>{
            if(!actions.payload?.id){
                console.log('could not complete updade')
                console.log(actions.payload)
                return;
            }
            
            const {id}=actions.payload
            const postToUpdate=state.posts.find(post=>post.id===id)
            const filteredpost=state.posts.filter(post=>post.id!==id)
            state.posts=postToUpdate?[...filteredpost,{...actions.payload,date:new Date().toISOString(),
                reactions:{like:0,
                    love:0,
                    angry:0,
                    rocket:0}}]:state.posts
        })
        .addCase(DeletePost.fulfilled,(state,action)=>{
           console.log(action.payload)
            if(!action.payload?.id){
                console.log('unable to delete post')
                console.log(action.payload)
                return;
            }
            const {id}=action.payload
          state.posts=state.posts.filter(post=>post.id!==id)
        })
    }
       })

export const {postAdded,postRemoved,countReactions,addCount}=postSlice.actions
export const selectPost=(state)=>state.myPosts.posts
export const selectStatus=(state)=>state.myPosts.status
export const selectError=(state)=>state.myPosts.error
export const selectCount=(state)=>state.myPosts.count
export const selectAllPost=(state)=>state.myPosts
export const selectpostByUser=createSelector(
    [selectPost,(state,userId)=>userId],(posts,userId)=>{
        return posts.filter(post=>post.userId===userId)
    }
)

export default postSlice.reducer

