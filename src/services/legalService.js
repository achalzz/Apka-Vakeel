// Legal Rights Analysis Service
// This service handles AI-powered legal rights analysis
// Focused on Indian legal rights and protections

import { INDIAN_RIGHTS, searchRights } from '../data/indianRights'
import { callOpenAIChat, isOpenAIEnabled } from './openAIClient'

const MOCK_DELAY = 1500 // Simulate API delay when AI is unavailable

// Helper function to extract keywords from situation
const extractKeywords = (text) => {
  const lowerText = text.toLowerCase()
  const keywords = []
  
  // Common legal keywords
  const keywordPatterns = {
    marriage: ['marriage', 'marry', 'wedding', 'spouse', 'husband', 'wife', 'divorce', 'separation', 'alimony', 'maintenance', 'dowry', 'domestic violence'],
    consumer: ['consumer', 'purchase', 'buy', 'product', 'service', 'defective', 'warranty', 'refund', 'complaint', 'seller', 'shop'],
    employment: ['job', 'employment', 'employer', 'employee', 'salary', 'wages', 'termination', 'dismissal', 'workplace', 'harassment', 'labor'],
    property: ['property', 'land', 'house', 'rent', 'tenant', 'landlord', 'eviction', 'lease', 'ownership', 'possession'],
    education: ['education', 'school', 'college', 'admission', 'fees', 'student', 'teacher', 'examination'],
    healthcare: ['health', 'medical', 'hospital', 'doctor', 'treatment', 'medicine', 'insurance', 'healthcare'],
    arrest: ['arrest', 'police', 'detention', 'custody', 'bail', 'fir', 'complaint', 'criminal'],
    privacy: ['privacy', 'data', 'personal information', 'surveillance', 'phone', 'email'],
    discrimination: ['discrimination', 'caste', 'religion', 'gender', 'sex', 'race', 'unequal', 'biased'],
    rti: ['information', 'rti', 'right to information', 'government', 'public authority', 'transparency'],
    environment: ['environment', 'pollution', 'air', 'water', 'noise', 'waste', 'green'],
    women: ['woman', 'women', 'female', 'maternity', 'sexual harassment', 'stridhan'],
    child: ['child', 'minor', 'guardian', 'custody', 'adoption', 'child marriage']
  }
  
  for (const [category, patterns] of Object.entries(keywordPatterns)) {
    if (patterns.some(pattern => lowerText.includes(pattern))) {
      keywords.push(category)
    }
  }
  
  return keywords
}

// Helper function to get relevant rights based on situation
const getRelevantRights = (situation) => {
  const keywords = extractKeywords(situation)
  const allRelevantRights = searchRights(situation)
  
  // Group rights by category
  const rightsByCategory = {}
  allRelevantRights.forEach(right => {
    const category = right.category || 'General'
    if (!rightsByCategory[category]) {
      rightsByCategory[category] = []
    }
    rightsByCategory[category].push(right)
  })
  
  // Build detailed rights information
  let rightsText = `Based on your situation description, here are your relevant legal rights under Indian law:\n\n`
  
  if (allRelevantRights.length === 0) {
    // If no specific rights found, provide general fundamental rights
    rightsText += `**Fundamental Rights (Constitution of India):**\n\n`
    rightsText += `1. **Right to Life and Personal Liberty (Article 21)**: This fundamental right includes:\n`
    rightsText += `   - Right to life with human dignity\n`
    rightsText += `   - Right to privacy\n`
    rightsText += `   - Right to health and medical care\n`
    rightsText += `   - Right to livelihood\n`
    rightsText += `   - Right to speedy trial\n\n`
    rightsText += `2. **Right to Equality (Article 14)**: All citizens are equal before the law.\n\n`
    rightsText += `3. **Right to Constitutional Remedies (Article 32)**: Right to move Supreme Court for enforcement of fundamental rights.\n\n`
    rightsText += `**Note**: Please provide more specific details about your situation to get targeted legal rights information.`
  } else {
    // Show relevant rights organized by category
    Object.keys(rightsByCategory).forEach(category => {
      const categoryRights = rightsByCategory[category]
      rightsText += `**${category}:**\n\n`
      
      categoryRights.slice(0, 5).forEach((right, index) => {
        rightsText += `${index + 1}. **${right.title}${right.article ? ` (${right.article})` : ''}**: ${right.description}\n`
        if (right.details && right.details.length > 0) {
          right.details.slice(0, 3).forEach(detail => {
            rightsText += `   - ${detail}\n`
          })
        }
        rightsText += `\n`
      })
    })
    
    // Add fundamental rights that are always relevant
    rightsText += `**Always Applicable Fundamental Rights:**\n\n`
    rightsText += `- **Right to Life and Personal Liberty (Article 21)**: Fundamental right to life with dignity\n`
    rightsText += `- **Right to Equality (Article 14)**: Equal protection of laws\n`
    rightsText += `- **Right to Constitutional Remedies (Article 32)**: Right to seek legal remedy\n`
  }
  
  return { rightsText, relevantRights: allRelevantRights, keywords }
}

