import {useState} from 'react';
import {useSelector} from 'react-redux'
import {useAddnewPostMutation} from '../storeApp/postSlice.js'
import {selectAllUsers } from "../storeApp/userStore";

export default function Actions(){
    const [data,setData]=useState({title:'',
                                   content:'',
                                   author:''})
const [addNewPost,{isLoading}]=useAddnewPostMutation() 
      const myUsers=useSelector(selectAllUsers)  
                                  
    const AuthorList=myUsers.map(user=> <option key={user.id}
        alue={user.name}>{user.name}</option>)
        
    const canSave=[data.title,data.content,data.author].every(Boolean)&&!isLoading
    function handleChange(e){
        const {name,value}=e.target
        setData({...data,[name]:value})}

    async function sendAddPost(e){
        e.preventDefault()
        if(canSave){
            try{addNewPost({title:data.title,body:data.content,author:data.author}).unwrap()
            setData({title:'',content:'',author:''})}
            catch(error){
                console.log('failed to save post',error)
            }}
         }

        return(<>

            <div className='input-container'>
                <h3>Add Post</h3>
        <form onSubmit={(e)=>sendAddPost(e)}>
            
            <label htmlFor="title">Add title:</label>
                <input type='text' id='title'
                       value={data.title}
                       name='title' className='input'
                       onChange={handleChange}/> <br/> 
            <label htmlFor="author">select Author:</label>
                <select name="author" id="author"
                value={data.author} className='input'
                onChange={handleChange}>
                    <option value=""></option>
                    {AuthorList}
                    </select> <br/>
           <label htmlFor="content">Add Content:</label>
                <input type='text' id='content'
                       value={data.content}
                       name='content' className='input'
                       onChange={handleChange}/> <br/>
                       <button disabled={!canSave} className='buts'>Save post</button>
         </form>
            </div>
            </>)
        }
