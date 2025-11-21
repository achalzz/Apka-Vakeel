import { useState } from 'react'
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { INDIAN_RIGHTS, searchRights } from '../data/indianRights'

function KnowYourRights() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState({})
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = searchRights(searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults(null)
    }
  }

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const renderRights = (rights) => {
    return rights.map((right, index) => (
      <div key={index} className="card mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {right.article && (
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                {right.article}
              </span>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{right.title}</h3>
            <p className="text-gray-600 mb-3">{right.description}</p>
            {right.details && (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {right.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Know Your Rights - India</h1>
        <p className="text-lg text-gray-600">
          Comprehensive guide to all your fundamental rights, legal rights, and protections as an Indian citizen.
        </p>
      </div>

      {/* Search Section */}
      <div className="card mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for rights (e.g., privacy, equality, education, consumer)..."
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchResults !== null && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Search Results {searchResults.length > 0 && `(${searchResults.length} found)`}
          </h2>
          {searchResults.length === 0 ? (
            <div className="card bg-yellow-50 border-yellow-200">
              <p className="text-yellow-800">No rights found matching your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="card">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                    {result.category}
                  </span>
                  {result.article && (
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded mb-2 ml-2">
                      {result.article}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 mb-3">{result.description}</p>
                  {result.details && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {result.details.map((detail, idx) => (
                        <li key={idx} className="text-sm">{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Rights Sections */}
      {searchResults === null && (
        <div className="space-y-6">
          {/* Fundamental Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('fundamentalRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.fundamentalRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.fundamentalRights.description}</p>
                </div>
              </div>
              {expandedSections.fundamentalRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.fundamentalRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.fundamentalRights.rights)}
              </div>
            )}
          </div>

          {/* Consumer Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('consumerRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.consumerRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.consumerRights.description}</p>
                </div>
              </div>
              {expandedSections.consumerRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.consumerRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.consumerRights.rights)}
              </div>
            )}
          </div>

          {/* Women's Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('womenRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.womenRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.womenRights.description}</p>
                </div>
              </div>
              {expandedSections.womenRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.womenRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.womenRights.rights)}
              </div>
            )}
          </div>

          {/* Labor Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('laborRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.laborRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.laborRights.description}</p>
                </div>
              </div>
              {expandedSections.laborRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.laborRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.laborRights.rights)}
              </div>
            )}
          </div>

          {/* Environmental Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('environmentalRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.environmentalRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.environmentalRights.description}</p>
                </div>
              </div>
              {expandedSections.environmentalRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.environmentalRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.environmentalRights.rights)}
              </div>
            )}
          </div>

          {/* RTI Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('informationRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.informationRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.informationRights.description}</p>
                </div>
              </div>
              {expandedSections.informationRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.informationRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.informationRights.rights)}
              </div>
            )}
          </div>

          {/* Digital Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('digitalRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.digitalRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.digitalRights.description}</p>
                </div>
              </div>
              {expandedSections.digitalRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.digitalRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.digitalRights.rights)}
              </div>
            )}
          </div>

          {/* Legal Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('legalRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.legalRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.legalRights.description}</p>
                </div>
              </div>
              {expandedSections.legalRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.legalRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.legalRights.rights)}
              </div>
            )}
          </div>

          {/* Healthcare Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('healthcareRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.healthcareRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.healthcareRights.description}</p>
                </div>
              </div>
              {expandedSections.healthcareRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.healthcareRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.healthcareRights.rights)}
              </div>
            )}
          </div>

          {/* Education Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('educationRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.educationRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.educationRights.description}</p>
                </div>
              </div>
              {expandedSections.educationRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.educationRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.educationRights.rights)}
              </div>
            )}
          </div>

          {/* Marriage Rights */}
          <div className="card">
            <button
              onClick={() => toggleSection('marriageRights')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{INDIAN_RIGHTS.marriageRights.title}</h2>
                  <p className="text-gray-600">{INDIAN_RIGHTS.marriageRights.description}</p>
                </div>
              </div>
              {expandedSections.marriageRights ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {expandedSections.marriageRights && (
              <div className="mt-6">
                {renderRights(INDIAN_RIGHTS.marriageRights.rights)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card bg-gray-50 border-gray-200 mt-8">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> This is a comprehensive reference guide to Indian rights. Laws and interpretations 
          may change. For specific legal advice, please consult with a qualified attorney. This information is for 
          educational purposes only.
        </p>
      </div>
    </div>
  )
}

export default KnowYourRights

