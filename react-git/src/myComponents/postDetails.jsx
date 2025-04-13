import {useParams,Link,useNavigate} from 'react-router-dom'
import {selectAllPost} from '../storeApp/postSlice.js'
import {useSelector,useDispatch} from 'react-redux'
import Reactions from './reactions.jsx'
import { postRemoved } from '../storeApp/postSlice'
import {DeletePost} from '../storeApp/postSlice.js'
import {selectAllUser} from '../storeApp/userStore.js'


export default function PostDetails(){
const navigate=useNavigate()
const dispatch=useDispatch()
const {id}=useParams()
const post=useSelector(selectAllPost)
const renderedpost=post.posts.find(post=>post.id.toString()===id)

const users=useSelector(selectAllUser)
const outher=users.find(user=>user.id===Number(id))

    let Author;
    if(outher){ 
        Author=outher.name
        }
        else{Author= renderedpost?renderedpost.author:'unknown Author'}
        
        if(!renderedpost){
            return(<h1>Post Deleted</h1>)}

    function Delete(){
    dispatch(DeletePost({id:renderedpost.id}))
    navigate('/posts')}
    
    return(
        <article className='detail'>
            <h2>{renderedpost.title}</h2>
            <p>{renderedpost.body}</p>
            <Reactions id={renderedpost.id} reaction={renderedpost.reactions}/>
            <p><span>...{Author}</span></p>
            <span onClick={()=>dispatch(postRemoved(renderedpost))}
            className='remove'>Delete by reducer</span>
            <Link to={`/update/${renderedpost.id}`}><span>Edit</span></Link>
            <span onClick={()=>Delete()}
                className='Thunk'>Delete by Tunk</span>
            
        </article>
    )
}
