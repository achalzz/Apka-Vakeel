import { useState } from 'react'
import { FileText, Download, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { documentService } from '../services/documentService'

const DOCUMENT_TYPES = [
  { id: 'contract', name: 'Contract', description: 'Business agreements, service contracts, etc.' },
  { id: 'letter', name: 'Legal Letter', description: 'Demand letters, notice letters, formal correspondence' },
  { id: 'nda', name: 'NDA (Non-Disclosure Agreement)', description: 'Confidentiality agreements' },
  { id: 'will', name: 'Will', description: 'Last will and testament' },
  { id: 'power-of-attorney', name: 'Power of Attorney', description: 'Authorization documents' },
  { id: 'lease', name: 'Lease Agreement', description: 'Rental agreements, lease contracts' },
  { id: 'employment', name: 'Employment Contract', description: 'Employment agreements, offer letters' },
  { id: 'invoice', name: 'Invoice', description: 'Professional invoices and billing documents' },
  { id: 'cease-desist', name: 'Cease and Desist Letter', description: 'Stop harassment or infringement' },
  { id: 'complaint', name: 'Complaint Letter', description: 'Formal complaints to organizations' },
  { id: 'settlement', name: 'Settlement Agreement', description: 'Dispute resolution agreements' },
  { id: 'partnership', name: 'Partnership Agreement', description: 'Business partnership contracts' },
]

function DocumentGenerator() {
  const [selectedType, setSelectedType] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedType || !details.trim()) return

    setLoading(true)
    setError(null)
    setGeneratedDocument(null)

    try {
      const result = await documentService.generateDocument(selectedType, details)
      setGeneratedDocument(result)
    } catch (err) {
      setError(err.message || 'Failed to generate document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedDocument) return
    
    const blob = new Blob([generatedDocument.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${generatedDocument.type}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const selectedDocType = DOCUMENT_TYPES.find(doc => doc.id === selectedType)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Document Generator</h1>
        <p className="text-lg text-gray-600">
          Generate professional legal documents tailored to your specific needs. Select a document type and provide details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <div className="mb-6">
          <label htmlFor="documentType" className="block text-sm font-semibold text-gray-700 mb-2">
            Document Type
          </label>
          <select
            id="documentType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field"
            disabled={loading}
          >
            <option value="">Select a document type...</option>
            {DOCUMENT_TYPES.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.description}
              </option>
            ))}
          </select>
        </div>

        {selectedDocType && (
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h3 className="font-semibold text-primary-900 mb-1">{selectedDocType.name}</h3>
            <p className="text-sm text-primary-700">{selectedDocType.description}</p>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">
            Document Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide specific details about what you need in this document. Include names, dates, amounts, terms, and any other relevant information."
            className="textarea-field h-40"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2">
            Be specific about parties involved, dates, amounts, terms, and any special conditions.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedType || !details.trim()}
          className="btn-primary w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
              Generating Document...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 inline mr-2" />
              Generate Document
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

      {generatedDocument && (
        <div className="space-y-6">
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h2 className="text-2xl font-bold text-green-900">Document Generated</h2>
                  <p className="text-green-800 mt-1">
                    Your {selectedDocType?.name} has been generated successfully.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Document Preview
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                {selectedDocType?.name}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                {generatedDocument.content}
              </pre>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Notes</h3>
            <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
              <li>Review the document carefully before using it</li>
              <li>Consider having a qualified attorney review complex legal documents</li>
              <li>Ensure all information is accurate and complete</li>
              <li>Some documents may require notarization or witnesses</li>
              <li>Laws vary by jurisdiction—verify local requirements</li>
            </ul>
          </div>

          <div className="card bg-gray-50 border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> Generated documents are templates and should be reviewed by a qualified 
              attorney for complex legal matters. Apka Vakeel provides document generation as a convenience tool and 
              does not guarantee the legal validity or enforceability of generated documents.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentGenerator

