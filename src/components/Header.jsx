import { Link, useLocation } from 'react-router-dom'
import { Scale, FileText, Search, BookOpen } from 'lucide-react'
import { useStickyHeader } from '../hooks/useScrollReveal'

function Header() {
  const location = useLocation()
  const isScrolled = useStickyHeader()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header className={`sticky-header ${isScrolled ? 'scrolled' : ''} border-b border-gray-200`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Apka Vakeel</h1>
              <p className="text-xs text-gray-600">आपका वकील - Your Personal Legal Assistant</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link
              to="/analysis"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/analysis') 
                  ? 'bg-primary-100 text-primary-700 font-semibold' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Analysis</span>
            </Link>
            <Link
              to="/rights"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/rights') 
                  ? 'bg-primary-100 text-primary-700 font-semibold' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Know Your Rights</span>
            </Link>
            <Link
              to="/documents"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/documents') 
                  ? 'bg-primary-100 text-primary-700 font-semibold' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

