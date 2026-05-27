# Vercel Deployment Guide

## Recommended Deployment Strategy

Vercel is optimized for **frontend deployments only**. For your Apka Vakeel project, we recommend:

1. **Frontend**: Deploy Next.js app on Vercel (free tier available)
2. **Backend**: Deploy Express.js on Railway, Render, or Fly.io

This approach is:
- ✅ Easier to manage and scale
- ✅ Better performance
- ✅ Independent deployment cycles
- ✅ Works with free/paid tiers

## Option 1: Frontend Only on Vercel (RECOMMENDED)

### Step 1: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `apka-vakeel` repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

7. Deploy! 🚀

### Step 2: Deploy Backend to Railway/Render

**Using Railway (Recommended):**
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Configure environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   AI_API_KEY=your_ai_service_key
   NODE_ENV=production
   ```
5. Set Root Directory: `backend`
6. Deploy!

---

## Option 2: Both on Vercel (Advanced)

If you want to keep both on Vercel, you need to convert the Express backend to Vercel Functions:

### Setup Steps:

1. Create `api/` directory in `backend/`:
```
backend/
├── api/
│   └── [...].js          # Catch-all for API routes
├── package.json
├── server.js
└── ...
```

2. Convert Express routes to Vercel Functions format

3. Use the provided `vercel.json` configuration

**Note**: This approach has limitations:
- 10-second max execution time (paid tier: 60 seconds)
- Limited memory (3008 MB max)
- Cold start delays

---

## Environment Variables Setup

### Frontend (.env.local in Vercel Dashboard)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Backend (.env in Vercel Dashboard)
```
DATABASE_URL=postgresql://user:password@host/dbname
AI_API_KEY=your_ai_key
NODE_ENV=production
```

---

## Database Configuration

For PostgreSQL database, use one of:
- **Supabase** (free tier with PostgreSQL)
- **Railway PostgreSQL** (free tier)
- **Vercel Postgres** (native Vercel integration)

Update `DATABASE_URL` in your backend environment variables.

---

## Deployment Checklist

- [ ] Remove any local files (uploads, tmp files)
- [ ] Set all environment variables in hosting platform
- [ ] Database migrations run successfully (`npx prisma migrate deploy`)
- [ ] Backend API URL updated in frontend
- [ ] CORS configured in backend for Vercel domain
- [ ] Test API endpoints after deployment

---

## Quick Deploy Commands

For Railway/Render deployments, ensure your `backend/package.json` has:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npm install"
  }
}
```

---

## After Deployment

1. Test your live application
2. Monitor logs on the hosting platform
3. Set up error tracking (Sentry, DataDog)
4. Configure custom domains if needed
