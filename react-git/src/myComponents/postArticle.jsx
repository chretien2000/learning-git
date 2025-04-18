import {useDispatch,useSelector} from 'react-redux'
import { postRemoved,selectpostById } from '../storeApp/postSlice'
import Reactions from './reactions'
import DateDisplay from './dateDisply.jsx'
import { selectAllUser } from '../storeApp/userStore.js'
import {Link} from 'react-router-dom'
export default function Article({postId}){
const dispatch=useDispatch()
const users=useSelector(selectAllUser)
const exactpost=useSelector(state=>selectpostById(state,postId))
const outher=users.find(user=>user.id===exactpost.userId)
let Author;
if(outher){ 
    Author= outher.name
   }
    else{ Author= exactpost.author}

    return(
    <article className='post' >
       
        <h2>{exactpost.title.substring(0,40)}</h2>
        <p>{exactpost.body.substring(0,50)}</p>
        <p className='author'><i>..{Author}</i> <span><DateDisplay date={exactpost.date}/></span></p>
        <span onClick={()=>dispatch(postRemoved(exactpost))}
        className='remove'>Delete</span>
        <Reactions id={exactpost.id} reaction={exactpost.reactions}/> 
        <Link to={`/posts/${exactpost.id}`}
        className='link' ><h4>View post</h4></Link>
    </article>)
}