import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './pages/context/ContextAPI.jsx'
import { CartContextProvider } from './pages/context/cartContectApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <CartContextProvider>
    <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
    </CartContextProvider>
 
)
