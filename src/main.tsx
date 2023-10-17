import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import RedirectLink from './pages/redirectLink.tsx'
import UnknownLink from './pages/unknownLink.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/:link' element={<RedirectLink />} />
        <Route path='*' element={<UnknownLink />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
