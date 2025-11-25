// Document Generation Service
// This service handles AI-powered legal document generation

import { callOpenAIChat, isOpenAIEnabled } from './openAIClient'

const MOCK_DELAY = 2000 // Simulate API delay when AI is unavailable

export const documentService = {
  async generateDocument(type, details) {
    if (isOpenAIEnabled) {
      try {
        const messages = [
          {
            role: 'system',
            content:
              'You are an Indian legal document assistant. Generate professional, ready-to-use legal documents in plain text. Include sections, placeholders, and Indian legal considerations. Never include markdown or code blocks—return plain text only.',
          },
          {
            role: 'user',
            content: `Document type: ${type}\nDetails provided by user:\n${details || 'No additional details provided.'}\n\nGenerate a complete document tailored for Indian legal context.`,
          },
        ]

        const aiResponse = await callOpenAIChat(messages, { temperature: 0.3 })
        if (aiResponse) {
          return {
            type,
            content: aiResponse.trim(),
            generatedAt: new Date().toISOString(),
          }
        }
      } catch (error) {
        console.error('OpenAI document generation failed, falling back to template.', error)
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    }

    // Generate mock document based on type
    const documentTemplates = {
      contract: generateContract(details),
      letter: generateLetter(details),
      nda: generateNDA(details),
      will: generateWill(details),
      'power-of-attorney': generatePowerOfAttorney(details),
      lease: generateLease(details),
      employment: generateEmploymentContract(details),
      invoice: generateInvoice(details),
      'cease-desist': generateCeaseDesist(details),
      complaint: generateComplaint(details),
      settlement: generateSettlement(details),
      partnership: generatePartnership(details),
    }

    return {
      type,
      content: documentTemplates[type] || generateGenericDocument(type, details),
      generatedAt: new Date().toISOString()
    }
  }
}

function generateContract(details) {
  return `CONTRACT AGREEMENT

This Contract Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between the parties as described below.

PARTIES:
[Party 1 Name and Address]
[Party 2 Name and Address]

RECITALS:
${details || 'The parties wish to enter into a contractual relationship as described below.'}

TERMS AND CONDITIONS:

1. SCOPE OF AGREEMENT
   The parties agree to the terms and conditions set forth in this Agreement.

2. OBLIGATIONS
   Each party agrees to fulfill their respective obligations as outlined in this Agreement.

3. PAYMENT TERMS
   Payment terms and amounts shall be as agreed upon by both parties.

4. TERM
   This Agreement shall commence on the date of execution and continue until terminated as provided herein.

5. TERMINATION
   Either party may terminate this Agreement with [X] days written notice.

6. GOVERNING LAW
   This Agreement shall be governed by the laws of [Jurisdiction].

7. DISPUTE RESOLUTION
   Any disputes arising from this Agreement shall be resolved through [mediation/arbitration/litigation].

8. ENTIRE AGREEMENT
   This Agreement constitutes the entire agreement between the parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_______________________          _______________________
[Party 1 Signature]               [Party 2 Signature]

_______________________          _______________________
[Party 1 Name]                    [Party 2 Name]

Date: _______________            Date: _______________

NOTES: This is a template document. Please review with legal counsel before signing.`
}

function generateLetter(details) {
  return `[Your Name]
[Your Address]
[City, State, ZIP Code]
[Email Address]
[Phone Number]

[Date]

[Recipient Name]
[Recipient Address]
[City, State, ZIP Code]

RE: [Subject Matter]

Dear [Recipient Name],

I am writing to you regarding [subject matter].

${details || 'Please find the details of this matter as described below.'}

I would appreciate your prompt attention to this matter. Please respond within [X] days.

If you have any questions or need to discuss this matter further, please contact me at the above address or phone number.

Thank you for your attention to this matter.

Sincerely,

_______________________
[Your Signature]

[Your Printed Name]`
}

function generateNDA(details) {
  return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

DISCLOSING PARTY:
[Name and Address]

RECEIVING PARTY:
[Name and Address]

1. DEFINITION OF CONFIDENTIAL INFORMATION
   Confidential Information includes all non-public, proprietary, or confidential information disclosed by the Disclosing Party to the Receiving Party.

2. OBLIGATIONS
   The Receiving Party agrees to:
   a) Hold all Confidential Information in strict confidence
   b) Not disclose Confidential Information to any third party
   c) Use Confidential Information solely for the purpose of [purpose]
   d) Take reasonable precautions to protect Confidential Information

3. EXCEPTIONS
   This Agreement does not apply to information that:
   a) Was known to the Receiving Party prior to disclosure
   b) Is publicly available
   c) Is independently developed by the Receiving Party
   d) Is required to be disclosed by law

4. TERM
   This Agreement shall remain in effect for [X] years from the date of execution.

