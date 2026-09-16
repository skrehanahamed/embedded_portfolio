# SK Rehan Ahamed — Automotive Software Engineer Portfolio

A modern, high-performance personal portfolio website built with React 19, TypeScript, and Vite. Designed with an automotive cockpit & embedded systems visual aesthetic.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System
- **Icons**: Lucide React + Custom Automotive SVGs
- **Deployment Target**: Cloudflare Pages / Vercel / GitHub Pages

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### 3. Production Build
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.

---

## 📦 Upload to GitHub

Follow these steps in your terminal to initialize and push this codebase to a new GitHub repository:

```bash
# 1. Initialize git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete automotive portfolio website"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/skrehanahamed/portfolio-website.git

# 6. Push to GitHub
git push -u origin main
```

---

## ☁️ Deploy to Cloudflare Pages

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository: `portfolio-website`.
3. Configure the build settings:
   - **Project name**: `portfolio-website` (or your chosen name)
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank or default)
   - **Node.js version** (optional environment variable): `NODE_VERSION: 20`
4. Click **Save and Deploy**.

> **Note**: SPA redirects (`public/_redirects`) and caching headers (`public/_headers`) are already included in this repository.
