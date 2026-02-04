# Project Trends 2026

Interactive presentation of the "Decoding Digital Life" trend report.

## Features

- Fully interactive React application
- Animated statistics and charts (Recharts + Framer Motion)
- Smooth scroll navigation
- Responsive design
- All 4 trends with data visualizations
- 3 interactive future scenarios

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source → GitHub Actions
3. The included workflow will auto-deploy on push to main

### Option 2: Manual Deploy

1. Run `npm run build`
2. Upload the `dist` folder contents to your GitHub repo
3. Enable GitHub Pages pointing to the root

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)

## Project Structure

```
project-trends/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── logo.svg
└── src/
    ├── main.jsx
    ├── index.css
    └── App.jsx
```
