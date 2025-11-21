# Fixing 404 Error on Vercel

## The Issue
The 404 error usually happens because Vercel can't find the built files or the routing isn't configured correctly.

## Solution Steps

### Step 1: Update Vercel Configuration
The `vercel.json` has been updated. Make sure it's committed:
```bash
git add vercel.json
git commit -m "Fix Vercel configuration"
git push
```

### Step 2: Redeploy on Vercel

**Option A: Via Vercel Dashboard**
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Find your project
3. Click "Redeploy" or go to Settings → General
4. Make sure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Redeploy"

**Option B: Via CLI**
```bash
vercel --prod
```

### Step 3: Verify Build Settings in Vercel

In Vercel Dashboard → Project Settings → General:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `./` (or leave empty)

### Step 4: Check Routes

Make sure the `vercel.json` has the rewrite rule:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Alternative: Deploy Fresh

If still having issues, delete and redeploy:

1. **Delete current deployment** in Vercel dashboard
2. **Run**:
   ```bash
   vercel --prod
   ```
3. **Or** import fresh from GitHub on Vercel website

## Quick Test

Test locally first:
```bash
npm run build
npm run preview
```

Visit: http://localhost:4173
If this works, Vercel should work too!

