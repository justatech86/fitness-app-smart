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
  const { goal, cheatDay, planType, foodSensitivities = [] } = profile;
  const validDays = ['0', '1', '2', '3', '4', '5', '6'];
  const restDayIndex = validDays.includes(String(cheatDay)) ? Number(cheatDay) : 6;

  // Calculate personalized macros based on user profile
  const userMacros = calculateMacros(profile);

  // Get filtered meals based on food sensitivities
  const breakfastOptions = getMealsByGoalAndType(goal, 'breakfast', foodSensitivities);
  const lunchOptions = getMealsByGoalAndType(goal, 'lunch', foodSensitivities);
  const dinnerOptions = getMealsByGoalAndType(goal, 'dinner', foodSensitivities);
  const snackOptions = getMealsByGoalAndType(goal, 'snack', foodSensitivities);

  const plan = [];

  for (let week = 1; week <= 12; week++) {
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
    
    // Map 6 training days to the week, skipping the rest day
    let trainingDayCounter = 1;

    for (let day = 0; day < 7; day++) {
      if (day === restDayIndex) {
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
          // FBI PFT Plan
          const fbiWorkout = getWorkoutForDay(week, trainingDayCounter);
          workout = {
            name: fbiWorkout.name,
            cardio: fbiWorkout.cardio || [],
            strength: fbiWorkout.strength || []
          };
        } else {
          // Algorithmic Plan (default)
          workout = generateAlgorithmicWorkout(profile, week, trainingDayCounter);
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
