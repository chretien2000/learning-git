import {useSelector} from 'react-redux'
import {selectpostById,useDeletePostMutation } from '../storeApp/postSlice'
import Reactions from './reactions'
import DateDisplay from './dateDisply.jsx'
import { selectUserIds,selectAllUsers } from "../storeApp/userStore";
import {Link} from 'react-router-dom'

export default function Article({postId}){
const [postRemoved]=useDeletePostMutation()
const userid=useSelector(selectUserIds)
const users=useSelector(selectAllUsers)
const exactpost=useSelector(state=>selectpostById(state,postId))
const outher=userid.find(id=>id===exactpost.userId)
let Author;
if(outher){ 
    Author= users[outher].name
   }
    else{ Author= exactpost.author}

    return(
    <article className='post' >
       
        <h2>{exactpost.title.substring(0,40)}</h2>
        <p>{exactpost.body.substring(0,50)}</p>
        <p className='author'><i>..{Author}</i> <span><DateDisplay date={exactpost.date}/></span></p>
        <span onClick={()=>postRemoved(exactpost)}
        className='remove'>Delete</span>
        <Reactions id={exactpost.id} reaction={exactpost.reactions}/> 
        <Link to={`/posts/${exactpost.id}`}
        className='link' ><h4>View post</h4></Link>
    </article>)
}