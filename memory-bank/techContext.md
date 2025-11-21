# Technical Context: LegalAI

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### HTTP Client
- **Axios**: For API calls (when backend is implemented)

## Architecture

### Current Structure (Frontend Only)
```
Frontend (React SPA)
├── Components (Header, etc.)
├── Pages (Home, LegalAnalysis, DocumentGenerator)
├── Services (legalService, documentService)
└── Styling (Tailwind CSS)
```

### Future Architecture (With Backend)
```
Frontend (React SPA)
    ↓
Backend API (Node.js/Python)
    ↓
AI Service (OpenAI/Anthropic)
    ↓
Database (Optional - for user sessions)
```

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
- Runs on `http://localhost:3000`
- Hot module replacement enabled

### Build
```bash
npm run build
```
- Outputs to `dist/` directory
- Optimized for production

## Key Technical Decisions

### 1. React + Vite
- Fast development experience
- Modern tooling
- Good performance
- Easy to deploy

### 2. Tailwind CSS
- Rapid UI development
- Consistent design system
- Responsive by default
- Small bundle size

### 3. Service Layer Pattern
- Separates API logic from components
- Easy to swap mock services for real APIs
- Testable architecture
- Clear separation of concerns

### 4. Mock Services (Current)
- Allows development without API keys
- Demonstrates functionality
- Easy to replace with real APIs
- No external dependencies for demo

## AI Integration Approach

### Current: Mock Services
- Simulates API delays
- Returns structured mock data
- Demonstrates UI/UX flow
- No external API required

### Future: Real AI Integration

#### Option 1: OpenAI
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [...]
  })
})
```

#### Option 2: Anthropic Claude
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'claude-3-opus-20240229',
    messages: [...]
  })
})
```

#### Option 3: Backend Proxy
- Frontend calls backend API
- Backend handles AI service calls
- Better security (API keys not exposed)
- Can add caching, rate limiting, etc.

## Environment Variables

### Development
```env
VITE_API_URL=http://localhost:3001
VITE_OPENAI_API_KEY=sk-...
```

### Production
```env
VITE_API_URL=https://api.apkavakeel.com
VITE_OPENAI_API_KEY=sk-...
```

## File Structure

```
apka-vakeel/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API/service layer
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── memory-bank/             # Project documentation
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Dependencies

### Production
- `react`, `react-dom`: UI framework
- `react-router-dom`: Routing
- `axios`: HTTP client
- `lucide-react`: Icons

### Development
- `@vitejs/plugin-react`: Vite React plugin
- `tailwindcss`: CSS framework
- `postcss`, `autoprefixer`: CSS processing
- `eslint`: Code linting

## Deployment Considerations

### Static Hosting (Current)
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### With Backend
- Vercel (serverless functions)
- Railway
- Render
- AWS (EC2/Lambda)
- Google Cloud Platform

## Security Considerations

### Current (Frontend Only)
- No sensitive data stored
- No authentication required
- Public-facing

### Future (With Backend)
- API key security (never expose in frontend)
- Rate limiting
- Input validation
- CORS configuration
- User authentication (if needed)
- Data encryption

## Performance Considerations

- Code splitting (React.lazy)
- Image optimization
- API response caching
- Lazy loading components
- Bundle size optimization

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- CSS Grid and Flexbox
- No IE11 support needed

