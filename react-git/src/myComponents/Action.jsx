import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {postAdded,} from '../storeApp/postSlice.js'
import { selectAllUser } from '../storeApp/userStore.js'

export default function Actions(){
    const dispatch=useDispatch() 
    const [data,setData]=useState({title:'',
                                   content:'',
                                   author:''}) 
                                     
    const users=useSelector(selectAllUser)
    const AuthorList=users.map(user=><option key={user.id}
                                value={user.name}>{user.name}</option>)
                
    const canSave=[data.title,data.content,data.author].every(Boolean)
    function handleChange(e){
        const {name,value}=e.target
        setData({...data,[name]:value})}

    function sendAddPost(){
        dispatch(postAdded({title:data.title,body:data.content,author:data.author}))
        setData({title:'',content:'',author:''}) }

        return(<>

            <div className='input-container'>
                <h3>Add Post</h3>
        <form onSubmit={(e)=>{
                    e.preventDefault(),sendAddPost()}}>
            
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
