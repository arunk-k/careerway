import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AdminAuthContext from './context/AdminAuthContext.jsx'
import store from './redux/store.js'
import UserAuthContext from './context/UserAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AdminAuthContext>
          <UserAuthContext>
            <App />
          </UserAuthContext>
        </AdminAuthContext>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
