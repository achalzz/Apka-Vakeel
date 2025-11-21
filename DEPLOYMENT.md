# Deployment Guide - Apka Vakeel

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest & Free)

#### Method A: Using Vercel Website (No CLI needed)

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit: https://vercel.com
   - Sign up/Login with GitHub

3. **Import Project**:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

4. **Your site will be live** at: `https://your-project-name.vercel.app`

#### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# Your site will be live instantly!
```

---

### Option 2: Netlify (Also Easy & Free)

#### Method A: Using Netlify Website

1. **Push to GitHub** (if not already)

2. **Go to Netlify**:
   - Visit: https://netlify.com
   - Sign up/Login with GitHub

3. **Deploy**:
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Your site will be live** at: `https://your-project-name.netlify.app`

#### Method B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

### Option 3: GitHub Pages (Free)

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source: `gh-pages` branch
   - Your site: `https://username.github.io/repo-name`

---

### Option 4: Build and Host Manually

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to any hosting:
   - AWS S3
   - Google Cloud Storage
   - Any static hosting service

---

## Quick Start (Recommended: Vercel)

### Step 1: Commit your code
```bash
git add .
git commit -m "Ready for deployment"
```

### Step 2: Push to GitHub
```bash
git push origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your repository
5. Click "Deploy"

**Done!** Your site will be live in ~2 minutes.

---

## Custom Domain (Optional)

After deployment, you can add a custom domain:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management

---

## Environment Variables (If needed later)

When you add AI integration, add environment variables:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment Variables

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