const parseJSONFromAI = (content) => {
  if (!content) return null
  const trimmed = content.trim()
  try {
    return JSON.parse(trimmed)
  } catch (error) {
    const match = trimmed.match(/```json([\s\S]*?)```/i)
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim())
      } catch (_err) {
        return null
      }
    }
    return null
  }
}

const buildMockResponse = (situation) => {
  const { rightsText, relevantRights, keywords } = getRelevantRights(situation)
  const lowerSituation = situation.toLowerCase()

  let optionsText = `Based on your situation, here are your available options under Indian law:\n\n`

  if (keywords.includes('marriage')) {
    optionsText += `**Option 1: Marriage-Related Remedies**\n`
    optionsText += `- File for divorce or separation if needed\n`
    optionsText += `- Seek maintenance/alimony through family court\n`
    optionsText += `- File complaint under Domestic Violence Act if facing abuse\n`
    optionsText += `- Approach family court for custody of children\n`
    optionsText += `- File complaint against dowry harassment\n\n`
  }

  if (keywords.includes('consumer')) {
    optionsText += `**Option 1: Consumer Remedies**\n`
    optionsText += `- File complaint in Consumer Court (District/State/National)\n`
    optionsText += `- Seek refund/replacement/compensation\n`
    optionsText += `- Approach Consumer Helpline (1800-11-4000)\n`
    optionsText += `- File online complaint on consumer portal\n\n`
  }

  if (keywords.includes('employment')) {
    optionsText += `**Option 1: Employment-Related Remedies**\n`
    optionsText += `- File complaint with Labor Commissioner\n`
    optionsText += `- Approach Industrial Tribunal/Labor Court\n`
    optionsText += `- File complaint for sexual harassment (POSH Act)\n`
    optionsText += `- Seek compensation for wrongful termination\n\n`
  }

  if (keywords.includes('property')) {
    optionsText += `**Option 1: Property-Related Remedies**\n`
    optionsText += `- File case in civil court for property disputes\n`
    optionsText += `- Approach Rent Control Tribunal for tenant issues\n`
    optionsText += `- File complaint for illegal eviction\n`
    optionsText += `- Seek injunction orders if needed\n\n`
  }

  let optionNum = 1
  if (keywords.length > 0) {
    optionNum = keywords.filter(k => ['marriage', 'consumer', 'employment', 'property'].includes(k)).length + 1
  }

  optionsText += `**Option ${optionNum}: Seek Legal Assistance**\n`
  optionsText += `- Contact Legal Services Authority for free legal aid (if eligible)\n`
  optionsText += `- Consult with a qualified lawyer\n`
  optionsText += `- Approach District Legal Services Authority (DLSA)\n`
  optionsText += `- Use Lok Adalat for speedy resolution\n\n`

  optionsText += `**Option ${optionNum + 1}: File Complaints**\n`
  optionsText += `- File complaint with appropriate authority (police, consumer court, etc.)\n`
  if (keywords.includes('rti') || lowerSituation.includes('information')) {
    optionsText += `- Use Right to Information (RTI) to get information from public authorities\n`
  }
  optionsText += `- Approach relevant regulatory bodies\n\n`

  optionsText += `**Option ${optionNum + 2}: Document Everything**\n`
  optionsText += `- Keep records of all communications and documents\n`
  optionsText += `- Maintain evidence (photos, videos, receipts, etc.)\n`
  optionsText += `- Keep copies of all relevant legal documents\n\n`

  optionsText += `**Option ${optionNum + 3}: Approach Courts**\n`
  optionsText += `- File a writ petition in High Court or Supreme Court (for fundamental rights violations)\n`
  optionsText += `- Approach appropriate courts for civil/criminal matters\n`

  let recText = `**Immediate Actions Based on Your Situation:**\n\n`

  if (keywords.includes('marriage')) {
    recText += `1. **Marriage-Related Actions**:\n`
    recText += `   - Gather marriage certificate and related documents\n`
    recText += `   - Document any incidents of abuse or harassment\n`
    recText += `   - Consult a family lawyer\n`
    recText += `   - Consider filing for protection orders if facing domestic violence\n\n`
  }

  if (keywords.includes('consumer')) {
    recText += `1. **Consumer-Related Actions**:\n`
    recText += `   - Keep purchase receipts and warranty documents\n`
    recText += `   - Document the defect or issue with photos/videos\n`
    recText += `   - File complaint in Consumer Court within 2 years\n`
    recText += `   - Contact seller/manufacturer first for resolution\n\n`
  }

  if (keywords.includes('employment')) {
    recText += `1. **Employment-Related Actions**:\n`
    recText += `   - Keep employment contract and appointment letter\n`
    recText += `   - Document salary slips and work records\n`
    recText += `   - File complaint with Labor Commissioner\n`
    recText += `   - Approach Labor Court for disputes\n\n`
  }

  if (keywords.includes('property')) {
    recText += `1. **Property-Related Actions**:\n`
    recText += `   - Gather property documents (sale deed, rent agreement, etc.)\n`
    recText += `   - Document any illegal actions (photos, videos)\n`
    recText += `   - File case in appropriate court\n`
    recText += `   - Seek interim relief if needed\n\n`
  }

  let recNum = 1
  if (keywords.length > 0) {
    recNum = keywords.filter(k => ['marriage', 'consumer', 'employment', 'property'].includes(k)).length + 1
  }

  recText += `${recNum}. **Gather Documentation**: Collect all relevant documents, evidence, and records related to your situation.\n\n`
  recText += `${recNum + 1}. **Seek Legal Advice**:\n`
  recText += `   - Contact a qualified lawyer specializing in your matter\n`
  recText += `   - Approach Legal Services Authority for free legal aid (if eligible)\n`
  recText += `   - Consult with legal aid clinics\n\n`
  recText += `${recNum + 2}. **File Complaints**: If your rights are violated, file complaints with appropriate authorities.\n\n`

  if (keywords.includes('rti') || lowerSituation.includes('information')) {
    recText += `${recNum + 3}. **Use RTI**: File RTI application to get information from public authorities.\n\n`
  }

  return {
    rights: rightsText,
    options: optionsText,
    recommendations: recText,
    warnings: `**Important Warnings:**

⚠️ **Time-Sensitive**: Legal proceedings have strict deadlines. If you receive any legal notice or summons, respond within the specified timeframe.

⚠️ **Court Appearance**: If you receive a court summons, do not ignore it. Failure to appear may result in ex-parte orders against you.

⚠️ **Legal Representation**: While you can represent yourself, having a qualified lawyer significantly improves your chances of a favorable outcome. Free legal aid is available for eligible persons.

⚠️ **Documentation**: Keep all documents safe. Loss of important documents can weaken your case.

⚠️ **Limitation Period**: Be aware of limitation periods for filing cases. Different laws have different time limits.

⚠️ **Jurisdiction**: Ensure you approach the correct court or authority with proper jurisdiction over your matter.`,
    nextSteps: `**Your Next Steps:**

1. **Today**: 
   - Document your situation thoroughly
   - Gather all relevant documents and evidence
   - Review the "Know Your Rights" section for relevant rights

2. **This Week**: 
   - Consult with a qualified lawyer
   - Contact Legal Services Authority if you need free legal aid
   - File necessary complaints or applications
   - Use RTI if you need information from public authorities

3. **If You Receive a Legal Notice or Court Summons**:
   - Do not ignore it
   - Consult a lawyer immediately
   - File a response within the deadline
   - Prepare your defense and gather evidence
   - Consider seeking legal aid if eligible

4. **Ongoing**:
   - Keep all communications in writing
   - Maintain records of all interactions
   - Stay informed about your rights
   - Follow up on complaints and applications

5. **Resources**:
   - Legal Services Authority (for free legal aid)
   - Consumer Courts (for consumer disputes)
   - RTI Act (for information from public authorities)
   - Human Rights Commission (for human rights violations)
   - Know Your Rights section (comprehensive rights reference)`,
  }
}

export const legalRightsService = {
  async analyzeSituation(situation) {
    if (isOpenAIEnabled) {
      try {
        const messages = [
          {
            role: 'system',
            content:
              'You are Apka Vakeel, an Indian legal rights advisor. Respond in JSON only (no prose, no markdown) with keys: rights, options, recommendations, warnings, nextSteps. Base your answer strictly on Indian laws and rights. Use clear, concise language and add disclaimers reminding users to consult qualified lawyers for complex matters.',
          },
          {
            role: 'user',
            content: `User situation:\n${situation}\n\nProvide guidance personalized to this scenario.`,
          },
        ]

        const aiResponse = await callOpenAIChat(messages, { temperature: 0.2 })
        const parsed = parseJSONFromAI(aiResponse)

        if (parsed?.rights) {
          return {
            rights: parsed.rights,
            options: parsed.options || '',
            recommendations: parsed.recommendations || '',
            warnings: parsed.warnings || '',
            nextSteps: parsed.nextSteps || '',
          }
        }
      } catch (error) {
        console.error('OpenAI legal analysis failed, falling back to mock data.', error)
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    }

    return buildMockResponse(situation)
  }
}

