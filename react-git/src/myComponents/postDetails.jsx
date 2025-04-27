import {useParams,Link,useNavigate} from 'react-router-dom'
import {selectAllPosts} from '../storeApp/postSlice.js'
import {useSelector} from 'react-redux'
import Reactions from './reactions.jsx'
import {useDeletePostMutation} from '../storeApp/postSlice.js'
import { selectUserIds,selectAllUsers } from "../storeApp/userStore";


export default function PostDetails(){
const navigate=useNavigate()
const [DeletePost,{isLoading}]=useDeletePostMutation()
const {id}=useParams()
const post=useSelector(selectAllPosts)
const users=useSelector(selectAllUsers)
const renderedpost=post.find(post=>post.id===id)
const userid=useSelector(selectUserIds)
const outherId=userid.find(id=>id===id)

    let Author;
    if(outherId){ 
        Author=users[outherId].name
        }
        else{Author= renderedpost?renderedpost.author:'unknown Author'}
        
        if(!renderedpost){
            return(<h1>Post Deleted</h1>)}

    async function Delete(){
        if(!isLoading){
            try{DeletePost({id:renderedpost.id}).unwrap()
            navigate('/posts')}
            catch(error){
                console.log('failed to delete post',error)
            }}}
    
    return(
        <article className='detail'>
            <h2>{renderedpost.title}</h2>
            <p>{renderedpost.body}</p>
            <Reactions id={renderedpost.id} reaction={renderedpost.reactions}/>
            <p><span>...{Author}</span></p>
            <Link to={`/update/${renderedpost.id}`}><span>Edit</span></Link>
            <span onClick={()=>Delete()}
                className='Thunk'>Delete</span>
            
        </article>
    )
}
