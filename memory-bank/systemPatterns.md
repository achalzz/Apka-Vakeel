# System Patterns: LegalAI

## Architecture Patterns

### 1. Service Layer Pattern
**Location**: `src/services/`

Services handle all external API communication and business logic, keeping components clean and focused on presentation.

```javascript
// Component uses service
const result = await legalRightsService.analyzeSituation(situation)

// Service handles API logic
export const legalRightsService = {
  async analyzeSituation(situation) {
    // API call logic here
  }
}
```

**Benefits**:
- Separation of concerns
- Easy to test
- Easy to swap implementations (mock → real API)
- Reusable across components

### 2. Component Composition
**Pattern**: Small, focused components composed into pages

```
App
├── Header (navigation)
└── Routes
    ├── Home (landing page)
    ├── LegalAnalysis (main feature)
    └── DocumentGenerator (main feature)
```

**Benefits**:
- Reusable components
- Easy to maintain
- Clear component hierarchy

### 3. Mock-First Development
**Pattern**: Start with mock services, replace with real APIs later

**Current**: Mock services simulate API responses
**Future**: Replace with actual AI API calls

**Benefits**:
- Development without API keys
- Faster iteration
- UI/UX testing
- Easy to demonstrate

## Design Patterns

### 1. Controlled Components
All form inputs are controlled components with React state:

```javascript
const [situation, setSituation] = useState('')
<input value={situation} onChange={(e) => setSituation(e.target.value)} />
```

### 2. Loading States
Consistent loading state pattern across the app:

```javascript
const [loading, setLoading] = useState(false)
{loading ? <Loader /> : <Content />}
```

### 3. Error Handling
Error state pattern with user-friendly messages:

```javascript
const [error, setError] = useState(null)
{error && <ErrorDisplay message={error} />}
```

### 4. Conditional Rendering
Results shown conditionally after successful operations:

```javascript
{analysis && <AnalysisResults data={analysis} />}
```

## UI/UX Patterns

### 1. Card-Based Layout
Information organized in cards for clarity:

```javascript
<div className="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

### 2. Status Indicators
Color-coded status messages:
- Green: Success
- Yellow: Warning
- Red: Error
- Blue: Information

### 3. Progressive Disclosure
Information revealed as user progresses:
1. Input form
2. Loading state
3. Results display

### 4. Clear CTAs
Prominent call-to-action buttons:
- Primary actions: `btn-primary`
- Secondary actions: `btn-secondary`

## Data Flow Patterns

### 1. Unidirectional Data Flow
```
User Input → State Update → Service Call → State Update → UI Update
```

### 2. Async Operations
All API calls use async/await pattern:

```javascript
const handleSubmit = async (e) => {
  setLoading(true)
  try {
    const result = await service.call()
    setResult(result)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
```

## Routing Pattern

### React Router
- Client-side routing
- Route-based component rendering
- Navigation via Link components
- Active route highlighting

## Styling Patterns

### Tailwind Utility Classes
- Consistent spacing (p-4, mb-6, etc.)
- Color system (primary-600, gray-900, etc.)
- Responsive design (md:grid-cols-3, etc.)
- Custom component classes (btn-primary, card, etc.)

### CSS Custom Properties
Defined in `tailwind.config.js`:
- Primary color palette
- Legal-themed color palette
- Extended theme values

## Component Relationships

```
App (Router)
├── Header
│   └── Navigation Links
└── Routes
    ├── Home
    │   └── Feature Cards
    ├── LegalAnalysis
    │   ├── Form (controlled)
    │   ├── Loading State
    │   ├── Error State
    │   └── Results Display
    └── DocumentGenerator
        ├── Document Type Selector
        ├── Details Form
        ├── Loading State
        ├── Error State
        └── Document Preview
```

## Service Relationships

```
Components
    ↓
Services (legalService, documentService)
    ↓
API Layer (future)
    ↓
AI Services (OpenAI/Anthropic)
```

## State Management Pattern

### Local Component State
- Each component manages its own state
- No global state management needed (yet)
- useState hooks for simple state
- Future: Consider Context API or Redux if state becomes complex

## Error Handling Pattern

### Try-Catch Blocks
All async operations wrapped in try-catch:

```javascript
try {
  const result = await service.call()
  setResult(result)
} catch (err) {
  setError(err.message)
}
```

### User-Friendly Messages
Errors displayed with clear, actionable messages

## Future Patterns to Consider

### 1. Context API
For shared state (user, theme, etc.)

### 2. Custom Hooks
Extract reusable logic:
- `useLegalAnalysis()`
- `useDocumentGeneration()`

### 3. Form Validation
Library like Formik or React Hook Form

### 4. API Client
Centralized API client with interceptors:
- Request/response logging
- Error handling
- Token management

### 5. Caching
Cache API responses:
- React Query
- SWR
- Custom cache implementation

