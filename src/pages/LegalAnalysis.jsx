import { useState } from 'react'
import { Send, Loader2, AlertCircle, CheckCircle2, FileText } from 'lucide-react'
import { legalRightsService } from '../services/legalService'

function LegalAnalysis() {
  const [situation, setSituation] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!situation.trim()) return

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const result = await legalRightsService.analyzeSituation(situation)
      setAnalysis(result)
    } catch (err) {
      setError(err.message || 'Failed to analyze situation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Rights Analysis</h1>
        <p className="text-lg text-gray-600">
          Describe your legal situation or question, and our AI will help you understand your rights and options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <div className="mb-6">
          <label htmlFor="situation" className="block text-sm font-semibold text-gray-700 mb-2">
            Describe Your Situation
          </label>
          <textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Example: My landlord is trying to evict me without proper notice. I've been living in the apartment for 2 years and always paid rent on time. What are my rights?"
            className="textarea-field h-40"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2">
            Be as detailed as possible. Include relevant dates, locations, and any actions you've already taken.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !situation.trim()}
          className="btn-primary w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 inline mr-2" />
              Analyze My Rights
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="card bg-red-50 border-red-200 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
              <h2 className="text-2xl font-bold text-green-900">Analysis Complete</h2>
            </div>
            <p className="text-green-800">
              Based on your description, here's what you need to know about your legal rights and options.
            </p>
          </div>

          {analysis.rights && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Your Legal Rights
              </h3>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">{analysis.rights}</div>
              </div>
            </div>
          )}

          {analysis.options && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Available Options</h3>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">{analysis.options}</div>
              </div>
            </div>
          )}

          {analysis.recommendations && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Recommended Actions</h3>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">{analysis.recommendations}</div>
              </div>
            </div>
          )}

          {analysis.warnings && (
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="text-xl font-semibold mb-4 text-yellow-900">Important Warnings</h3>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-yellow-800">{analysis.warnings}</div>
              </div>
            </div>
          )}

          {analysis.nextSteps && (
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Next Steps</h3>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-blue-800">{analysis.nextSteps}</div>
              </div>
            </div>
          )}

          <div className="card bg-gray-50 border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute 
              legal advice. For complex legal matters, consider consulting with a qualified attorney. Apka Vakeel is 
              designed to help you understand your rights and options, but cannot replace professional legal counsel 
              for serious matters.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LegalAnalysis

