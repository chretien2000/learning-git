import {useDispatch} from 'react-redux'
import { postRemoved } from '../storeApp/postSlice'
import Reactions from './reactions'
import DateDisplay from './dateDisply.jsx'

export default function Article({post}){
const dispatch=useDispatch()
    return(
        <article className='post'>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p className='author'><i>..{post.author}</i> <span><DateDisplay date={post.date}/></span></p>
        <span onClick={()=>dispatch(postRemoved(post))}
        className='remove'>Delete</span>
        <Reactions id={post.id} reaction={post.reactions}/>
    </article>
    )
}