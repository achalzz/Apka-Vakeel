# Netlify + Railway Deployment Guide

This project is a monorepo with two deployable apps:

- `frontend/`: Next.js app, deploy to Netlify
- `backend/`: Express API, deploy to Railway

## Backend: Railway

1. Go to [Railway](https://railway.app) and create a new project from GitHub.
2. Select `achalzz/apka-vakeel`.
3. Set the service root directory to `/backend`.
4. Add these Railway environment variables:

```bash
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
AI_API_KEY=your_ai_service_key_if_used
JWT_SECRET=your_jwt_secret
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-site.netlify.app
```

Railway provides `PORT` automatically. The backend reads `process.env.PORT` and listens on `0.0.0.0`, which Railway requires for public networking.

If you use Prisma migrations, run this after Railway has `DATABASE_URL` configured:

```bash
npx prisma migrate deploy
```

## Frontend: Netlify

1. Go to [Netlify](https://netlify.com) and import the GitHub repo.
2. Use the repository root as the selected repo. The committed `netlify.toml` sets:

```toml
base = "frontend"
command = "npm run build"
publish = ".next"
```

3. Add these Netlify environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

4. Deploy the site.

## Final Wiring

After both services deploy:

1. Copy the Railway backend public URL.
2. Set Netlify `NEXT_PUBLIC_API_URL` to that Railway URL.
3. Copy the Netlify frontend URL.
4. Set Railway `CORS_ORIGIN` to that Netlify URL.
5. Redeploy both services.
6. Test:

```bash
curl https://your-railway-backend-url.up.railway.app/
```

The backend should return:

```json
{"status":"running","project":"Apka Vakeel Backend"}
```

## Notes

- Do not deploy the Express backend to Netlify as a static frontend site.
- Do not use localhost URLs in production environment variables.
- Keep `.env` and `.env.local` out of GitHub; set secrets only in Netlify and Railway dashboards.
