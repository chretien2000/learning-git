import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './storeApp/store.js'
import {Provider} from 'react-redux'
import { fetchUsers } from './storeApp/userStore.js'
store.dispatch(fetchUsers())
//console.log(store.getState())
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <App />
  </Provider>
    
)
