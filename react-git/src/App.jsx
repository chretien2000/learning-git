
import './App.css';
import Adding from './myComponents/adding.jsx';
import PostUpdate from './myComponents/UpdatePost.jsx'
import Actions from './myComponents/Action.jsx'
import Layout from './Layouts/Layout.jsx';
import {Routes,Route} from 'react-router-dom'
import PostDetails from './myComponents/postDetails.jsx'
import UserPage from './myComponents/userPage.jsx'
import UserList from './myComponents/users.jsx'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Actions/>}/>
      <Route path='posts' element={<Adding/>}/>
      <Route path='posts/:id' element={<PostDetails/>}/>
      <Route path='update/:Id' element={<PostUpdate/>}/>
      
      <Route path='/users'>
        <Route index element={<UserList/>}/>
        <Route path=':userId' element={<UserPage/>}/>
      </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
