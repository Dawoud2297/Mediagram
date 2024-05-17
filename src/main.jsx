import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "./context/AuthContext.jsx"
import { QueryProvider } from "./lib/react-query/QueryProvider.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
)
