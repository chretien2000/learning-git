import {NavLink} from 'react-router-dom'

export default function Header(){

    return(<div>
      <NavLink to='.'><h2>Add post</h2></NavLink>
       <NavLink to='posts'><h2>All post</h2></NavLink>
    </div>)
}