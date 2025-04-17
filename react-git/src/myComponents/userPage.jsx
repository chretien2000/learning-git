import {useSelector} from 'react-redux'
import {selectUserById} from '../storeApp/userStore'
import {useParams,Link} from 'react-router-dom'
import { selectAllPost,selectpostByUser} from '../storeApp/postSlice'

export default function UserPage(){
    const {userId}=useParams()
    const user=useSelector(state=>selectUserById(state,Number(userId)))
const postForUser=useSelector(state=>selectpostByUser(state,Number(userId)))
    /*const postForUser=useSelector(state=>{
        const posts=selectAllPost(state)
        const postArray=posts.posts.filter(post=>post.userId===Number(userId))
        return postArray
    })*/
   console.log(postForUser)
    const titleLists=postForUser.map(post=>(
    <Link to={`/posts/${post.id}`} key={post.id}><li>{post.title}</li></Link>))

    return(
    <>
    <h2>{user?.name}</h2>
    <ol>{titleLists}</ol>
    </>)
}