import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './storeApp/store.js'
import {Provider} from 'react-redux'
import { fetchUsers } from './storeApp/userStore.js'
store.dispatch(fetchUsers())
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
