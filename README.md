# 🎓 BIT Campus Copilot — Bharat Institute of Technology

> **Official Academic AI Copilot & Document RAG Assistant**
> *Motto: सिद्धिर्भवति कर्मजा (Success is born of hard work)*

---

## 🚀 One-Click Vercel Deployment

Deploy this project directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_USERNAME/bit-campus-copilot&project-name=bit-campus-copilot&repository-name=bit-campus-copilot)

---

## 📦 How to Push this Code to GitHub

Follow these simple steps from your terminal:

### 1. Initialize Git & Commit Code (Already configured)
```bash
# If not already initialized:
git init
git add .
git commit -m "Initial commit: BIT Campus Copilot with RAG and modular prompts"
```

### 2. Create a New Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Name your repository: `bit-campus-copilot` (or any name you prefer).
3. Leave it Public or Private, and do **NOT** initialize with README or license.
4. Click **Create repository**.

### 3. Push to your GitHub Repository
```bash
# Set your main branch
git branch -M main

# Link your remote repository (replace with your actual GitHub username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/bit-campus-copilot.git

# Push the code!
git push -u origin main
```

---

## ⚡ How to Deploy on Vercel from GitHub

### Option A: Via Vercel Web Dashboard (Recommended & Free)
1. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account.
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Under **"Import Git Repository"**, select `bit-campus-copilot` (the repo you just pushed).
4. **Project Configuration**:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
5. **Environment Variables** (Optional for Gemini AI grounding):
   - Key: `GEMINI_API_KEY`
   - Value: *(Your Google AI Studio Gemini API Key)*
   *(If omitted, the built-in client/server semantic RAG engine runs automatically with zero configuration!)*
6. Click **"Deploy"**!
   - In less than 1 minute, your site is live with a free `*.vercel.app` URL and custom domain support!

---

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🛠 Features Included
- **Official BIT Branding**: Circular emblem, Sanskrit motto *सिद्धिर्भवति कर्मजा*, and college color scheme.
- **Student Copilot Chat**: Document-grounded Q&A for DSA assignment deadlines, DBMS Unit 3 lecture notes, OS exam blueprints, and CSE notices.
- **Smart Follow-Ups**: Proactive cards for assignment study materials.
- **Admin Dashboard**: Upload PDFs/DOCXs/notes with automatic vector chunking.
- **Document Library**: Full BIT digital library with in-app reader.
- **Modular Prompts & Full Source Code Studio**: Complete 5-stage prompts and all 14 files for Java Servlets + JSP + MySQL + Python FastAPI microservices.
