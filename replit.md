# 12-Week Fitness App

## Overview
A personalized 12-week fitness training application built with React, Vite, and Tailwind CSS. This app offers two training plan options: an algorithmic system that dynamically generates workouts based on your unique profile, or the structured PFT (Physical Fitness Test) program. Both plans include personalized nutrition tailored to your goals.

**Current State:** Fully functional and ready to use. The app generates personalized training and nutrition plans based on user profile (gender, age, height, weight, goal, difficulty level, and rest day preference).

## Recent Changes (October 25, 2025)

### Profile Tab with Photo Uploads (October 25, 2025)
- **Profile photo upload** for user personalization
- **User stats dashboard** displaying next to profile photo:
  - Age (from profile)
  - Height in feet/inches (from profile)
  - Current Weight (from most recent progress photo, or initial weight if no photos)
  - Total Weight Change (calculated from initial weight to current, with visual indicators)
- **Progress photos gallery** to track fitness journey over time
- **Weight tracking** with each progress photo to monitor body composition changes
- **Motivational encouragement** - Random motivational message displayed after each photo upload (15 unique messages with emojis)
- Photos stored as base64 in localStorage (max 5MB per image)
- Each progress photo displays:
  - Progress Date (upload date)
  - Weight in lbs
  - Custom notes field for context
- Sort progress photos by date (newest first)
- Delete progress photos with confirmation
- Profile page accessible from dashboard with "Profile" button
- Encouragement message auto-dismisses after 5 seconds with fade-in animation
- Weight change indicator shows green (down arrow) for weight loss, blue (up arrow) for weight gain
- Created `components/Profile.jsx` with photo upload, weight input, stats dashboard, and gallery UI

### User Authentication with Biometric Login (October 25, 2025)
- **Multi-user support** with username/password authentication
- **Biometric login** using WebAuthn API (fingerprint, face recognition) after first password login
- Each user has isolated profile and fitness plan data
- Login/signup page with validation (username uniqueness, password strength)
- Optional biometric enrollment after first login for quick access
- User display and logout functionality in dashboard
- Profiles automatically saved per user with localStorage
- Created `components/AuthPage.jsx` for authentication UI
- Created `utils/biometricAuth.js` for WebAuthn biometric utilities

### Custom Multi-Select Dropdowns (October 25, 2025)
- **Unified dropdown UI** for all multi-select fields (Equipment, Food Sensitivities, Rest Days)
- Custom dropdown components that look like standard selects but allow multiple selections
- Click to expand, checkbox selection, automatic close on outside click
- Clean display of selected items with comma-separated labels
- Consistent styling matching all other form fields (Gender, Goal, Training Plan Type, Difficulty)

### Branding Update (October 25, 2025)
- Removed "FBI" references from all user-facing text
- Program now simply called "PFT Program" throughout the app
- Updated dropdown option, help text, workout names, and nutrition descriptions

### Multiple Rest Days & Adaptive Training
- **Multi-select rest day system** allows users to choose 1-3 rest days per week
- Training plans automatically adapt based on number of training days:
  - 6 training days (1 rest): Full split with dedicated focus days
  - 5 training days (2 rest): Optimized split maintaining muscle group balance
  - 4 training days (3 rest): Efficient full-body and compound movement focus
- Updated `workoutAlgorithm.js` with 4-day, 5-day, and 6-day training schedules for each goal
- Updated `planGenerator.js` to calculate total training days and pass to workout generator
- Celebration system automatically adjusts to count all training days in the week
- Changed food sensitivities from checkboxes to multi-select dropdown for cleaner UI

### Equipment-Based Algorithmic Workout System
- **Multi-select equipment system** allows users to choose any combination of:
  - Dumbbells
  - Barbell & Weights
  - Pull-up Bar
  - Resistance Bands
  - Cable Machine
  - Gym Machines
  - (Bodyweight exercises always included)
- **Intelligent exercise filtering** generates workouts using only available equipment
- **Comprehensive exercise database** with 80+ exercises tagged by equipment requirements
- **Adaptive workout generation** based on:
  - User profile (gender, age, height, weight)
  - Fitness goal (weight loss, muscle gain, maintenance)
  - Difficulty level (beginner, intermediate, advanced)
  - Available equipment (filters exercises dynamically)
  - Progressive overload (workouts intensify each week)
