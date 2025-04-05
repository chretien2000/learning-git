import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {postAdded,postRemoved} from '../storeApp/postSlice.js'
import {selectAllPost} from '../storeApp/postSlice.js'

export default function Adding(){
  const dispatch=useDispatch() 
  const posts= useSelector(selectAllPost) 
  const [data,setData]=useState({title:'',
                                 content:'',
                                 author:''})
function Removing(){

}


const currentPost=posts.posts.map(post=><div className='post'
key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <p className='author'><i>{post.author}</i></p>
    <span onClick={()=>dispatch(postRemoved(post))}
    className='remove'>remove post</span>
</div>) 

function handleChange(e){
    const {name,value}=e.target
    setData({...data,[name]:value})}

    function handleAddPost(){
        dispatch(postAdded(data.title,data.content,data.author))
    }

    return(<>

    <div>
        <h3>Add Post</h3>
<form onSubmit={(e)=>{
            e.preventDefault(),handleAddPost()}}>
    
    <label htmlFor="title">Add title:</label>
        <input type='text' id='title'
               value={data.title}
               name='title'
               onChange={handleChange}/>  
    <label htmlFor="author">select Author:</label>
        <select name="author" id="author"
        value={data.author}
        onChange={handleChange}>
            <option value=""></option>
            <option value="Chretien">Chretien</option>
            <option value="Jackson"> Jackson</option>
            <option value="Karangwa">Karangwa</option>
            </select> 
   <label htmlFor="content">Add Content:</label>
        <input type='text' id='content'
               value={data.content}
               name='content'
               onChange={handleChange}/> 
               <button>Save post</button>
 </form>

    </div>
    {currentPost}
    </>)
}