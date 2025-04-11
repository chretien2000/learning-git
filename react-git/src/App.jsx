
import './App.css';
import Adding from './myComponents/adding.jsx';
import Actions from './myComponents/Action.jsx'
import Layout from './Layouts/Layout.jsx';
import {Routes,Route} from 'react-router-dom'
import PostDetails from './myComponents/postDetails.jsx'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      
      <Route index element={<Actions/>}/>
      <Route path='posts' element={<Adding/>}/>
      <Route path='posts/:id' element={<PostDetails/>}/>
      </Route>
    </Routes>
    
    </>
  )
}

export default App
