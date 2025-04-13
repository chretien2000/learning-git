import {useDispatch,useSelector} from 'react-redux'
import { postRemoved } from '../storeApp/postSlice'
import Reactions from './reactions'
import DateDisplay from './dateDisply.jsx'
import { selectAllUser } from '../storeApp/userStore.js'
import {Link} from 'react-router-dom'
export default function Article({post}){
const dispatch=useDispatch()
const users=useSelector(selectAllUser)
const outher=users.find(user=>user.id===post.id)
let Author;
if(outher){ 
    Author= post.author||outher.name
   }
    else{ Author= post.author}

    return(
        <Link to={`/posts/${post.id}`}
       className='link' >
    <article className='post' >
       
        <h2>{post.title.substring(0,40)}</h2>
        <p>{post.body.substring(0,50)}</p>
        <p className='author'><i>..{Author}</i> <span><DateDisplay date={post.date}/></span></p>
        <span onClick={()=>dispatch(postRemoved(post))}
        className='remove'>Delete</span>
        <Reactions id={post.id} reaction={post.reactions}/>
        
        
    </article>
    </Link>)
}