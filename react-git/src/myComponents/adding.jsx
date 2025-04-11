import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {selectAllPost} from '../storeApp/postSlice.js'
import Article from './postArticle.jsx'
import {fetchPost} from '../storeApp/postSlice'

export default function Adding(){
  const dispatch=useDispatch() 
  const posts= useSelector(selectAllPost) 
                            
     
useEffect(()=>{
     if(posts.status==='idle'){
        dispatch(fetchPost())}
            },[posts.status])

let currentpost;
if(posts.status==='succeded'){
const sortedPost=posts.posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
currentpost=sortedPost.map(post=>{
    
return <Article key={post.id} post={post}/>} ) 
}
 
    return(<>
    {posts.status==='succeded'? currentpost:'Looading'}
    </>)
}