5. RETURN OF INFORMATION
   Upon termination, the Receiving Party shall return all Confidential Information.

IN WITNESS WHEREOF, the parties have executed this Agreement.

_______________________          _______________________
Disclosing Party                  Receiving Party

Date: _______________            Date: _______________`
}

function generateWill(details) {
  return `LAST WILL AND TESTAMENT

I, [Your Full Name], residing at [Your Address], being of sound mind and memory, do hereby make, publish, and declare this to be my Last Will and Testament.

1. REVOCATION
   I hereby revoke all former wills and codicils made by me.

2. EXECUTOR
   I nominate and appoint [Executor Name] as the Executor of this Will.

3. DISTRIBUTION OF ASSETS
   ${details || 'I direct that my assets be distributed as follows:'}
   
   [List specific bequests and distributions]

4. RESIDUARY CLAUSE
   All remaining assets not specifically bequeathed shall be distributed to [Beneficiary Name].

5. GUARDIANSHIP
   If applicable, I nominate [Guardian Name] as guardian of any minor children.

IN WITNESS WHEREOF, I have hereunto set my hand this [Date].

_______________________
[Your Signature]

WITNESSES:

We, the undersigned witnesses, attest that the testator signed this Will in our presence.

_______________________          _______________________
Witness 1                        Witness 2

[Witness 1 Name]                 [Witness 2 Name]

[Witness 1 Address]              [Witness 2 Address]

IMPORTANT: This document should be executed in accordance with state law requirements. Consult an attorney.`
}

function generatePowerOfAttorney(details) {
  return `POWER OF ATTORNEY

I, [Your Name], of [Your Address], hereby appoint [Agent Name] of [Agent Address] as my attorney-in-fact (agent) to act in my name, place, and stead.

1. POWERS GRANTED
   ${details || 'My agent shall have the following powers:'}
   
   [ ] Financial transactions
   [ ] Real estate transactions
   [ ] Healthcare decisions
   [ ] Legal proceedings
   [ ] Other: [specify]

2. DURATION
   This Power of Attorney shall [be effective immediately / become effective upon my incapacity] and shall continue until [termination date or event].

3. REVOCATION
   I reserve the right to revoke this Power of Attorney at any time.

4. COMPENSATION
   My agent shall serve [with/without] compensation.

IN WITNESS WHEREOF, I have executed this Power of Attorney on [Date].

_______________________
[Your Signature]

[Your Printed Name]

NOTARIZED:

State of _______________
County of _______________

On this ____ day of _______________, 20__, before me appeared [Your Name], who proved to me through identification to be the person whose name is subscribed to this instrument.

_______________________
Notary Public

My commission expires: _______________`
}

function generateLease(details) {
  return `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Lease") is entered into on ${new Date().toLocaleDateString()} between:

LANDLORD:
[Landlord Name and Address]

TENANT:
[Tenant Name and Address]

PROPERTY:
[Property Address and Description]

1. TERM
   The term of this Lease shall be [X] months, commencing on [Start Date] and ending on [End Date].

2. RENT
   Monthly rent shall be $[Amount], due on the [Day] of each month.

3. SECURITY DEPOSIT
   Tenant has deposited $[Amount] as security deposit.

4. USE OF PREMISES
   The premises shall be used solely as a private residence.

5. MAINTENANCE AND REPAIRS
   Landlord shall maintain the property in habitable condition. Tenant shall maintain the premises in clean condition.

6. UTILITIES
   [Specify which utilities are included/excluded]

7. PETS
   [Pet policy]

8. TERMINATION
   Either party may terminate this Lease with [X] days written notice.

9. DEFAULT
   If Tenant fails to pay rent or breaches this Lease, Landlord may terminate the Lease.

IN WITNESS WHEREOF, the parties have executed this Lease.

_______________________          _______________________
Landlord                          Tenant

Date: _______________            Date: _______________`
}

function generateEmploymentContract(details) {
  return `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

EMPLOYER:
[Company Name and Address]

EMPLOYEE:
[Employee Name and Address]

1. POSITION
   Employee shall serve as [Job Title] and perform duties as assigned.

2. COMPENSATION
   Employee shall receive a salary of $[Amount] per [period], payable [frequency].

3. BENEFITS
   Employee shall be entitled to [list benefits].

4. TERM
   This Agreement shall commence on [Start Date] and continue until terminated.

5. TERMINATION
   Either party may terminate this Agreement with [X] days notice, or immediately for cause.

6. CONFIDENTIALITY
   Employee agrees to maintain confidentiality of company information.

7. NON-COMPETE
   [If applicable, specify non-compete terms]

IN WITNESS WHEREOF, the parties have executed this Agreement.

_______________________          _______________________
Employer                          Employee

