# Personal Performance Dashboard

## Overview
A personalized fitness training application built with React, Vite, and Tailwind CSS. Users can create custom training plans ranging from 4 to 52 weeks. The app offers two training plan options: an algorithmic system that dynamically generates workouts based on your unique profile, or the structured PFT (Physical Fitness Test) program. Both plans include personalized nutrition tailored to your goals. The application supports multi-user authentication with optional biometric login, profile management including photo uploads and progress tracking, and comprehensive customization for equipment, rest days, and food sensitivities. The project aims to provide a fully personalized and adaptable fitness journey.

## User Preferences
- None recorded yet (first session after import)

## System Architecture

### Technology Stack
- **Frontend Framework:** React 19 with Vite 6
- **Styling:** Tailwind CSS 3.4 with custom color scheme
- **State Management:** React Hooks + LocalStorage
- **Build Tool:** Vite with HMR (Hot Module Replacement)

### Key Features
1.  **User Authentication & Profile Management:** Multi-user support with username/password (email required), optional biometric login (WebAuthn), profile photo uploads, progress photo gallery, weight tracking, and account settings (reset progress, delete account).
2.  **Flexible Program Duration:** Users can choose custom training plan durations from 4 weeks (minimum) to 52 weeks (1 year maximum). The default is 12 weeks.
3.  **Dual Training Systems:**
    *   **Algorithmic Plan:** Dynamically generated workouts based on user profile (gender, age, height, weight, goal, difficulty, weeks, rest days, available equipment). Incorporates BMI, BMR, age-adjusted heart rate zones, progressive overload, and goal-specific rep schemes.
    *   **PFT Program:** A structured plan that adapts to the chosen duration, cycling through three phases: Foundation & Endurance, Power & Performance, and Simulation & Peak Readiness.
4.  **Adaptive Workout Generation:** Workouts are tailored based on selected equipment (dumbbells, barbell, pull-up bar, resistance bands, cable machine, gym machines) from an 80+ exercise database, and adapt to chosen rest days (1-3 days per week) affecting training split (4, 5, or 6 training days).
5.  **Personalized Nutrition:** Algorithmic nutrition system calculates personalized macros (protein, carbs, fat) and daily caloric targets based on user profile, fitness goal, and activity level (Mifflin-St Jeor BMR, TDEE).
6.  **Specialized Diet Plans:** Support for 8 dietary plans (Standard, Keto, Paleo, Atkins, Carnivore, Vegetarian, Vegan, Mediterranean) with diet-specific macro ratios and automatic meal filtering to exclude non-compliant foods. Each diet has unique protein/carb/fat percentages that override base goal macros.
7.  **Food Sensitivity Filtering:** Comprehensive allergen management (Gluten, Fish, Dairy, Soy, Nuts, Eggs) using an expanded 70+ meal database to filter and provide safe, macro-balanced alternatives.
8.  **Interactive Interface:** Custom multi-select dropdowns for equipment, food sensitivities, and rest days. Diet plan selection with real-time descriptions. Flexible weeks selector (4-52 weeks). Exercise completion tracking with visual feedback and celebration animations.
9.  **Data Persistence:** All user profile data, diet preferences, plan progress, and exercise completion states are stored in browser LocalStorage, making the application fully client-side.

### Design System
*   **Color Palette (Earth Tones):**
    *   Primary: #8B6F47 (Warm Caramel Brown)
    *   Accent: #7A8450 (Olive Green)
    *   Background: #F5F1E8 (Warm Sand/Beige)
*   **Typography (Modern Sans-Serif Pairing):**
    *   Headings: Poppins
    *   Body Text: Lato

## External Dependencies
*   **WebAuthn API:** Used for biometric login functionality (fingerprint, face recognition).