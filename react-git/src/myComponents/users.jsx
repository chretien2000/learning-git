import { selectAllUsers } from "../storeApp/userStore";
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function UserList(){
    const users=useSelector(selectAllUsers)
    const list=users.map(user=>(
    <Link to={`/users/${user.id}`} key={user.id}><li>{user.name}</li></Link>))

    return(<div>
        <h2>Author List:</h2>
        <ul>{list}</ul>
    </div>)
}