Date: _______________            Date: _______________`
}

function generateInvoice(details) {
  return `INVOICE

Invoice Number: INV-${Date.now()}
Date: ${new Date().toLocaleDateString()}

FROM:
[Your Business Name]
[Your Address]
[Contact Information]

TO:
[Client Name]
[Client Address]

DESCRIPTION OF SERVICES:

${details || '[Description of services or products provided]'}

ITEMIZED CHARGES:
[Item]                                    $[Amount]
[Item]                                    $[Amount]
[Item]                                    $[Amount]

SUBTOTAL:                                $[Amount]
TAX:                                     $[Amount]
TOTAL DUE:                               $[Amount]

PAYMENT TERMS:
Payment is due within [X] days of invoice date.

Thank you for your business!`
}

function generateCeaseDesist(details) {
  return `CEASE AND DESIST LETTER

[Your Name]
[Your Address]
[Date]

[Recipient Name]
[Recipient Address]

RE: Demand to Cease and Desist

Dear [Recipient Name],

I am writing to demand that you immediately cease and desist from [describe the activity].

${details || 'The specific conduct I am demanding you stop includes:'}

[Describe the specific conduct]

This conduct [violates my rights / is illegal / constitutes harassment / etc.].

If you do not cease this conduct immediately, I will be forced to take legal action against you, including but not limited to seeking injunctive relief and monetary damages.

I demand a written response within [X] days confirming that you will comply with this demand.

This letter is not a complete statement of my rights, and I reserve all rights and remedies available to me under the law.

Sincerely,

_______________________
[Your Signature]

[Your Printed Name]`
}

function generateComplaint(details) {
  return `FORMAL COMPLAINT LETTER

[Your Name]
[Your Address]
[Date]

[Organization Name]
[Organization Address]

RE: Formal Complaint Regarding [Subject]

Dear [Recipient],

I am writing to file a formal complaint regarding [subject matter].

${details || 'The details of my complaint are as follows:'}

[Describe the issue, including dates, times, and any relevant details]

I believe this matter violates [policy/law/agreement] and request that you:

1. [Action requested]
2. [Action requested]
3. [Action requested]

I expect a response within [X] business days. If this matter is not resolved satisfactorily, I will be forced to take further action, including [escalation steps].

Thank you for your attention to this matter.

Sincerely,

_______________________
[Your Signature]

[Your Printed Name]
[Contact Information]`
}

function generateSettlement(details) {
  return `SETTLEMENT AGREEMENT

This Settlement Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

PARTY 1:
[Name and Address]

PARTY 2:
[Name and Address]

RECITALS:
${details || 'The parties are involved in a dispute and wish to resolve it through this Agreement.'}

TERMS OF SETTLEMENT:

1. PAYMENT
   Party [X] agrees to pay Party [Y] the sum of $[Amount] as full settlement.

2. RELEASE
   Each party releases the other from all claims related to the dispute.

3. NO ADMISSION
   This Agreement does not constitute an admission of liability by either party.

4. CONFIDENTIALITY
   [If applicable, specify confidentiality terms]

5. FULL SATISFACTION
   This Agreement represents full satisfaction of all claims.

IN WITNESS WHEREOF, the parties have executed this Agreement.

_______________________          _______________________
Party 1                            Party 2

Date: _______________            Date: _______________`
}

function generatePartnership(details) {
  return `PARTNERSHIP AGREEMENT

This Partnership Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

PARTNER 1:
[Name and Address]

PARTNER 2:
[Name and Address]

1. PARTNERSHIP NAME
   The partnership shall be known as "[Partnership Name]".

2. BUSINESS PURPOSE
   ${details || 'The purpose of this partnership is [describe business purpose].'}

3. CAPITAL CONTRIBUTIONS
   Partner 1: $[Amount]
   Partner 2: $[Amount]

4. PROFIT AND LOSS DISTRIBUTION
   Profits and losses shall be shared [equally / as specified].

5. MANAGEMENT
   [Specify management structure and decision-making process]

6. TERM
   This partnership shall commence on [Date] and continue until terminated.

7. WITHDRAWAL
   [Specify terms for partner withdrawal]

8. DISSOLUTION
   [Specify dissolution procedures]

IN WITNESS WHEREOF, the parties have executed this Agreement.

_______________________          _______________________
Partner 1                          Partner 2

Date: _______________            Date: _______________`
}

function generateGenericDocument(type, details) {
  return `LEGAL DOCUMENT: ${type.toUpperCase()}

Generated on: ${new Date().toLocaleDateString()}

${details || 'This document has been generated based on the provided information. Please review and customize as needed.'}

NOTES:
- This is a template document
- Review with legal counsel before use
- Customize all bracketed placeholders
- Ensure compliance with local laws

[Document content would be generated here based on the specific type and details provided]`
}

