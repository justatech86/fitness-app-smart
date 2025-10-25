import { getWorkoutForDay } from './fbiPlanData.js';

const mealsByGoal = {
  weight_loss: [
    {
      name: "Greek Yogurt & Berries",
      type: "breakfast",
      calories: 280,
      protein: 20,
      carbs: 35,
      fat: 5,
      prepTime: "5 min",
      ingredients: ["Greek yogurt (1 cup)", "Mixed berries (1 cup)", "Honey (1 tsp)"],
      instructions: "Mix Greek yogurt with fresh berries and drizzle honey on top."
    },
    {
      name: "Grilled Chicken Salad",
      type: "lunch",
      calories: 350,
      protein: 40,
      carbs: 20,
      fat: 12,
      prepTime: "15 min",
      ingredients: ["Chicken breast (6 oz)", "Mixed greens (2 cups)", "Cherry tomatoes", "Cucumber", "Olive oil dressing (1 tbsp)"],
      instructions: "Grill chicken, slice it, and serve over mixed greens with vegetables and dressing."
    },
    {
      name: "Baked Salmon & Veggies",
      type: "dinner",
      calories: 420,
      protein: 38,
      carbs: 25,
      fat: 18,
      prepTime: "25 min",
      ingredients: ["Salmon fillet (6 oz)", "Broccoli (1 cup)", "Sweet potato (1 small)", "Lemon", "Olive oil"],
      instructions: "Bake salmon at 400°F for 15 min. Roast vegetables with olive oil and lemon."
    },
    {
      name: "Apple & Almond Butter",
      type: "snack",
      calories: 180,
      protein: 5,
      carbs: 20,
      fat: 8,
      prepTime: "2 min",
      ingredients: ["Apple (1 medium)", "Almond butter (1 tbsp)"],
      instructions: "Slice apple and serve with almond butter."
    }
  ],
  muscle_gain: [
    {
      name: "Protein Pancakes",
      type: "breakfast",
      calories: 450,
      protein: 35,
      carbs: 50,
      fat: 12,
      prepTime: "10 min",
      ingredients: ["Eggs (2)", "Protein powder (1 scoop)", "Oats (1/2 cup)", "Banana (1)", "Blueberries"],
      instructions: "Blend all ingredients, cook as pancakes, top with berries."
    },
    {
      name: "Turkey & Quinoa Bowl",
      type: "lunch",
      calories: 550,
      protein: 45,
      carbs: 55,
      fat: 15,
      prepTime: "20 min",
      ingredients: ["Ground turkey (8 oz)", "Quinoa (1 cup cooked)", "Black beans", "Avocado (1/4)", "Salsa"],
      instructions: "Cook turkey and quinoa. Combine with beans, top with avocado and salsa."
    },
    {
      name: "Steak & Sweet Potato",
      type: "dinner",
      calories: 620,
      protein: 50,
      carbs: 45,
      fat: 22,
      prepTime: "30 min",
      ingredients: ["Sirloin steak (8 oz)", "Sweet potato (1 large)", "Asparagus (1 cup)", "Butter (1 tbsp)"],
      instructions: "Grill steak to desired doneness. Bake sweet potato, sauté asparagus."
    },
    {
      name: "Protein Shake",
      type: "snack",
      calories: 320,
      protein: 30,
      carbs: 35,
      fat: 8,
      prepTime: "3 min",
      ingredients: ["Protein powder (1.5 scoops)", "Banana (1)", "Peanut butter (1 tbsp)", "Milk (1 cup)"],
      instructions: "Blend all ingredients until smooth."
    }
  ],
  maintenance: [
    {
      name: "Oatmeal & Eggs",
      type: "breakfast",
      calories: 380,
      protein: 22,
      carbs: 45,
      fat: 12,
      prepTime: "10 min",
      ingredients: ["Oats (1/2 cup)", "Eggs (2)", "Berries", "Almonds (10)"],
      instructions: "Cook oatmeal, scramble eggs, top oats with berries and almonds."
    },
    {
      name: "Chicken Wrap",
      type: "lunch",
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15,
      prepTime: "12 min",
      ingredients: ["Whole wheat tortilla", "Grilled chicken (5 oz)", "Lettuce", "Tomato", "Hummus (2 tbsp)"],
      instructions: "Fill tortilla with chicken and vegetables, spread hummus, and wrap."
    },
    {
      name: "Shrimp Stir-fry",
      type: "dinner",
      calories: 480,
      protein: 40,
      carbs: 48,
      fat: 14,
      prepTime: "20 min",
      ingredients: ["Shrimp (8 oz)", "Brown rice (1 cup cooked)", "Mixed vegetables", "Soy sauce", "Ginger"],
      instructions: "Stir-fry shrimp and vegetables with ginger and soy sauce. Serve over rice."
    },
    {
      name: "Trail Mix",
      type: "snack",
      calories: 200,
      protein: 8,
      carbs: 22,
      fat: 10,
      prepTime: "1 min",
      ingredients: ["Mixed nuts (1/4 cup)", "Dried fruit (2 tbsp)", "Dark chocolate chips (1 tbsp)"],
      instructions: "Mix all ingredients together."
    }
  ]
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generate12WeekPlan(profile) {
  const { goal, cheatDay } = profile;
  const meals = mealsByGoal[goal] || mealsByGoal.maintenance;
  const validDays = ['0', '1', '2', '3', '4', '5', '6'];
  const restDayIndex = validDays.includes(String(cheatDay)) ? Number(cheatDay) : 6;

  const plan = [];

  for (let week = 1; week <= 12; week++) {
    const weekData = {
      weekNumber: week,
      days: []
    };

    const weekMeals = shuffleArray(meals);
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
          completed: false
        });
      } else {
        // Training Day - get FBI PFT workout for this training day
        const fbiWorkout = getWorkoutForDay(week, trainingDayCounter);
        
        weekData.days.push({
          dayName: dayNames[day],
          isRestDay: false,
          workout: {
            name: fbiWorkout.name,
            cardio: fbiWorkout.cardio || [],
            strength: fbiWorkout.strength || []
          },
          meals: {
            breakfast: weekMeals.find(m => m.type === 'breakfast'),
            lunch: weekMeals.find(m => m.type === 'lunch'),
            dinner: weekMeals.find(m => m.type === 'dinner'),
            snack: weekMeals.find(m => m.type === 'snack')
          },
          completed: false
        });
        
        trainingDayCounter++;
      }
    }

    plan.push(weekData);
  }

  return plan;
}
