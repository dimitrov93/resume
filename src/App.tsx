import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CvPage from './pages/cv/CvPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv-private-x7k2" element={<CvPage />} />
      </Routes>
    </BrowserRouter>
  )
}
