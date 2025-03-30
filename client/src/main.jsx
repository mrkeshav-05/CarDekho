import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SocketContextProvider> */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    {/* </SocketContextProvider> */}
  </StrictMode>,
)