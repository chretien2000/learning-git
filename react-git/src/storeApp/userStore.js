import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const URL='https://jsonplaceholder.typicode.com/users'

const initialState=[]
export const fetchUsers=createAsyncThunk('fetcUsers',async()=>{
    try{
        const response= await axios.get(URL)
        return response.data
    }
    catch(error){return error.message}
})
 
const UserPosts=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,actions)=>{
            //console.log(actions.payload)
           state.push(...actions.payload)
        })
    }

}
)

export const selectAllUser=(state)=>state.users
export default UserPosts.reducer;
