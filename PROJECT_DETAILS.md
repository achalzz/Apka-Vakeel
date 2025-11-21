# Apka Vakeel - Project Details
## आपका वकील | Your Personal Legal Assistant

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Design System](#design-system)
5. [Dataset & Data Structure](#dataset--data-structure)
6. [Technology Stack](#technology-stack)
7. [Project Structure](#project-structure)
8. [Features & Functionality](#features--functionality)
9. [AI Integration](#ai-integration)
10. [Deployment](#deployment)

---

## Project Overview

### Project Name
**Apka Vakeel** (आपका वकील) - "Your Lawyer" in Hindi

### Purpose
An AI-powered web application that democratizes access to legal information by helping Indian citizens understand their legal rights and generate professional legal documents.

### Mission
Bridge the legal services gap by providing accessible, affordable, and immediate legal guidance to citizens who cannot afford traditional legal services.

### Key Statistics Addressed
- 92% of low-income Americans receive inadequate or no legal help
- Over 40% of family law litigants appear in court without representation
- 32% of the UK population had an unmet legal need in 2024
- Legal fees are prohibitively expensive for a broad spectrum of people

---

## Frontend Architecture

### Framework & Core Technologies

#### React 18
- **Version**: 18.2.0
- **Architecture**: Functional components with Hooks
- **State Management**: Local component state (useState)
- **Pattern**: Component-based architecture

#### Build Tool: Vite
- **Version**: 5.0.8
- **Features**:
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ES modules support
  - Fast dev server

#### Routing: React Router DOM
- **Version**: 6.20.0
- **Routes**:
  - `/` - Home page
  - `/analysis` - Legal Rights Analysis
  - `/rights` - Know Your Rights (India)
  - `/documents` - Document Generator

### Frontend Components Structure

```
src/
├── components/
│   └── Header.jsx          # Navigation header with sticky behavior
├── pages/
│   ├── Home.jsx            # Landing page with hero section
│   ├── LegalAnalysis.jsx   # Legal rights analysis interface
│   ├── KnowYourRights.jsx  # Comprehensive rights reference
│   └── DocumentGenerator.jsx # Document generation interface
├── hooks/
│   ├── useScrollReveal.js  # Scroll animation hook
│   └── use3DTilt.js        # 3D card tilt effect hook
├── services/
│   ├── legalService.js     # Legal analysis service
│   └── documentService.js  # Document generation service
├── data/
│   └── indianRights.js    # Indian rights dataset
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
└── index.css               # Global styles and animations
```

### UI/UX Features

#### 1. Apple-like Smooth Scrolling
- Smooth scroll behavior
- Momentum scrolling for iOS
- Custom scrollbar styling
- Scroll reveal animations

#### 2. 3D Effects & Animations
- **3D Card Tilt**: Cards tilt based on mouse position
- **Floating Animations**: Continuous floating motion
- **Scroll Reveal**: Elements fade in and slide up on scroll
- **Staggered Animations**: Sequential appearance of grid items
- **Glassmorphism**: Frosted glass effects on cards
- **Gradient Animations**: Animated gradient backgrounds

#### 3. Interactive Elements
- Hover effects with 3D transforms
- Button animations with shimmer effects
- Icon rotations on hover
- Smooth transitions throughout

#### 4. Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactions
- Optimized for all screen sizes

### Styling System

#### Tailwind CSS
- **Version**: 3.3.6
- **Approach**: Utility-first CSS framework
- **Custom Configuration**:
  - Primary color palette (blue tones)
  - Legal-themed color palette
  - Custom animations
  - Extended theme values

#### Custom CSS Features
- 3D transforms and perspective
- Keyframe animations
- Backdrop filters (glassmorphism)
- Custom scrollbar styling
- Performance optimizations

### Icons & Assets

#### Lucide React
- **Version**: 0.294.0
- Modern, consistent icon set
- Lightweight and customizable
- Used for: Navigation, features, actions

---

## Backend Architecture

### Current Status
**Frontend-Only Application** (No backend currently implemented)

### Mock Services
The application currently uses mock services that simulate API responses:
- Simulated API delays (2-2.5 seconds)
- Structured mock data responses
- Ready for real API integration

### Future Backend Architecture (Planned)

#### Option 1: Node.js/Express Backend
```
Backend API (Node.js/Express)
├── Routes
│   ├── /api/legal/analyze
│   └── /api/documents/generate
├── Middleware
│   ├── Authentication
│   ├── Rate Limiting
│   └── Error Handling
├── Services
│   ├── AI Service Integration
│   ├── Caching Layer
│   └── Database Service
└── Utils
    ├── Prompt Engineering
    └── Response Formatting
```

#### Option 2: Python/FastAPI Backend
```
Backend API (Python/FastAPI)
├── Routes
│   ├── /api/legal/analyze
│   └── /api/documents/generate
├── Services
│   ├── OpenAI/Anthropic Integration
│   ├── Legal Knowledge Base
│   └── Document Templates
└── Database
    └── User Sessions (Optional)
```

### Backend Features (Planned)
1. **API Security**
   - API key management
   - Rate limiting
   - Input validation
   - CORS configuration

2. **AI Integration**
   - OpenAI GPT-4 integration
   - Anthropic Claude integration
   - Prompt engineering
   - Response caching

3. **Database** (Optional)
   - User sessions storage
   - Document history
   - Analytics tracking

4. **Performance**
   - Response caching
   - Request queuing
   - Load balancing

---

## Design System

### Color Palette

#### Primary Colors
- **Primary 50**: #f0f9ff (Lightest)
- **Primary 100**: #e0f2fe
- **Primary 200**: #bae6fd
- **Primary 300**: #7dd3fc
- **Primary 400**: #38bdf8
- **Primary 500**: #0ea5e9
- **Primary 600**: #0284c7 (Main)
- **Primary 700**: #0369a1
- **Primary 800**: #075985
- **Primary 900**: #0c4a6e (Darkest)

#### Legal Theme Colors
- **Legal 50-900**: Gray scale palette for professional look

### Typography
- **Headings**: Bold, large sizes (text-2xl to text-5xl)
- **Body**: Regular weight, readable sizes
- **Font Smoothing**: Antialiased for crisp rendering

### Spacing System
- Consistent spacing using Tailwind's scale
- Padding: p-4, p-6, p-8
- Margins: mb-4, mb-8, mb-16
- Gaps: gap-4, gap-8

### Component Styles

#### Cards
- White background with subtle shadows
- Rounded corners (rounded-xl)
- Border: border-gray-200
- Hover: Lift effect with enhanced shadow
- 3D tilt on mouse movement

#### Buttons
- **Primary**: Blue background, white text
- **Secondary**: White background, blue border
- Hover: Lift and scale effect
- Active: Pressed state
- Shimmer animation on hover

#### Forms
- Clean input fields
- Focus states with ring
- Smooth transitions
- Error states styling

### Animation System

#### Scroll Animations
- Fade in + slide up on scroll
- Staggered delays for grid items
- Smooth easing curves

#### Hover Animations
- 3D transforms
- Scale effects
- Shadow enhancements
- Color transitions

#### Background Animations
- Blob animations
- Gradient shifts
- Floating elements

### Design Principles
1. **Accessibility First**: Plain language, clear navigation
2. **Modern & Clean**: Minimal, professional aesthetic
3. **Interactive**: Engaging animations and effects
4. **Responsive**: Works on all devices
5. **Performance**: Optimized for speed

---

## Dataset & Data Structure

### Indian Rights Dataset

#### Location
`src/data/indianRights.js`

#### Structure
Comprehensive database of Indian legal rights organized by categories:

1. **Fundamental Rights** (Articles 12-35)
   - 20+ constitutional rights
   - Article numbers and descriptions
   - Detailed explanations

2. **Consumer Rights** (Consumer Protection Act, 2019)
   - 6 consumer rights
   - Right to safety, information, choice, etc.

3. **Women's Rights**
   - 7+ specific rights
   - Domestic violence protection
   - Property rights
   - Maternity rights

4. **Labor Rights**
   - Employment rights
   - Fair wages
   - Safe working conditions
   - Social security

5. **Environmental Rights**
   - Right to clean environment
   - Environmental information
   - Redressal mechanisms

6. **Right to Information (RTI)**
   - RTI Act, 2005
   - Access to information
   - Appeal rights

7. **Digital Rights**
   - Privacy rights
   - Data protection
   - Digital access

8. **Legal Rights**
   - Legal aid
   - Fair trial
   - Speedy trial
   - Bail rights

9. **Healthcare Rights**
   - Right to health
   - Informed consent
   - Medical records

10. **Education Rights**
    - Free education
    - Quality education
    - Reservation rights

11. **Marriage Rights**
    - 20+ marriage-related rights
    - Divorce rights
    - Maintenance rights
    - Property rights in marriage
    - Protection against dowry and domestic violence

### Data Format
```javascript
{
  categoryName: {
    title: "Category Title",
    description: "Category description",
    rights: [
      {
        article: "Article Number (if applicable)",
        title: "Right Title",
        description: "Brief description",
        details: ["Detail 1", "Detail 2", ...]
      }
    ]
  }
}
```

### Search Functionality
- Keyword-based search
- Searches across all categories
- Returns relevant rights with context
- Case-insensitive matching

### Data Statistics
- **Total Categories**: 11
- **Total Rights**: 100+ individual rights
- **Constitutional Articles**: 20+ articles covered
- **Legal Acts Referenced**: 15+ acts

---

## Technology Stack

### Frontend Dependencies

#### Core
- **react**: ^18.2.0 - UI framework
- **react-dom**: ^18.2.0 - React DOM renderer
- **react-router-dom**: ^6.20.0 - Client-side routing

#### Utilities
- **axios**: ^1.6.2 - HTTP client (for future API calls)
- **lucide-react**: ^0.294.0 - Icon library

### Development Dependencies

#### Build Tools
- **vite**: ^5.0.8 - Build tool and dev server
- **@vitejs/plugin-react**: ^4.2.1 - Vite React plugin

#### Styling
- **tailwindcss**: ^3.3.6 - CSS framework
- **postcss**: ^8.4.32 - CSS processor
- **autoprefixer**: ^10.4.16 - CSS vendor prefixing

#### Code Quality
- **eslint**: ^8.55.0 - Code linting
- **eslint-plugin-react**: ^7.33.2 - React linting rules
- **eslint-plugin-react-hooks**: ^4.6.0 - React Hooks linting
- **eslint-plugin-react-refresh**: ^0.4.5 - Fast Refresh support

#### Type Definitions
- **@types/react**: ^18.2.43 - React TypeScript definitions
- **@types/react-dom**: ^18.2.17 - React DOM TypeScript definitions

### Development Tools
- **Node.js**: 18+ required
- **npm/yarn**: Package manager
- **Git**: Version control

---

## Project Structure

### Complete File Structure

```
apka-vakeel/
├── src/
│   ├── components/
│   │   └── Header.jsx              # Navigation header
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── LegalAnalysis.jsx       # Legal analysis page
│   │   ├── KnowYourRights.jsx      # Rights reference page
│   │   └── DocumentGenerator.jsx   # Document generator page
│   ├── hooks/
│   │   ├── useScrollReveal.js      # Scroll animation hook
│   │   └── use3DTilt.js            # 3D tilt effect hook
│   ├── services/
│   │   ├── legalService.js         # Legal analysis service
│   │   └── documentService.js      # Document generation service
│   ├── data/
│   │   └── indianRights.js         # Indian rights dataset
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App-specific styles
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── memory-bank/                    # Project documentation
│   ├── activeContext.md
│   ├── productContext.md
│   ├── progress.md
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   └── techContext.md
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── package-lock.json               # Lock file
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore rules
├── .cursorrules                    # Cursor IDE rules
└── README.md                       # Project documentation
```

### Key Files Description

#### Configuration Files
- **vite.config.js**: Vite build configuration
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS plugins configuration
- **.eslintrc.cjs**: ESLint rules and settings

#### Source Files
- **main.jsx**: Application entry point, renders App component
- **App.jsx**: Main application component with routing
- **index.css**: Global styles, animations, utilities

#### Component Files
- **Header.jsx**: Sticky navigation header with blur effect
- **Home.jsx**: Landing page with hero, features, CTA
- **LegalAnalysis.jsx**: Legal rights analysis interface
- **KnowYourRights.jsx**: Comprehensive rights browser
- **DocumentGenerator.jsx**: Document generation interface

#### Service Files
- **legalService.js**: Handles legal analysis logic
- **documentService.js**: Handles document generation

#### Data Files
- **indianRights.js**: Complete Indian rights database

#### Hook Files
- **useScrollReveal.js**: Intersection Observer for scroll animations
- **use3DTilt.js**: 3D mouse tracking for card tilt

---

## Features & Functionality

### 1. Legal Rights Analysis

#### Functionality
- User describes their legal situation
- AI analyzes and provides relevant rights
- Context-aware rights matching
- Structured response with:
  - Relevant legal rights
  - Available options
  - Recommended actions
  - Important warnings
  - Next steps

#### Technical Implementation
- Keyword extraction from user input
- Rights database search
- Context-specific recommendations
- Mock service (ready for AI integration)

### 2. Know Your Rights

#### Functionality
- Comprehensive rights reference
- Searchable database
- Categorized by type
- Expandable sections
- Article references

#### Categories
- Fundamental Rights
- Consumer Rights
- Women's Rights
- Labor Rights
- Environmental Rights
- RTI Rights
- Digital Rights
- Legal Rights
- Healthcare Rights
- Education Rights
- Marriage Rights

### 3. Document Generation

#### Supported Document Types
1. Contract
2. Legal Letter
3. NDA (Non-Disclosure Agreement)
4. Will
5. Power of Attorney
6. Lease Agreement
7. Employment Contract
8. Invoice
9. Cease and Desist Letter
10. Complaint Letter
11. Settlement Agreement
12. Partnership Agreement

#### Features
- Document type selection
- Custom details input
- Professional templates
- Preview before download
- Download as text file

### 4. UI/UX Features

#### Animations
- Scroll reveal animations
- 3D card tilt effects
- Floating animations
- Staggered grid animations
- Button hover effects
- Icon rotations

#### Interactions
- Smooth scrolling
- Sticky header with blur
- Hover effects
- Loading states
- Error handling
- Success feedback

---

## AI Integration

### Current Status
**Mock Services** - Simulates AI responses for demonstration

### Integration Options

#### Option 1: OpenAI GPT-4
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
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

### Prompt Engineering (Planned)
- System prompts for legal accuracy
- Context-aware prompts
- Indian law-specific prompts
- Document generation templates

### API Integration Points
1. **Legal Analysis**: `/api/legal/analyze`
2. **Document Generation**: `/api/documents/generate`

---

## Deployment

### Current Deployment
**Frontend-Only** - Static site hosting

### Deployment Options

#### Static Hosting
- **Vercel**: Recommended for React apps
- **Netlify**: Easy deployment with CI/CD
- **GitHub Pages**: Free hosting
- **AWS S3 + CloudFront**: Scalable hosting

#### With Backend (Future)
- **Vercel Serverless**: API routes
- **Railway**: Full-stack deployment
- **Render**: Backend + frontend
- **AWS**: EC2/Lambda deployment

### Environment Variables

#### Development
```env
VITE_API_URL=http://localhost:3001
VITE_OPENAI_API_KEY=sk-...
VITE_ANTHROPIC_API_KEY=...
```

#### Production
```env
VITE_API_URL=https://api.apkavakeel.com
VITE_OPENAI_API_KEY=sk-...
```

### Build Process
```bash
npm run build
```
- Outputs to `dist/` directory
- Optimized and minified
- Ready for production

---

## Performance Optimizations

### Implemented
1. **Code Splitting**: Ready for React.lazy
2. **Image Optimization**: Placeholder for future images
3. **CSS Optimization**: Tailwind purging unused styles
4. **Animation Performance**: GPU-accelerated transforms
5. **Scroll Performance**: Passive event listeners
6. **Bundle Size**: Optimized dependencies

### Future Optimizations
1. Lazy loading components
2. API response caching
3. Service worker for offline support
4. Image lazy loading
5. Route-based code splitting

---

## Security Considerations

### Current (Frontend Only)
- No sensitive data stored
- No authentication required
- Public-facing application

### Future (With Backend)
- API key security (server-side only)
- Rate limiting
- Input validation
- CORS configuration
- User authentication
- Data encryption
- HTTPS enforcement

---

## Browser Support

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Features Used
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- CSS Transforms and Animations

### Not Supported
- Internet Explorer 11
- Older browsers without ES6 support

---

## Future Enhancements

### Planned Features
1. **User Authentication**
   - User accounts
   - Session management
   - Document history

2. **Backend API**
   - Real AI integration
   - Database for sessions
   - Analytics tracking

3. **Enhanced Features**
   - Document editing
   - PDF/DOCX export
   - Multi-language support
   - Chat interface

4. **Payment System**
   - Subscription plans
   - Usage tracking
   - Free tier limits

5. **Additional Document Types**
   - More legal documents
   - Custom templates
   - Document library

---

## Project Statistics

### Code Metrics
- **Total Files**: 20+ source files
- **Components**: 5 main components
- **Pages**: 4 pages
- **Hooks**: 2 custom hooks
- **Services**: 2 service files
- **Data Entries**: 100+ rights entries

### Lines of Code (Approximate)
- **React Components**: ~1,500 lines
- **Services**: ~600 lines
- **Data**: ~1,000 lines
- **Styles**: ~500 lines
- **Total**: ~3,600+ lines

---

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Development
- Hot Module Replacement enabled
- Fast refresh for React components
- Real-time error reporting

### Building
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## Documentation

### Available Documentation
1. **README.md**: Getting started guide
2. **Memory Bank**: Comprehensive project docs
3. **Code Comments**: Inline documentation
4. **This Document**: Complete project overview

### Documentation Structure
- Project brief
- Product context
- Technical context
- System patterns
- Active context
- Progress tracking

---

## Contact & Support

### Project Information
- **Name**: Apka Vakeel (आपका वकील)
- **Purpose**: Legal Rights Awareness & Document Generation
- **Target**: Indian Citizens
- **Status**: Active Development

### Legal Disclaimer
This tool provides informational content and document templates only. It does not constitute legal advice. Users should consult with qualified attorneys for complex legal matters.

---

**Document Generated**: 2024
**Project Version**: 1.0.0
**Last Updated**: Current

