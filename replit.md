# 12-Week Fitness App

## Overview
A personalized 12-week fitness and nutrition training application built with React, Vite, and Tailwind CSS. This app was imported from GitHub and configured to run on Replit.

**Current State:** Fully functional and ready to use. The app generates personalized workout and meal plans based on user profile (gender, age, height, weight, goal, and difficulty level).

## Recent Changes (October 25, 2025)
- Imported from GitHub repository and set up for Replit environment
- Created missing component files (ProfileSetup, Dashboard, DailyRoutine, GroceryList)
- Created missing utility files (planGenerator.js, dayHelper.js)
- Configured Vite to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Fixed Tailwind CSS configuration for proper file scanning (excluding node_modules)
- Added script tag to index.html to load the React app
- Configured HMR (Hot Module Replacement) for Replit proxy compatibility
- Configured deployment settings for autoscale deployment
- Added .gitignore for Node.js project
- Installed @vitejs/plugin-react for React support in Vite

## Project Architecture

### Technology Stack
- **Frontend Framework:** React 19 with Vite 6
- **Styling:** Tailwind CSS 3.4 with custom color scheme
- **State Management:** React Hooks + LocalStorage
- **Build Tool:** Vite with HMR (Hot Module Replacement)

### File Structure
```
/
├── components/
│   ├── ProfileSetup.jsx      - User profile creation form
│   ├── Dashboard.jsx          - Week selection and overview
│   ├── DailyRoutine.jsx       - Daily workout and meal display
│   └── GroceryList.jsx        - Weekly grocery list generator
├── utils/
│   ├── planGenerator.js       - Generates 12-week fitness plans
│   └── dayHelper.js           - Helper for current day calculation
├── App.jsx                    - Main app component
├── main.jsx                   - React entry point
├── index.html                 - HTML template
├── index.css                  - Global styles and Tailwind imports
├── vite.config.js             - Vite configuration (port 5000, host 0.0.0.0)
├── tailwind.config.js         - Tailwind CSS configuration
└── package.json               - Dependencies and scripts
```

### Key Features
1. **Profile Setup** - Collects user information (gender, age, height, weight, goal, difficulty)
2. **12-Week Plan Generation** - Auto-generates unique workouts and meals for each week
3. **Daily Routine** - Shows Monday-Friday workouts and meals
4. **Meal Detail Modal** - Displays recipes, macros, prep time, and instructions
5. **Grocery List** - Auto-generated from weekly meals with ability to add custom items
6. **LocalStorage Persistence** - Saves user profile and progress

### Color Scheme
- **Primary:** #0B3D91 (Navy Blue)
- **Accent:** #D4AF37 (Gold)
- **Background:** #F8F6F0 (Beige/Cream)

## Development

### Running Locally
The app is configured to run automatically via the "Server" workflow on port 5000. To manually start:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment
The app is configured for Replit autoscale deployment:
- **Build:** `npm run build`
- **Run:** Vite preview server on port 5000
- **Type:** Autoscale (stateless web app)

## Data Storage
- **User Profile:** Stored in browser LocalStorage
- **Workout Plans:** Generated dynamically based on profile
- **Grocery Lists:** Generated from meal plans
- **No backend required** - fully client-side application

## User Preferences
- None recorded yet (first session after import)
