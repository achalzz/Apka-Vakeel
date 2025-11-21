import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import LegalAnalysis from './pages/LegalAnalysis'
import DocumentGenerator from './pages/DocumentGenerator'
import KnowYourRights from './pages/KnowYourRights'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden perspective-container relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <Header />
        <main className="container mx-auto px-4 py-8 scroll-smooth relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<LegalAnalysis />} />
            <Route path="/documents" element={<DocumentGenerator />} />
            <Route path="/rights" element={<KnowYourRights />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

