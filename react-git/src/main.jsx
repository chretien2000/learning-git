import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './storeApp/store.js'
import {Provider} from 'react-redux'
import { fetchUsers } from './storeApp/userStore.js'
import {fetchPost} from './storeApp/postSlice.js'
store.dispatch(fetchUsers())
store.dispatch(fetchPost())
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App/>} />
      </Routes>
    </Router>
  </Provider>
    
)
