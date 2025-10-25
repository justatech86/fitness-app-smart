# 12-Week Fitness App

## Overview
A personalized 12-week FBI PFT (Physical Fitness Test) training application built with React, Vite, and Tailwind CSS. This app provides a structured training program designed to help users achieve or exceed FBI PFT standards through a comprehensive 3-phase approach combining cardio, strength, and tactical conditioning.

**Current State:** Fully functional and ready to use. The app generates the FBI PFT training plan with personalized nutrition based on user profile (gender, age, height, weight, goal, and rest day preference).

## Recent Changes (October 25, 2025)

### FBI PFT Training Plan Integration
- **Integrated FBI PFT 12-week structured training program** with 3 distinct phases:
  - Phase 1 (Weeks 1-4): Foundation & Endurance
  - Phase 2 (Weeks 5-8): Power & Performance
  - Phase 3 (Weeks 9-12): Simulation & Peak Readiness
- Created `fbiPlanData.js` with complete workout data organized by phase, week, and day
- Refactored `planGenerator.js` to use structured FBI plan instead of random workouts
- Updated `DailyRoutine.jsx` to display cardio and strength exercises separately with visual indicators
- Each training day includes specific cardio and strength components based on FBI PFT requirements

### Week Structure & Customization
- Full 7-day week (Sunday-Saturday) with 6 training days + 1 rest/cheat day
- User-selectable rest/cheat day (defaults to Saturday)
- Imperial measurements: feet/inches for height, pounds for weight
- Automatic conversion to metric for internal calculations

### Previous Setup Changes
- Imported from GitHub repository and set up for Replit environment
- Created missing component files (ProfileSetup, Dashboard, DailyRoutine, GroceryList)
- Created missing utility files (planGenerator.js, dayHelper.js, fbiPlanData.js)
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
│   ├── ProfileSetup.jsx      - User profile creation form (imperial units, rest day selection)
│   ├── Dashboard.jsx          - Week selection and overview
│   ├── DailyRoutine.jsx       - Daily workout and meal display (cardio/strength split view)
│   └── GroceryList.jsx        - Weekly grocery list generator
├── utils/
│   ├── fbiPlanData.js         - FBI PFT 12-week structured training data (3 phases)
│   ├── planGenerator.js       - Generates FBI PFT plan + personalized nutrition
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
1. **Profile Setup** - Collects user information (gender, age, height in feet/inches, weight in lbs, goal, rest day)
2. **FBI PFT Training Plan** - Structured 12-week program with 3 phases targeting FBI fitness standards
3. **Daily Routine** - Shows 7-day week with detailed cardio and strength workouts + meal plans
4. **Meal Detail Modal** - Displays recipes, macros, prep time, and instructions
5. **Grocery List** - Auto-generated from weekly meals with ability to add custom items
6. **Rest/Cheat Day** - User-customizable rest day (any day of the week)
7. **LocalStorage Persistence** - Saves user profile and progress

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
