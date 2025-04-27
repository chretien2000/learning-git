import {useEffect} from 'react';
import {useSelector} from 'react-redux'
import {selectPostIds,useGetPostQuery} from '../storeApp/postSlice.js'
import Article from './postArticle.jsx'

export default function Adding(){
  const orderedposts= useSelector(selectPostIds) 
const {data:posts,isLoading,isSuccess,isError,error}=useGetPostQuery()
                      
     
let currentpost;
if(isLoading){
  currentpost='loading'}
else if(isSuccess){
currentpost=orderedposts.map(postId=><Article key={postId} postId={postId}/> ) 
}
else if(isError){
  currentpost=<p>{error}</p>
}
 
    return(<>
    {currentpost}
    </>)
}