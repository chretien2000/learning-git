import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './storeApp/store.js'
import {Provider} from 'react-redux'
import {extendedUser} from './storeApp/userStore.js'
import{ExtendedSlice} from './storeApp/postSlice.js'
store.dispatch(extendedUser.endpoints.getUser.initiate())
.catch(err=>console.log('fetch users failed',err))
store.dispatch(ExtendedSlice.endpoints.getPost.initiate())
.catch(err=>console.log('fetch post failed',err))

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
