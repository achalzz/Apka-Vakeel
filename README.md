# Apka Vakeel

An AI-powered legal assistance platform designed to provide accessible legal guidance and document generation services.

## Project Overview

Apka Vakeel is a comprehensive full-stack application that leverages AI to help users understand their legal rights, analyze documents, and generate legal documents. The platform consists of:

- **Frontend**: Next.js-based web interface with TypeScript
- **Backend**: Node.js/Express server with Prisma ORM
- **AI Service**: Integrated AI capabilities for legal analysis and document processing
- **Database**: Configured with Prisma for data management

## Features

- 🤖 AI-powered legal consultation
- 📄 Document analysis and generation
- ⚖️ Legal rights information
- 💬 Interactive chat interface
- 🔐 User authentication (Sign in/Sign up)
- 📱 Responsive design with modern UI

## Tech Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Components**: React with custom UI components
- **Build Tool**: Next.js with ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Prisma ORM with PostgreSQL
- **File Handling**: Multer for document uploads

### AI Service
- Integrated AI models for legal analysis
- Document processing and generation
- Natural language processing for legal queries

## Project Structure

```
apka-vakeel/
├── frontend/          # Next.js web application
│   ├── app/           # App router and pages
│   ├── components/    # Reusable React components
│   ├── services/      # API integration
│   └── public/        # Static assets
├── backend/           # Express.js server
│   ├── routes/        # API routes
│   ├── controllers/   # Request handlers
│   ├── services/      # Business logic
│   ├── middleware/    # Express middleware
│   ├── prisma/        # Database schema and migrations
│   └── uploads/       # Uploaded files
├── ai-service/        # AI integration module
└── database/          # Database configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/achalzz/Apka-Vakeel.git
cd apka-vakeel
```

2. **Frontend Setup**
```bash
cd frontend
npm install
# Create .env.local with required environment variables
npm run dev
```

3. **Backend Setup**
```bash
cd ../backend
npm install
# Create .env with database connection and API keys
npx prisma migrate dev
npm start
```

### Environment Variables

#### Backend (.env)
```
DATABASE_URL=your_postgresql_connection_string
AI_API_KEY=your_ai_service_key
NODE_ENV=development
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

**Terminal 1 - Backend**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## Available Pages

- **Home** (`/`) - Landing page
- **Dashboard** (`/dashboard`) - User dashboard
- **Generator** (`/generator`) - Document generation
- **Rights** (`/rights`) - Legal rights information
- **Test** (`/test`) - Testing page

## API Routes

### AI Routes
- `POST /api/ai/*` - AI service endpoints

### Document Routes
- `GET /api/documents` - Fetch documents
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document

### Rights Routes
- `GET /api/rights` - Fetch legal rights information

## Database

The project uses Prisma ORM with PostgreSQL. Schema and migrations are located in `backend/prisma/`.

### Running Migrations
```bash
cd backend
npx prisma migrate dev
```

### View Database
```bash
cd backend
npx prisma studio
```

## Authentication

The application includes authentication pages:
- Sign In: `/sign-in`
- Sign Up: `/sign-up`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For more information, visit the [GitHub repository](https://github.com/achalzz/Apka-Vakeel).

---

**Note**: This application is intended for informational purposes and should not replace professional legal advice. Always consult with a qualified legal professional for specific legal matters.
