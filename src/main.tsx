import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Dashboard from './dashboard.tsx'
import Layout from './layout.tsx'
import Patients from './patients.tsx'
import Consultation from './consultation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/consultation" element={<Consultation />} />
      </Route>
    </Routes> 
    </BrowserRouter>
  </StrictMode>
)
