import {useUpdatePostMutation} from '../storeApp/postSlice'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {selectAllPosts}  from '../storeApp/postSlice'
import {useSelector} from 'react-redux'
import {selectAllUsers } from "../storeApp/userStore";

export default function PostUpdate(){
    const {Id}=useParams()
     const navigate=useNavigate()
     const [UpdatePost,{isLoading}]=useUpdatePostMutation()
    const posts=useSelector(selectAllPosts)
    const myPost=posts.find(post=>post.id.toString()===Id)
    const user=useSelector(selectAllUsers)
    const [data,setData]=useState(
                                  {title:myPost.title,
                                    auther:'',
                                    body:myPost.body,
                                   id:Id})
  const canSave=[data.title,data.body,data.auther].every(Boolean)&&!isLoading
    const AllAuthors=user.map(user=><option key={user.id}>{user.name}</option>)
    function handleInput(e){
      setData(prev=>{
        return {...prev,[e.target.name]:e.target.value}})
    }
    async function sub(e){
      console.log(canSave)
        e.preventDefault()
        if(canSave){
          try{
        await UpdatePost({id:Id,title:data.title,body:data.body,auther:data.auther}).unwrap() 
          }
          catch(error){
            console.log('failed to update post',error)
          }
        setData({title:'',
               auther:'',
               body:''})
        navigate('/posts')}
        }
        
    return(
        <form onSubmit={sub}>
            <label htmlFor="title">Title:</label>
         <input type='text' name='title'
               id='title' value={data.title}
               onChange={handleInput}/><br/>

        <label htmlFor="auther">Author:</label>
         <select name='auther' value={data.auther}
         onChange={handleInput} id='auther'>
          <option value=''> select Author</option>
          {AllAuthors} 
         </select><br/>

       <label htmlFor="content">Content:</label>
         <textarea  id="content" name='body' value={data.body}
         onChange={handleInput}></textarea><br/>
          <button type='submit' >Save</button>
        </form>
    )

}