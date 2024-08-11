import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import App from './App.jsx'
import './index.css'
import {ContextProvider} from "./Context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ContextProvider>
    {/*<App />*/}
  </React.StrictMode>,
)
