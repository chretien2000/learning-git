import {UpdatePost} from '../storeApp/postSlice'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {selectAllPost}  from '../storeApp/postSlice'
import {useSelector,useDispatch} from 'react-redux'
import {selectAllUser} from '../storeApp/userStore'

export default function PostUpdate(){
    const {Id}=useParams()
     const navigate=useNavigate()
    const dispatch=useDispatch()
    const posts=useSelector(selectAllPost)
    const myPost=posts.posts.find(post=>post.id.toString()===Id)
    
    const author=useSelector(selectAllUser)
    const [data,setData]=useState(
                                  {title:myPost.title,
                                    author:'',
                                    body:myPost.body,
                                   id:Id})
    const AllAuthors=author.map(oth=><option key={oth.id}>{oth.name}</option>)
    function handleInput(e){
      setData(prev=>{
        return {...prev,[e.target.name]:e.target.value}})
    }
    function sub(e){
        e.preventDefault()
        dispatch(UpdatePost({title:data.title,
                             body:data.body,
                             author:data.outher,
                             id:Id})).unwrap()
        setData({title:'',
                 outher:'',
                 body:''})
                 navigate('/posts')}
    return(
        <form onSubmit={sub}>
            <label htmlFor="title">Title:</label>
         <input type='text' name='title'
               id='title' value={data.title}
               onChange={handleInput}/><br/>

        <label htmlFor="author">Author:</label>
         <select name='outher' value={data.outher}
         onChange={handleInput} id='author'>
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