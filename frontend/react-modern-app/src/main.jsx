import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimpleButton from './frontPage';
import Dashboard from './Dashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path = "/dashboard" element = {<Dashboard />}></Route>
        <Route path =  "/" element = {<SimpleButton />}> </Route>
      </Routes>
      </BrowserRouter>
  </StrictMode>,
)
