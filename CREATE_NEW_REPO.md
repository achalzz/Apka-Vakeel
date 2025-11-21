# Create New GitHub Repository for Apka-Vakeel

## Step 1: Create New Repository on GitHub

### Option A: Via GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `Apka-Vakeel` (or any name you prefer)
3. **Description** (optional): "AI-powered legal rights awareness and document generation tool"
4. **Visibility**: 
   - Choose **Public** (anyone can see)
   - Or **Private** (only you can see)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Option B: Via GitHub CLI (if installed)

```bash
gh repo create Apka-Vakeel --public --description "AI-powered legal rights awareness and document generation tool"
```

---

## Step 2: Update Git Remote

After creating the repository, GitHub will show you the repository URL. Use that to update your local git remote.

### Get the Repository URL
GitHub will show you something like:
```
https://github.com/achalzz/Apka-Vakeel.git
```

### Update Remote
```bash
cd /Users/achalsinghshekhawat/Downloads/cafe090/public/legalaic
git remote set-url origin https://github.com/achalzz/Apka-Vakeel.git
```

Or if you want to add it as a new remote:
```bash
git remote remove origin  # Remove old remote
git remote add origin https://github.com/achalzz/Apka-Vakeel.git
```

---

## Step 3: Verify Remote

```bash
git remote -v
```

Should show:
```
origin  https://github.com/achalzz/Apka-Vakeel.git (fetch)
origin  https://github.com/achalzz/Apka-Vakeel.git (push)
```

---

## Step 4: Push to New Repository

```bash
git push -u origin main
```

If you get an error about the branch name, try:
```bash
git push -u origin main:main
```

Or if your branch is named `master`:
```bash
git branch -M main  # Rename branch to main
git push -u origin main
```

---

## Complete Commands (Copy-Paste Ready)

```bash
# Navigate to project
cd /Users/achalsinghshekhawat/Downloads/cafe090/public/legalaic

# Update remote (replace with your actual new repo URL)
git remote set-url origin https://github.com/achalzz/Apka-Vakeel.git

# Verify remote
git remote -v

# Push to new repository
git push -u origin main
```

---

## After Pushing

Your project will be available at:
```
https://github.com/achalzz/Apka-Vakeel
```

---

## Troubleshooting

### If repository doesn't exist yet:
1. Create it first on GitHub: https://github.com/new
2. Then run the commands above

### If you get "repository not found" error:
- Check the repository name matches exactly
- Make sure you have access to the repository
- Verify the URL is correct

### If you get "branch protection" error:
- Make sure the repository exists
- Check if you're using the correct branch name (main vs master)

