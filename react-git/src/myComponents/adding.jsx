import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {selectPostIds,selectStatus,selectError} from '../storeApp/postSlice.js'
import Article from './postArticle.jsx'
import {fetchPost} from '../storeApp/postSlice'

export default function Adding(){
  const dispatch=useDispatch() 
  const orderedposts= useSelector(selectPostIds) 
  const status=useSelector(selectStatus)
  const error=useSelector(selectError)
  //const Allpost=useSelector(selectAllPosts)  
  //console.log(orderedposts)                    
     
useEffect(()=>{
     if(status==='idle'){
        dispatch(fetchPost())}
            },[status])

let currentpost;
if(status==='loading'){
  currentpost='loading'}
else if(status==='succeded'){
currentpost=orderedposts.map(postId=><Article key={postId} postId={postId}/> ) 
}
else if(status==='failed'){
  currentpost=<p>{error}</p>
}
 
    return(<>
    {currentpost}
    </>)
}