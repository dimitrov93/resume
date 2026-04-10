import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CvPage from './pages/cv/CvPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-cv-hidden" element={<CvPage />} />
      </Routes>
    </BrowserRouter>
  )
}
