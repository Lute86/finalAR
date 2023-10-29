import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/context.jsx';
import { AppProviderServer } from './context/serverContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AppProviderServer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviderServer>
    </AppProvider>
  </React.StrictMode>,
)
