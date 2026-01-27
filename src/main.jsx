import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ReactQueryDevtools } from 'react-query/devtools'

// import "./index.css"
import '../css/app.bundle.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
     
          <App />
      
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

