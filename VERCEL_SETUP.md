# Connect Apka-Vakeel to Vercel - Step by Step Guide

## Method 1: Using Vercel Website (Easiest)

### Step 1: Go to Vercel
1. Visit: **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (recommended)

### Step 2: Import Your Project
1. After logging in, click **"Add New Project"** button
2. You'll see a list of your GitHub repositories
3. Find and select: **`achalzz/Apka-Vakeel`**
4. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect your Vite project, but verify these settings:

**Framework Preset:** `Vite` (should be auto-detected)

**Root Directory:** `./` (leave as default, or set to `public/legalaic` if needed)

**Build Command:** `npm run build` (should be auto-filled)

**Output Directory:** `dist` (should be auto-filled)

**Install Command:** `npm install` (should be auto-filled)

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait 1-2 minutes for the build to complete
3. Your site will be live! 🎉

### Step 5: Get Your Live Link
After deployment, you'll get:
- **Production URL**: `https://apka-vakeel.vercel.app` (or similar)
- You can customize the domain name in Project Settings

---

## Method 2: Using Vercel CLI

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser to authenticate.

### Step 3: Deploy from Project Directory
```bash
cd /Users/achalsinghshekhawat/Downloads/cafe090/public/legalaic
vercel
```

### Step 4: Follow Prompts
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time)
- **Project name?** → Press Enter (uses `apka-vakeel`)
- **Directory?** → Press Enter (current directory)
- **Override settings?** → No

### Step 5: Production Deploy
After initial deploy, deploy to production:
```bash
vercel --prod
```

---

## After Deployment

### Your Live URLs:
- **Production**: `https://apka-vakeel.vercel.app`
- **Preview**: Each commit gets a preview URL

### Custom Domain (Optional):
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `apkavakeel.com`)
3. Follow DNS configuration instructions

### Automatic Deployments:
- Every push to `main` branch = Automatic production deployment
- Pull requests = Preview deployments

---

## Troubleshooting

### If you get 404 errors:
1. Check Project Settings → General
2. Verify:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Check `vercel.json` exists with correct rewrite rules

### If build fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Check for any build errors locally: `npm run build`

---

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repository**: https://github.com/achalzz/Apka-Vakeel
- **Vercel Docs**: https://vercel.com/docs

---

## Next Steps After Deployment

1. ✅ Share your live link with others
2. ✅ Test all features on the live site
3. ✅ Set up custom domain (optional)
4. ✅ Configure environment variables (when adding AI integration)
5. ✅ Enable analytics (optional)

