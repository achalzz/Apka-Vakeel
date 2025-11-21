# Apka Vakeel - आपका वकील | Personal Legal Rights Awareness Tool

An AI-powered web application that helps individuals understand their legal rights and generate legal documents. Apka Vakeel (Your Lawyer) democratizes access to legal information by providing instant, accessible, and affordable legal guidance.

## Features

- **Legal Rights Analysis**: Describe your legal situation and receive comprehensive analysis of your rights and options
- **Document Generation**: Generate professional legal documents including:
  - Contracts
  - Legal Letters
  - NDAs (Non-Disclosure Agreements)
  - Wills
  - Power of Attorney
  - Lease Agreements
  - Employment Contracts
  - Invoices
  - Cease and Desist Letters
  - Complaint Letters
  - Settlement Agreements
  - Partnership Agreements
- **24/7 Access**: Available anytime, anywhere
- **User-Friendly Interface**: Modern, intuitive design that doesn't require legal knowledge

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
apka-vakeel/
├── src/
│   ├── components/       # Reusable React components
│   │   └── Header.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── LegalAnalysis.jsx
│   │   └── DocumentGenerator.jsx
│   ├── services/         # API/service layer
│   │   ├── legalService.js
│   │   └── documentService.js
│   ├── App.jsx           # Main app component
│   ├── App.css
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## AI Integration

Currently, the application uses mock services for demonstration. To integrate with actual AI services:

1. **OpenAI Integration**: Update `legalService.js` and `documentService.js` to use OpenAI API
2. **Anthropic Claude**: Similar integration pattern
3. **Custom Backend**: Create a backend API that handles AI requests

### Example Integration (OpenAI)

```javascript
// In legalService.js
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a legal rights advisor...' },
      { role: 'user', content: situation }
    ]
  })
})
```

## Environment Variables

Create a `.env` file for API keys:

```
VITE_OPENAI_API_KEY=your_key_here
# or
VITE_ANTHROPIC_API_KEY=your_key_here
```

## Legal Disclaimer

This tool provides informational content and document templates only. It does not constitute legal advice. Users should consult with qualified attorneys for complex legal matters. Generated documents are templates and should be reviewed by legal professionals before use.

## Contributing

This is a demonstration project. For production use, consider:

1. Adding user authentication
2. Implementing backend API for AI services
3. Adding database for saving user sessions
4. Implementing payment/subscription system
5. Adding more document types
6. Improving AI prompts for better accuracy
7. Adding multi-language support
8. Implementing document editing capabilities

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

