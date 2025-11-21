import { Link } from 'react-router-dom'
import { Search, FileText, Shield, Clock, Users, Zap } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { use3DTilt } from '../hooks/use3DTilt'

function Home() {
  const [heroRef, heroRevealed] = useScrollReveal({ threshold: 0.2 })
  const [featuresRef, featuresRevealed] = useScrollReveal({ threshold: 0.1 })
  const [problemRef, problemRevealed] = useScrollReveal({ threshold: 0.1 })
  const [howItWorksRef, howItWorksRevealed] = useScrollReveal({ threshold: 0.1 })
  const [ctaRef, ctaRevealed] = useScrollReveal({ threshold: 0.1 })
  
  const card1Ref = use3DTilt({ maxTilt: 10, scale: 1.03 })
  const card2Ref = use3DTilt({ maxTilt: 10, scale: 1.03 })
  const card3Ref = use3DTilt({ maxTilt: 10, scale: 1.03 })
  
  return (
    <div className="max-w-6xl mx-auto perspective-container">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`text-center mb-16 scroll-reveal ${heroRevealed ? 'revealed' : ''}`}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-3d">
          Understand Your Legal Rights
          <span className="block text-primary-600 mt-2 float">In Minutes, Not Hours</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          AI-powered legal assistance that helps you understand your rights, get personalized guidance, 
          and generate legal documents—all without the high cost of traditional legal services.
        </p>
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          <Link to="/analysis" className="btn-primary text-lg px-8 py-4">
            <Search className="w-5 h-5 inline mr-2" />
            Analyze My Situation
          </Link>
          <Link to="/rights" className="btn-primary text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
            <Shield className="w-5 h-5 inline mr-2" />
            Know Your Rights (India)
          </Link>
          <Link to="/documents" className="btn-secondary text-lg px-8 py-4">
            <FileText className="w-5 h-5 inline mr-2" />
            Generate Documents
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div 
        ref={featuresRef}
        className={`grid md:grid-cols-3 gap-8 mb-16 scroll-reveal ${featuresRevealed ? 'revealed' : ''}`}
      >
        <div ref={card1Ref} className="card card-3d text-center float">
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d shadow-lg">
            <Zap className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-3d">Instant Analysis</h3>
          <p className="text-gray-600">
            Get immediate insights into your legal situation with AI-powered analysis of your rights and options.
          </p>
        </div>

        <div ref={card2Ref} className="card card-3d text-center float-reverse">
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d shadow-lg">
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-3d">Document Generation</h3>
          <p className="text-gray-600">
            Create professional legal documents including contracts, letters, forms, and more—all tailored to your needs.
          </p>
        </div>

        <div ref={card3Ref} className="card card-3d text-center float">
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d shadow-lg">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-3d">24/7 Access</h3>
          <p className="text-gray-600">
            Access legal guidance whenever you need it, without waiting for business hours or scheduling appointments.
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div 
        ref={problemRef}
        className={`card bg-3d bg-gradient-to-r from-primary-50 via-purple-50 to-pink-50 border-primary-200 mb-16 scroll-reveal ${problemRevealed ? 'revealed' : ''} layer-2`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">The Legal Services Gap</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 mb-4">
              <strong>92%</strong> of low-income Americans receive inadequate or no legal help for their civil legal problems.
            </p>
            <p className="text-gray-700 mb-4">
              Over <strong>40%</strong> of family law litigants appear in court without representation.
            </p>
            <p className="text-gray-700">
              <strong>32%</strong> of the UK population had an unmet legal need in 2024.
            </p>
          </div>
          <div>
            <p className="text-gray-700 mb-4">
              Legal fees are "very onerous for a broad spectrum" of people, making professional legal services inaccessible.
            </p>
            <p className="text-gray-700">
              Apka Vakeel bridges this gap by providing accessible, affordable, and immediate legal information and document generation.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div 
        ref={howItWorksRef}
        className={`mb-16 scroll-reveal ${howItWorksRevealed ? 'revealed' : ''}`}
      >
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Describe Your Situation</h3>
            <p className="text-gray-600">
              Simply describe your legal situation or question in plain language. No legal jargon required.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your situation and provides comprehensive information about your legal rights and options.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Guidance & Documents</h3>
            <p className="text-gray-600">
              Receive personalized guidance and generate any legal documents you need, ready to use.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        className={`card bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white text-center scroll-reveal ${ctaRevealed ? 'revealed' : ''} layer-3 glow-animated`}
      >
        <h2 className="text-3xl font-bold mb-4 text-3d">Ready to Understand Your Legal Rights?</h2>
        <p className="text-xl mb-6 text-white/90">
          Get started now—it's free, fast, and accessible 24/7.
        </p>
        <Link to="/analysis" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block transform hover:scale-105 shadow-xl">
          Start Your Legal Analysis
        </Link>
      </div>
    </div>
  )
}

export default Home

