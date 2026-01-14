import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import FloatingControls from './components/ui/FloatingControls'
import ScrollToTop from './components/ui/ScrollToTop'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CoursePage from './pages/CoursePage'
import StudyAbroad from './pages/StudyAbroad'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Teachers from './pages/Teachers'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import './styles/globals.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <FloatingControls />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/olympiad/:subCourseId" element={<CoursePage />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Navigate to="/teachers" replace />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
