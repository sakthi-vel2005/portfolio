# Sakthivel V — 3D Portfolio

React + Vite + Three.js (React Three Fiber / Drei) + GSAP ScrollTrigger + Framer Motion + Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview
```
Requires Node 18+.

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: 3D portfolio"
git branch -M main
git remote add origin https://github.com/sakthi-vel2005/sakthivel-3d-portfolio.git
git push -u origin main
```
(Create the empty repo on github.com first.)

## Deploy to Vercel
1. vercel.com → Add New → Project → import the GitHub repo.
2. Framework preset: Vite (auto-detected). Build: `npm run build`. Output: `dist`.
3. Deploy.

## Editing content
All text lives in `src/data.js`. To show a GitHub button on a project, set its `github` field to the repo URL.
Resume: `public/resume/Sakthivel_V_Resume.pdf`. Portrait: `public/images/portrait-*.webp`.
