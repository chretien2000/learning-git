import {useDispatch,useSelector} from 'react-redux'
import { postRemoved } from '../storeApp/postSlice'
import Reactions from './reactions'
import DateDisplay from './dateDisply.jsx'
import { selectAllUser } from '../storeApp/userStore.js'

export default function Article({post}){
const dispatch=useDispatch()
const users=useSelector(selectAllUser)
const outher=users.find(user=>user.id===post.id)
let Author;
if(outher){ 
    Author=outher.name
    }
    else{Author= post.author}
//const 
    return(
        <article className='post'>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className='author'><i>..{Author}</i> <span><DateDisplay date={post.date}/></span></p>
        <span onClick={()=>dispatch(postRemoved(post))}
        className='remove'>Delete</span>
        <Reactions id={post.id} reaction={post.reactions}/>
    </article>
    )
}