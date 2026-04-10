import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CvPage from './pages/cv/CvPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-cv-hidden" element={<CvPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
