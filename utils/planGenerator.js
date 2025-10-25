import { getWorkoutForDay } from './fbiPlanData.js';
import { generateAlgorithmicWorkout } from './workoutAlgorithm.js';
import { calculateMacros, adjustMealToMacros } from './nutritionAlgorithm.js';
import { getMealsByGoalAndType } from './mealDatabase.js';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generate12WeekPlan(profile) {
  const { goal, restDays = [6], planType, foodSensitivities = [], dietType = 'standard', weeks = 12 } = profile;
  // Ensure restDays is an array and contains valid day indices
  const validRestDays = Array.isArray(restDays) ? restDays : [6];
  const restDayIndices = validRestDays.filter(d => d >= 0 && d <= 6);
  
  // Ensure weeks is within valid range
  const totalWeeks = Math.min(Math.max(parseInt(weeks) || 12, 4), 52);

  // Calculate personalized macros based on user profile
  const userMacros = calculateMacros(profile);

  // Get filtered meals based on food sensitivities and diet type
  const breakfastOptions = getMealsByGoalAndType(goal, 'breakfast', foodSensitivities, dietType);
  const lunchOptions = getMealsByGoalAndType(goal, 'lunch', foodSensitivities, dietType);
  const dinnerOptions = getMealsByGoalAndType(goal, 'dinner', foodSensitivities, dietType);
  const snackOptions = getMealsByGoalAndType(goal, 'snack', foodSensitivities, dietType);

  const plan = [];

  for (let week = 1; week <= totalWeeks; week++) {
    const weekData = {
      weekNumber: week,
      days: []
    };

    // Shuffle each meal type separately for variety
    const shuffledBreakfasts = shuffleArray(breakfastOptions);
    const shuffledLunches = shuffleArray(lunchOptions);
    const shuffledDinners = shuffleArray(dinnerOptions);
    const shuffledSnacks = shuffleArray(snackOptions);
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Calculate total training days (7 - number of rest days)
    const totalTrainingDays = 7 - restDayIndices.length;
    let trainingDayCounter = 1;

    for (let day = 0; day < 7; day++) {
      if (restDayIndices.includes(day)) {
        // Rest/Cheat Day
        weekData.days.push({
          dayName: dayNames[day],
          isRestDay: true,
          workout: null,
          meals: null,
          completed: false,
          completedExercises: { cardio: [], strength: [] }
        });
      } else {
        // Training Day - get workout based on plan type
        let workout;
        
        if (planType === 'fbi_pft') {
          // PFT Plan
          const fbiWorkout = getWorkoutForDay(week, trainingDayCounter);
          workout = {
            name: fbiWorkout.name,
            cardio: fbiWorkout.cardio || [],
            strength: fbiWorkout.strength || []
          };
        } else {
          // Algorithmic Plan (default)
          workout = generateAlgorithmicWorkout(profile, week, trainingDayCounter, totalTrainingDays);
        }
        
        // Get base meals (cycle through available filtered meals)
        const mealIndex = (trainingDayCounter - 1) % Math.min(
          shuffledBreakfasts.length,
          shuffledLunches.length,
          shuffledDinners.length,
          shuffledSnacks.length
        );
        
        const baseMeals = {
          breakfast: shuffledBreakfasts[mealIndex % shuffledBreakfasts.length],
          lunch: shuffledLunches[mealIndex % shuffledLunches.length],
          dinner: shuffledDinners[mealIndex % shuffledDinners.length],
          snack: shuffledSnacks[mealIndex % shuffledSnacks.length]
        };
        
        // Adjust each meal to match user's calculated macros
        const personalizedMeals = {
          breakfast: adjustMealToMacros(baseMeals.breakfast, userMacros.mealMacros.breakfast),
          lunch: adjustMealToMacros(baseMeals.lunch, userMacros.mealMacros.lunch),
          dinner: adjustMealToMacros(baseMeals.dinner, userMacros.mealMacros.dinner),
          snack: adjustMealToMacros(baseMeals.snack, userMacros.mealMacros.snack)
        };
        
        weekData.days.push({
          dayName: dayNames[day],
          isRestDay: false,
          workout: workout,
          meals: personalizedMeals,
          completed: false,
          completedExercises: { cardio: [], strength: [] }
        });
        
        trainingDayCounter++;
      }
    }

    plan.push(weekData);
  }

  return plan;
}
