import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {postAdded,} from '../storeApp/postSlice.js'
import {selectAllPost} from '../storeApp/postSlice.js'
import Article from './postArticle.jsx'

export default function Adding(){
  const dispatch=useDispatch() 
  const posts= useSelector(selectAllPost) 
  const [data,setData]=useState({title:'',
                                 content:'',
                                 author:''})

const canSave=[data.title,data.content,data.author].every(Boolean)
const currentPost=posts.posts.map(post=>{
return <Article key={post.id} post={post}/>} ) 
function handleChange(e){
    const {name,value}=e.target
    setData({...data,[name]:value})}

    function sendAddPost(){
        dispatch(postAdded(data.title,data.content,data.author))
       setData({title:'',content:'',author:''}) 
    }

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
            <option value="Chretien">Chretien</option>
            <option value="Jackson"> Jackson</option>
            <option value="Karangwa">Karangwa</option>
            </select> <br/>
   <label htmlFor="content">Add Content:</label>
        <input type='text' id='content'
               value={data.content}
               name='content' className='input'
               onChange={handleChange}/> <br/>
               <button disabled={!canSave} className='buts'>Save post</button>
 </form>

    </div>
    {currentPost}
    </>)
}