- Calculates BMI and BMR (Basal Metabolic Rate) for personalized recommendations
- Age-adjusted heart rate zones for optimal cardio training
- Goal-specific rep schemes (higher reps for weight loss, lower for muscle gain)
- 6-day training split tailored to each goal:
  - **Weight Loss:** Cardio-focused with full body circuits
  - **Muscle Gain:** Strength-focused with targeted muscle groups
  - **Maintenance:** Balanced approach with variety
- Created `workoutAlgorithm.js` with equipment-filtered exercise system

### PFT Training Plan Integration
- **Added PFT option** as alternative to algorithmic workouts
- Integrated 12-week structured PFT program with 3 distinct phases:
  - Phase 1 (Weeks 1-4): Foundation & Endurance
  - Phase 2 (Weeks 5-8): Power & Performance
  - Phase 3 (Weeks 9-12): Simulation & Peak Readiness
- Created `fbiPlanData.js` with complete workout data organized by phase, week, and day
- Users can choose between Algorithmic or PFT plan in profile setup
- Both plans display cardio and strength exercises separately with visual indicators

### Food Sensitivity Filtering System
- **Comprehensive allergen management** with multi-select dropdown for:
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
  - Training plan type (PFT = very active, Algorithmic = moderately active)
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
- **Small celebration animation** when completing a single day (20 confetti pieces, 2.5 seconds)
- **BIG celebration animation** when completing all 6 training days in a week (100 confetti + sparkles, 6 seconds)
- Progress saved to localStorage for persistence

### Week Structure & Customization
- Full 7-day week (Sunday-Saturday) with flexible training schedule
- **Multi-select rest/cheat days:** Choose 1-3 rest days per week (minimum 4 training days)
- Training plans automatically adapt to 4, 5, or 6 training days
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
│   ├── fbiPlanData.js         - PFT 12-week structured training data (3 phases)
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
1. **Profile Setup** - Collects user information (gender, age, height in feet/inches, weight in lbs, goal, difficulty, rest days [1-3], food sensitivities, equipment, plan type)
2. **Dual Training Systems:**
   - **Algorithmic Plan:** Workouts dynamically adapt to your profile, equipment, goal, and difficulty using BMR, heart rate zones, and progressive overload
   - **PFT Plan:** Structured 12-week program with 3 phases targeting fitness test standards
3. **Equipment-Based Workouts** - Select any combination of equipment (dumbbells, barbell, pull-up bar, resistance bands, cable, machines) and get exercises tailored to what you have available (80+ exercises in database)
4. **Food Sensitivity Management** - Select allergens (gluten, fish, dairy, soy, nuts, eggs) and get filtered meal plans with safe alternatives
5. **Daily Routine** - Shows 7-day week with detailed equipment-filtered cardio and strength workouts + filtered meal plans
6. **Exercise Completion Tracking** - Checkbox for each exercise to track progress; completed exercises show with strikethrough; small celebration for each day, grand celebration for completing the week
7. **Personalized Nutrition** - Meals tailored to your goal with calculated macros matching your BMR/TDEE
8. **Macro Summary Dashboard** - Displays daily calorie target, protein/carbs/fat breakdown, and per-meal distribution
9. **Meal Detail Modal** - Displays recipes, macros, prep time, and instructions
10. **Grocery List** - Auto-generated from filtered weekly meals (excludes allergen ingredients) with ability to add custom items
11. **Rest/Cheat Days** - User-customizable rest days (1-3 days per week, minimum 4 training days)
12. **LocalStorage Persistence** - Saves user profile, plan progress, and exercise completion state

### Design System
**Color Palette (Earth Tones):**
- **Primary:** #8B6F47 (Warm Caramel Brown)
- **Accent:** #7A8450 (Olive Green)
- **Background:** #F5F1E8 (Warm Sand/Beige)

**Typography (Modern Sans-Serif Pairing):**
- **Headings:** Poppins - Soft geometric sans-serif for a friendly, clean tone
- **Body Text:** Lato - Simple and readable, warm neutrality for paragraphs and UI text

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
