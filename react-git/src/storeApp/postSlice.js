import {createSlice,
    createAsyncThunk,
    createSelector,
createEntityAdapter} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid'
import {sub} from 'date-fns'
import axios from 'axios'

    const URL='https://jsonplaceholder.typicode.com/posts'
const postAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialState=postAdapter.getInitialState({status:'idle',
                                                error:null,count:0})
export const fetchPost=createAsyncThunk('fetchPost/post',async(_,{rejectWithValue})=>{
    try{const response= await axios.get(URL)
    return response.data}
    catch(error){return rejectWithValue(error.message||'Network error')}
})

export const addNewPost=createAsyncThunk('add/post',async(PostToAdd)=>{
    try{const response= await axios.post(URL,PostToAdd)
    return response.data}
    catch(error){return error.message}
})

export const UpdatePost=createAsyncThunk('updatePost/post',async(postToUpdate)=>{
    const {id}=postToUpdate;
    try{
        const response=await axios.put(`${URL}/${id}`,postToUpdate)
        return response.data
    }
    catch(error){return rejectWithValue(error.message) }
})  
export const DeletePost=createAsyncThunk('deletePost/post',async(postTodelete)=>{
    const {id}=postTodelete
    try{const resp=await axios.delete(`${URL}/${id}`)    
    return {id}}
          catch(err){return err.message}
})
const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{ 
        postRemoved(state,action){
            const {id}=action.payload
            const poets= state.posts.filter(post=>post.id!==id)
            console.log(action.payload)
            state.posts=poets
            
        },
        addCount(state){
            state.count++
        },
        countReactions(state,action){
            const {id,reaction}=action.payload
            const pos=state.entities[id] 
         if(pos){
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
            postAdapter.upsertMany(state,posting)
        }).addCase(fetchPost.rejected,(state,action)=>{
            state.status='failed',
            state.error=action.payload
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            action.payload.date=new Date().toISOString()
            action.payload.reactions={like:0,
                love:0,
                 angry:0,
                  rocket:0}
            postAdapter.upsertOne(state,action.payload)
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
            console.log(actions.payload)
        postAdapter.upsertOne(state,{...actions.payload,date:new Date().toISOString(),
            reactions:{like:0,
                love:0,
                angry:0,
                rocket:0}})
        })
        .addCase(DeletePost.fulfilled,(state,action)=>{
           console.log(action.payload)
            if(!action.payload?.id){
                console.log('unable to delete post')
                console.log(action.payload)
                return;
            }
            const {id}=action.payload
         postAdapter.removeOne(state,id)
        })
    }
       })

       export const {selectAll:selectAllPosts,
                     selectById:selectpostById,
                     selectIds:selectPostIds
       }=postAdapter.getSelectors(state=>state.myPosts)

export const {postAdded,postRemoved,countReactions,addCount}=postSlice.actions
export const selectStatus=(state)=>state.myPosts.status
export const selectError=(state)=>state.myPosts.error
export const selectCount=(state)=>state.myPosts.count
export const selectAllPost=(state)=>state.myPosts
export const selectpostByUser=createSelector(
    [selectAllPosts,(_,userId)=>userId],(posts,userId)=>{
        return posts.filter(post=>post.userId===userId)
    }
)

export default postSlice.reducer

