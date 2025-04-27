import {useSelector} from 'react-redux'
import {selectUsersById} from '../storeApp/userStore'
import {useParams,Link} from 'react-router-dom'
import {useGetPostByIdQuery} from '../storeApp/postSlice'

export default function UserPage(){
    const {userId}=useParams()
    const user=useSelector(state=>selectUsersById(state,userId))
    const {data:postForUser,isLoading,isSuccess,isError,error}=useGetPostByIdQuery(userId)
   let content;
   if(isLoading){
    content=<p>Loading...</p>
   }
   else if(isSuccess){
    console.log(postForUser)
    content=postForUser.ids.map(id=><Link to={`/posts/${id}`}
    key={id}><li>
        {postForUser?.entities?.[id].title.substring(0,30)}
    </li>
    </Link>)
   }
   else if(isError){
    content=<p>{error}</p>
   }
    return(
    <>
    <h2>{user?.name}</h2>
    <ol>{content}</ol>
    </>)
}