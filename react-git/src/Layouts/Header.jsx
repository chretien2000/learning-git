import {NavLink} from 'react-router-dom'
import { addCount } from '../storeApp/postSlice'
import { useSelector,useDispatch } from 'react-redux'
import { selectCount } from '../storeApp/postSlice'
export default function Header(){
const count=useSelector(selectCount)
const dispatch=useDispatch()
    return(<div>
      <NavLink to='.'><h2>Add post</h2></NavLink>
       <NavLink to='posts'><h2>All post</h2></NavLink>
       <NavLink to='users'><h2>Users</h2></NavLink>
       <button onClick={()=>dispatch(addCount())}>{count}</button>
    </div>)
}