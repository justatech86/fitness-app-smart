# 12-Week Fitness App

## Overview
A personalized 12-week fitness training application built with React, Vite, and Tailwind CSS. This app offers two training plan options: an algorithmic system that dynamically generates workouts based on your unique profile, or the structured FBI PFT (Physical Fitness Test) program. Both plans include personalized nutrition tailored to your goals.

**Current State:** Fully functional and ready to use. The app generates personalized training and nutrition plans based on user profile (gender, age, height, weight, goal, difficulty level, and rest day preference).

## Recent Changes (October 25, 2025)

### Algorithmic Workout System
- **Created intelligent workout algorithm** that generates personalized workouts based on:
  - User profile (gender, age, height, weight)
  - Fitness goal (weight loss, muscle gain, maintenance)
  - Difficulty level (beginner, intermediate, advanced)
  - Progressive overload (workouts intensify each week)
- Calculates BMI and BMR (Basal Metabolic Rate) for personalized recommendations
- Age-adjusted heart rate zones for optimal cardio training
- Goal-specific rep schemes (higher reps for weight loss, lower for muscle gain)
- 6-day training split tailored to each goal:
  - **Weight Loss:** Cardio-focused with full body circuits
  - **Muscle Gain:** Strength-focused with targeted muscle groups
  - **Maintenance:** Balanced approach with variety
- Created `workoutAlgorithm.js` with comprehensive exercise database

### FBI PFT Training Plan Integration
- **Added FBI PFT option** as alternative to algorithmic workouts
- Integrated 12-week structured FBI PFT program with 3 distinct phases:
  - Phase 1 (Weeks 1-4): Foundation & Endurance
  - Phase 2 (Weeks 5-8): Power & Performance
  - Phase 3 (Weeks 9-12): Simulation & Peak Readiness
- Created `fbiPlanData.js` with complete workout data organized by phase, week, and day
- Users can choose between Algorithmic or FBI PFT plan in profile setup
- Both plans display cardio and strength exercises separately with visual indicators

### Food Sensitivity Filtering System
- **Comprehensive allergen management** with checkbox selections for:
  - Gluten, Fish, Dairy, Soy, Nuts, Eggs
- Created extensive meal database (`mealDatabase.js`) with 60+ meals tagged by allergen content
- Intelligent meal filtering excludes all meals containing selected sensitivities
- Multiple alternative meals for each goal and meal type ensure variety
- Filtered meals maintain proper macro balance for your fitness goal
- **Grocery list automatically updated** to exclude ingredients from allergen-containing meals
- System ensures safe, personalized nutrition without manual ingredient checking

### Personalized Macro Calculator
- **Algorithmic nutrition system** that calculates personalized macros based on:
  - User profile (gender, age, height, weight)
  - Fitness goal (weight loss creates 500 cal deficit, muscle gain creates 400 cal surplus)
  - Training plan type (FBI PFT = very active, Algorithmic = moderately active)
- Calculates BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
- Calculates TDEE (Total Daily Energy Expenditure) with activity multiplier
- Goal-specific macro splits:
  - **Weight Loss:** 35% protein, 40% carbs, 25% fat
  - **Muscle Gain:** 30% protein, 45% carbs, 25% fat
  - **Maintenance:** 30% protein, 40% carbs, 30% fat
- Displays personalized daily targets and per-meal breakdowns
- All meals automatically adjusted to match calculated macros
- Works seamlessly with food sensitivity filtering to provide safe, personalized nutrition
- Created `nutritionAlgorithm.js` with comprehensive nutrition calculations

### Exercise Completion Tracking
- Added clickable checkboxes for each exercise
- Visual feedback with strikethrough for completed exercises
- Progress saved to localStorage for persistence

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
│   ├── ProfileSetup.jsx       - User profile creation form (imperial units, rest day, food sensitivities)
│   ├── Dashboard.jsx          - Week selection and overview
│   ├── DailyRoutine.jsx       - Daily workout and meal display (cardio/strength split view)
│   ├── GroceryList.jsx        - Weekly grocery list generator (auto-filtered by sensitivities)
│   └── MacroSummary.jsx       - Displays personalized macro breakdown and daily targets
├── utils/
│   ├── workoutAlgorithm.js    - Algorithmic workout generator (BMR, heart rate zones, progressive overload)
│   ├── fbiPlanData.js         - FBI PFT 12-week structured training data (3 phases)
│   ├── nutritionAlgorithm.js  - BMR/TDEE calculator and macro distribution system
│   ├── mealDatabase.js        - 60+ meals tagged with allergen information
│   ├── planGenerator.js       - Generates workouts + filtered personalized nutrition
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
1. **Profile Setup** - Collects user information (gender, age, height in feet/inches, weight in lbs, goal, difficulty, rest day, food sensitivities, plan type)
2. **Dual Training Systems:**
   - **Algorithmic Plan:** Workouts dynamically adapt to your profile using BMR, heart rate zones, and progressive overload
   - **FBI PFT Plan:** Structured 12-week program with 3 phases targeting FBI fitness standards
3. **Food Sensitivity Management** - Select allergens (gluten, fish, dairy, soy, nuts, eggs) and get filtered meal plans with safe alternatives
4. **Daily Routine** - Shows 7-day week with detailed cardio and strength workouts + filtered meal plans
5. **Exercise Completion Tracking** - Checkbox for each exercise to track progress; completed exercises show with strikethrough
6. **Personalized Nutrition** - Meals tailored to your goal with calculated macros matching your BMR/TDEE
7. **Macro Summary Dashboard** - Displays daily calorie target, protein/carbs/fat breakdown, and per-meal distribution
8. **Meal Detail Modal** - Displays recipes, macros, prep time, and instructions
9. **Grocery List** - Auto-generated from filtered weekly meals (excludes allergen ingredients) with ability to add custom items
10. **Rest/Cheat Day** - User-customizable rest day (any day of the week)
11. **LocalStorage Persistence** - Saves user profile, plan progress, and exercise completion state

### Color Scheme
- **Primary:** #8B6F47 (Warm Caramel Brown)
- **Accent:** #7A8450 (Olive Green)
- **Background:** #F5F1E8 (Warm Sand/Beige)

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
