// Algorithmic nutrition and macro calculator based on user profile
import { getDietMacros } from './dietRules.js';

function calculateBMR(gender, age, heightCm, weightKg) {
  // Mifflin-St Jeor Equation - most accurate for modern populations
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

function getActivityMultiplier(planType) {
  // Activity level based on training plan
  if (planType === 'fbi_pft') {
    return 1.725; // Very active - PFT training is intense
  } else {
    return 1.55; // Moderately active - 6 days/week training
  }
}

function calculateTDEE(bmr, activityMultiplier) {
  // Total Daily Energy Expenditure
  return Math.round(bmr * activityMultiplier);
}

export function calculateMacros(profile) {
  const { gender, age, height, weight, goal, planType, dietType = 'standard' } = profile;
  
  // Calculate BMR and TDEE
  const bmr = calculateBMR(gender, age, height, weight);
  const activityMultiplier = getActivityMultiplier(planType);
  const tdee = calculateTDEE(bmr, activityMultiplier);
  
  let calories, proteinPercent, carbsPercent, fatPercent;
  
  // Adjust calories based on goal
  switch(goal) {
    case 'weight_loss':
      // 500 calorie deficit for ~1 lb/week loss
      calories = Math.round(tdee - 500);
      break;
      
    case 'muscle_gain':
      // 300-500 calorie surplus for lean muscle gain
      calories = Math.round(tdee + 400);
      break;
      
    case 'maintenance':
    default:
      // Maintain current weight
      calories = tdee;
      break;
  }
  
  // Get macro split based on diet type and goal
  const macroRatios = getDietMacros(dietType, goal);
  proteinPercent = macroRatios.protein;
  carbsPercent = macroRatios.carbs;
  fatPercent = macroRatios.fat;
  
  // Calculate grams of each macro
  // Protein: 4 calories per gram
  // Carbs: 4 calories per gram
  // Fat: 9 calories per gram
  const proteinGrams = Math.round((calories * proteinPercent) / 4);
  const carbsGrams = Math.round((calories * carbsPercent) / 4);
  const fatGrams = Math.round((calories * fatPercent) / 9);
  
  // Calculate per-meal macros (divide by 4 meals: breakfast, lunch, dinner, snack)
  const mealsPerDay = 4;
  
  return {
    dailyCalories: calories,
    dailyProtein: proteinGrams,
    dailyCarbs: carbsGrams,
    dailyFat: fatGrams,
    bmr: Math.round(bmr),
    tdee: tdee,
    mealMacros: {
      breakfast: {
        calories: Math.round(calories * 0.30), // 30% of daily
        protein: Math.round(proteinGrams * 0.30),
        carbs: Math.round(carbsGrams * 0.30),
        fat: Math.round(fatGrams * 0.30)
      },
      lunch: {
        calories: Math.round(calories * 0.35), // 35% of daily
        protein: Math.round(proteinGrams * 0.35),
        carbs: Math.round(carbsGrams * 0.35),
        fat: Math.round(fatGrams * 0.35)
      },
      dinner: {
        calories: Math.round(calories * 0.30), // 30% of daily
        protein: Math.round(proteinGrams * 0.30),
        carbs: Math.round(carbsGrams * 0.30),
        fat: Math.round(fatGrams * 0.30)
      },
      snack: {
        calories: Math.round(calories * 0.05), // 5% of daily
        protein: Math.round(proteinGrams * 0.05),
        carbs: Math.round(carbsGrams * 0.05),
        fat: Math.round(fatGrams * 0.05)
      }
    }
  };
}

export function adjustMealToMacros(meal, targetMacros) {
  // Create a new meal object with adjusted macros
  return {
    ...meal,
    calories: targetMacros.calories,
    protein: targetMacros.protein,
    carbs: targetMacros.carbs,
    fat: targetMacros.fat
  };
}

function isRestDay(restDays = []) {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return restDays.includes(today);
}

export function generateMacroSummary(profile) {
  const macros = calculateMacros(profile);
  const { goal, planType, dietType = 'standard', restDays = [], difficulty = 'beginner' } = profile;
  
  // Determine if today is a rest day
  const isTodayRestDay = isRestDay(restDays);
  
  // Use BMR on rest days, TDEE (daily calories) on workout days
  const displayCalories = isTodayRestDay ? macros.bmr : macros.dailyCalories;
  
  let goalDescription = '';
  switch(goal) {
    case 'weight_loss':
      goalDescription = 'Weight Loss - 500 cal deficit for ~1 lb/week loss';
      break;
    case 'muscle_gain':
      goalDescription = 'Muscle Gain - 400 cal surplus for lean gains';
      break;
    case 'maintenance':
      goalDescription = 'Maintenance - Sustaining current weight';
      break;
  }
  
  // Determine activity level based on goal and difficulty
  let planDescription = '';
  if (goal === 'maintenance') {
    planDescription = 'Lightly Active';
  } else if (goal === 'weight_loss') {
    planDescription = 'Moderately Active';
  } else if (goal === 'muscle_gain') {
    if (difficulty === 'advanced') {
      planDescription = 'Extremely Active';
    } else {
      planDescription = 'Moderately Active'; // beginner or intermediate
    }
  } else {
    planDescription = 'Moderately Active'; // fallback
  }
  
  const dietNames = {
    standard: 'Standard (Balanced)',
    keto: 'Keto',
    paleo: 'Paleo',
    atkins: 'Atkins',
    carnivore: 'Carnivore',
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    mediterranean: 'Mediterranean'
  };
  
  return {
    ...macros,
    dailyCalories: displayCalories, // Override with BMR on rest days
    isRestDay: isTodayRestDay,
    goalDescription,
    planDescription,
    dietDescription: dietNames[dietType] || 'Standard',
    macroSplit: {
      protein: Math.round((macros.dailyProtein * 4 / macros.dailyCalories) * 100),
      carbs: Math.round((macros.dailyCarbs * 4 / macros.dailyCalories) * 100),
      fat: Math.round((macros.dailyFat * 9 / macros.dailyCalories) * 100)
    }
  };
}
