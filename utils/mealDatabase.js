// Comprehensive meal database with allergen tags

export const mealDatabase = {
  weight_loss: [
    // Breakfast options
    {
      name: "Greek Yogurt & Berries",
      type: "breakfast",
      calories: 280,
      protein: 20,
      carbs: 35,
      fat: 5,
      prepTime: "5 min",
      ingredients: ["Greek yogurt (1 cup)", "Mixed berries (1 cup)", "Honey (1 tsp)"],
      instructions: "Mix Greek yogurt with fresh berries and drizzle honey on top.",
      allergens: ["dairy"]
    },
    {
      name: "Oatmeal with Fruit",
      type: "breakfast",
      calories: 280,
      protein: 10,
      carbs: 50,
      fat: 5,
      prepTime: "8 min",
      ingredients: ["Oats (1/2 cup)", "Almond milk (1 cup)", "Banana (1)", "Cinnamon"],
      instructions: "Cook oats with almond milk. Top with sliced banana and cinnamon.",
      allergens: []
    },
    {
      name: "Veggie Scramble",
      type: "breakfast",
      calories: 280,
      protein: 18,
      carbs: 15,
      fat: 18,
      prepTime: "10 min",
      ingredients: ["Eggs (3)", "Spinach (1 cup)", "Tomatoes", "Onion", "Olive oil"],
      instructions: "Scramble eggs with sautéed vegetables.",
      allergens: ["eggs"]
    },
    {
      name: "Smoothie Bowl",
      type: "breakfast",
      calories: 280,
      protein: 15,
      carbs: 45,
      fat: 6,
      prepTime: "5 min",
      ingredients: ["Protein powder (1 scoop)", "Frozen berries (1 cup)", "Banana (1)", "Coconut milk (1/2 cup)"],
      instructions: "Blend all ingredients. Pour into bowl and top with berries.",
      allergens: []
    },

    // Lunch options
    {
      name: "Grilled Chicken Salad",
      type: "lunch",
      calories: 350,
      protein: 40,
      carbs: 20,
      fat: 12,
      prepTime: "15 min",
      ingredients: ["Chicken breast (6 oz)", "Mixed greens (2 cups)", "Cherry tomatoes", "Cucumber", "Olive oil dressing (1 tbsp)"],
      instructions: "Grill chicken, slice it, and serve over mixed greens with vegetables and dressing.",
      allergens: []
    },
    {
      name: "Tuna Lettuce Wraps",
      type: "lunch",
      calories: 350,
      protein: 35,
      carbs: 20,
      fat: 15,
      prepTime: "10 min",
      ingredients: ["Canned tuna (6 oz)", "Lettuce leaves", "Avocado (1/4)", "Tomato", "Lemon juice"],
      instructions: "Mix tuna with lemon juice. Serve in lettuce wraps with vegetables.",
      allergens: ["fish"]
    },
    {
      name: "Turkey & Veggie Stir-fry",
      type: "lunch",
      calories: 350,
      protein: 38,
      carbs: 25,
      fat: 12,
      prepTime: "15 min",
      ingredients: ["Ground turkey (6 oz)", "Mixed vegetables", "Coconut aminos", "Ginger", "Garlic"],
      instructions: "Stir-fry turkey with vegetables and seasonings.",
      allergens: []
    },
    {
      name: "Tofu Buddha Bowl",
      type: "lunch",
      calories: 350,
      protein: 20,
      carbs: 40,
      fat: 12,
      prepTime: "20 min",
      ingredients: ["Tofu (6 oz)", "Quinoa (1/2 cup)", "Roasted vegetables", "Tahini dressing"],
      instructions: "Bake tofu. Serve over quinoa with roasted vegetables and dressing.",
      allergens: ["soy"]
    },

    // Dinner options
    {
      name: "Baked Salmon & Veggies",
      type: "dinner",
      calories: 420,
      protein: 38,
      carbs: 25,
      fat: 18,
      prepTime: "25 min",
      ingredients: ["Salmon fillet (6 oz)", "Broccoli (1 cup)", "Sweet potato (1 small)", "Lemon", "Olive oil"],
      instructions: "Bake salmon at 400°F for 15 min. Roast vegetables with olive oil and lemon.",
      allergens: ["fish"]
    },
    {
      name: "Chicken & Cauliflower Rice",
      type: "dinner",
      calories: 420,
      protein: 40,
      carbs: 20,
      fat: 20,
      prepTime: "20 min",
      ingredients: ["Chicken breast (8 oz)", "Cauliflower rice (2 cups)", "Vegetables", "Coconut oil"],
      instructions: "Grill chicken. Sauté cauliflower rice with vegetables.",
      allergens: []
    },
    {
      name: "Lean Beef & Vegetables",
      type: "dinner",
      calories: 420,
      protein: 42,
      carbs: 20,
      fat: 20,
      prepTime: "25 min",
      ingredients: ["Lean beef (6 oz)", "Green beans (1 cup)", "Carrots", "Mushrooms", "Herbs"],
      instructions: "Cook beef to desired doneness. Roast vegetables with herbs.",
      allergens: []
    },
    {
      name: "Shrimp & Zucchini Noodles",
      type: "dinner",
      calories: 420,
      protein: 36,
      carbs: 25,
      fat: 18,
      prepTime: "15 min",
      ingredients: ["Shrimp (8 oz)", "Zucchini noodles (2 cups)", "Garlic", "Tomatoes", "Olive oil"],
      instructions: "Sauté shrimp with garlic. Toss with zucchini noodles and tomatoes.",
      allergens: ["fish"]
    },

    // Snack options
    {
      name: "Apple & Almond Butter",
      type: "snack",
      calories: 180,
      protein: 5,
      carbs: 20,
      fat: 8,
      prepTime: "2 min",
      ingredients: ["Apple (1 medium)", "Almond butter (1 tbsp)"],
      instructions: "Slice apple and serve with almond butter.",
      allergens: ["nuts"]
    },
    {
      name: "Veggie Sticks & Hummus",
      type: "snack",
      calories: 180,
      protein: 6,
      carbs: 22,
      fat: 8,
      prepTime: "5 min",
      ingredients: ["Carrots", "Celery", "Bell peppers", "Hummus (3 tbsp)"],
      instructions: "Cut vegetables into sticks. Serve with hummus.",
      allergens: []
    },
    {
      name: "Hard-Boiled Eggs",
      type: "snack",
      calories: 180,
      protein: 12,
      carbs: 2,
      fat: 12,
      prepTime: "10 min",
      ingredients: ["Eggs (2)", "Salt", "Pepper"],
      instructions: "Boil eggs for 10 minutes. Season with salt and pepper.",
      allergens: ["eggs"]
    },
    {
      name: "Rice Cakes & Avocado",
      type: "snack",
      calories: 180,
      protein: 4,
      carbs: 24,
      fat: 8,
      prepTime: "3 min",
      ingredients: ["Rice cakes (2)", "Avocado (1/4)", "Sea salt", "Lemon juice"],
      instructions: "Mash avocado on rice cakes. Season with salt and lemon.",
      allergens: []
    }
  ],
  
  muscle_gain: [
    // Breakfast options
    {
      name: "Protein Pancakes",
      type: "breakfast",
      calories: 450,
      protein: 35,
      carbs: 50,
      fat: 12,
      prepTime: "10 min",
      ingredients: ["Eggs (2)", "Protein powder (1 scoop)", "Oats (1/2 cup)", "Banana (1)", "Blueberries"],
      instructions: "Blend all ingredients, cook as pancakes, top with berries.",
      allergens: ["eggs", "gluten"]
    },
    {
      name: "Breakfast Burrito",
      type: "breakfast",
      calories: 450,
      protein: 30,
      carbs: 50,
      fat: 15,
      prepTime: "12 min",
      ingredients: ["Tortilla", "Eggs (3)", "Black beans", "Avocado", "Salsa"],
      instructions: "Scramble eggs. Fill tortilla with eggs, beans, avocado, and salsa.",
      allergens: ["eggs", "gluten"]
    },
    {
      name: "Overnight Oats Protein Bowl",
      type: "breakfast",
      calories: 450,
      protein: 32,
      carbs: 55,
      fat: 12,
      prepTime: "5 min (prep night before)",
      ingredients: ["Oats (1 cup)", "Protein powder (1 scoop)", "Almond milk", "Chia seeds", "Berries"],
      instructions: "Mix all ingredients. Refrigerate overnight. Enjoy cold.",
      allergens: []
    },
    {
      name: "Tofu Scramble with Toast",
      type: "breakfast",
      calories: 450,
      protein: 28,
      carbs: 52,
      fat: 15,
      prepTime: "10 min",
      ingredients: ["Tofu (8 oz)", "Whole grain toast (2 slices)", "Spinach", "Tomatoes", "Nutritional yeast"],
      instructions: "Scramble tofu with vegetables. Serve with toast.",
      allergens: ["soy", "gluten"]
    },

    // Lunch options
    {
      name: "Turkey & Quinoa Bowl",
      type: "lunch",
      calories: 550,
      protein: 45,
      carbs: 55,
      fat: 15,
      prepTime: "20 min",
      ingredients: ["Ground turkey (8 oz)", "Quinoa (1 cup cooked)", "Black beans", "Avocado (1/4)", "Salsa"],
      instructions: "Cook turkey and quinoa. Combine with beans, top with avocado and salsa.",
      allergens: []
    },
    {
      name: "Salmon Power Bowl",
      type: "lunch",
      calories: 550,
      protein: 42,
      carbs: 48,
      fat: 18,
      prepTime: "15 min",
      ingredients: ["Salmon (6 oz)", "Brown rice (1 cup)", "Edamame", "Cucumber", "Sesame ginger dressing"],
      instructions: "Bake salmon. Serve over rice with edamame and vegetables.",
      allergens: ["fish", "soy"]
    },
    {
      name: "Chicken Pasta Bowl",
      type: "lunch",
      calories: 550,
      protein: 48,
      carbs: 58,
      fat: 12,
      prepTime: "18 min",
      ingredients: ["Chicken breast (8 oz)", "Whole wheat pasta (2 oz dry)", "Marinara sauce", "Vegetables"],
      instructions: "Cook pasta. Grill chicken. Combine with sauce and vegetables.",
      allergens: ["gluten"]
    },
    {
      name: "Beef & Rice Stir-fry",
      type: "lunch",
      calories: 550,
      protein: 46,
      carbs: 52,
      fat: 16,
      prepTime: "20 min",
      ingredients: ["Lean beef (8 oz)", "Brown rice (1 cup)", "Mixed vegetables", "Coconut aminos", "Ginger"],
      instructions: "Stir-fry beef and vegetables. Serve over rice.",
      allergens: []
    },

    // Dinner options
    {
      name: "Steak & Sweet Potato",
      type: "dinner",
      calories: 620,
      protein: 50,
      carbs: 45,
      fat: 22,
      prepTime: "30 min",
      ingredients: ["Sirloin steak (8 oz)", "Sweet potato (1 large)", "Asparagus (1 cup)", "Butter (1 tbsp)"],
      instructions: "Grill steak to desired doneness. Bake sweet potato, sauté asparagus.",
      allergens: ["dairy"]
    },
    {
      name: "Chicken & Rice with Vegetables",
      type: "dinner",
      calories: 620,
      protein: 52,
      carbs: 60,
      fat: 15,
      prepTime: "25 min",
      ingredients: ["Chicken breast (10 oz)", "Brown rice (1.5 cups)", "Broccoli", "Carrots", "Olive oil"],
      instructions: "Bake chicken. Cook rice. Roast vegetables.",
      allergens: []
    },
    {
      name: "Pork Chops & Quinoa",
      type: "dinner",
      calories: 620,
      protein: 48,
      carbs: 48,
      fat: 22,
      prepTime: "28 min",
      ingredients: ["Pork chops (8 oz)", "Quinoa (1 cup)", "Green beans", "Mushrooms", "Herbs"],
      instructions: "Grill pork chops. Cook quinoa. Sauté vegetables.",
      allergens: []
    },
    {
      name: "Tuna Steak & Potatoes",
      type: "dinner",
      calories: 620,
      protein: 50,
      carbs: 50,
      fat: 18,
      prepTime: "22 min",
      ingredients: ["Tuna steak (8 oz)", "Baby potatoes", "Spinach", "Lemon", "Olive oil"],
      instructions: "Sear tuna. Roast potatoes. Sauté spinach.",
      allergens: ["fish"]
    },

    // Snack options
    {
      name: "Protein Shake",
      type: "snack",
      calories: 320,
      protein: 30,
      carbs: 35,
      fat: 8,
      prepTime: "3 min",
      ingredients: ["Protein powder (1.5 scoops)", "Banana (1)", "Peanut butter (1 tbsp)", "Milk (1 cup)"],
      instructions: "Blend all ingredients until smooth.",
      allergens: ["dairy", "nuts"]
    },
    {
      name: "Greek Yogurt Parfait",
      type: "snack",
      calories: 320,
      protein: 25,
      carbs: 40,
      fat: 6,
      prepTime: "5 min",
      ingredients: ["Greek yogurt (1.5 cups)", "Granola (1/4 cup)", "Berries", "Honey"],
      instructions: "Layer yogurt with granola and berries.",
      allergens: ["dairy", "gluten"]
    },
    {
      name: "Protein Balls",
      type: "snack",
      calories: 320,
      protein: 18,
      carbs: 38,
      fat: 12,
      prepTime: "10 min (prep in advance)",
      ingredients: ["Protein powder", "Oats", "Almond butter", "Honey", "Chocolate chips"],
      instructions: "Mix all ingredients. Roll into balls. Refrigerate.",
      allergens: ["nuts", "gluten"]
    },
    {
      name: "Cottage Cheese & Fruit",
      type: "snack",
      calories: 320,
      protein: 28,
      carbs: 35,
      fat: 8,
      prepTime: "3 min",
      ingredients: ["Cottage cheese (1.5 cups)", "Pineapple chunks", "Cinnamon"],
      instructions: "Top cottage cheese with fruit and cinnamon.",
      allergens: ["dairy"]
    }
  ],
  
  maintenance: [
    // Similar pattern for maintenance meals...
    {
      name: "Oatmeal & Eggs",
      type: "breakfast",
      calories: 380,
      protein: 22,
      carbs: 45,
      fat: 12,
      prepTime: "10 min",
      ingredients: ["Oats (1/2 cup)", "Eggs (2)", "Berries", "Almonds (10)"],
      instructions: "Cook oatmeal, scramble eggs, top oats with berries and almonds.",
      allergens: ["eggs", "nuts"]
    },
    {
      name: "Avocado Toast with Egg",
      type: "breakfast",
      calories: 380,
      protein: 18,
      carbs: 42,
      fat: 16,
      prepTime: "8 min",
      ingredients: ["Whole grain bread (2 slices)", "Avocado (1/2)", "Eggs (2)", "Tomato"],
      instructions: "Toast bread, mash avocado, fry eggs, assemble.",
      allergens: ["eggs", "gluten"]
    },
    {
      name: "Smoothie with Protein",
      type: "breakfast",
      calories: 380,
      protein: 25,
      carbs: 48,
      fat: 10,
      prepTime: "5 min",
      ingredients: ["Protein powder", "Spinach", "Banana", "Berries", "Oat milk"],
      instructions: "Blend all ingredients until smooth.",
      allergens: []
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
      instructions: "Fill tortilla with chicken and vegetables, spread hummus, and wrap.",
      allergens: ["gluten"]
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
      instructions: "Stir-fry shrimp and vegetables with ginger and soy sauce. Serve over rice.",
      allergens: ["fish", "soy"]
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
      instructions: "Mix all ingredients together.",
      allergens: ["nuts"]
    }
  ]
};

export function filterMealsByAllergies(meals, sensitivities) {
  if (!sensitivities || sensitivities.length === 0) {
    return meals;
  }
  
  return meals.filter(meal => {
    // Check if meal contains any of the user's sensitivities
    return !meal.allergens.some(allergen => sensitivities.includes(allergen));
  });
}

export function getMealsByGoalAndType(goal, mealType, sensitivities = []) {
  const goalMeals = mealDatabase[goal] || mealDatabase.maintenance;
  const typedMeals = goalMeals.filter(m => m.type === mealType);
  return filterMealsByAllergies(typedMeals, sensitivities);
}
