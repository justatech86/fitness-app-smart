// Diet-specific macro ratios and food restrictions

export const dietMacroRatios = {
  standard: {
    protein: 0.30,
    carbs: 0.40,
    fat: 0.30
  },
  keto: {
    protein: 0.25,
    carbs: 0.05,
    fat: 0.70
  },
  paleo: {
    protein: 0.35,
    carbs: 0.35,
    fat: 0.30
  },
  atkins: {
    protein: 0.35,
    carbs: 0.10,
    fat: 0.55
  },
  carnivore: {
    protein: 0.50,
    carbs: 0.00,
    fat: 0.50
  },
  vegetarian: {
    protein: 0.25,
    carbs: 0.45,
    fat: 0.30
  },
  vegan: {
    protein: 0.25,
    carbs: 0.50,
    fat: 0.25
  },
  mediterranean: {
    protein: 0.20,
    carbs: 0.45,
    fat: 0.35
  }
};

// Food restrictions for each diet type
export const dietRestrictions = {
  standard: {
    excludeIngredients: [],
    excludeAllergens: []
  },
  keto: {
    excludeIngredients: ['rice', 'pasta', 'bread', 'oats', 'quinoa', 'beans', 'potato', 'sweet potato', 'banana', 'apple', 'grapes', 'honey', 'sugar'],
    excludeAllergens: [],
    description: 'Very low carb, high fat diet'
  },
  paleo: {
    excludeIngredients: ['rice', 'pasta', 'bread', 'oats', 'quinoa', 'beans', 'lentils', 'chickpeas', 'peanut', 'dairy', 'cheese', 'yogurt', 'milk', 'soy', 'tofu', 'tempeh'],
    excludeAllergens: ['dairy', 'soy'],
    description: 'Whole foods, no grains, legumes, or dairy'
  },
  atkins: {
    excludeIngredients: ['rice', 'pasta', 'bread', 'oats', 'quinoa', 'beans', 'potato', 'sweet potato', 'banana', 'apple', 'grapes', 'honey', 'sugar', 'corn'],
    excludeAllergens: [],
    description: 'Very low carb, higher protein'
  },
  carnivore: {
    excludeIngredients: ['rice', 'pasta', 'bread', 'oats', 'quinoa', 'beans', 'lentils', 'chickpeas', 'potato', 'sweet potato', 'vegetables', 'fruit', 'berries', 'banana', 'apple', 'spinach', 'broccoli', 'tomato', 'lettuce', 'kale', 'asparagus', 'onion', 'cucumber', 'carrots', 'nuts', 'seeds', 'honey', 'sugar'],
    excludeAllergens: [],
    description: 'Animal products only'
  },
  vegetarian: {
    excludeIngredients: ['chicken', 'turkey', 'beef', 'pork', 'lamb', 'fish', 'tuna', 'salmon', 'shrimp', 'bacon', 'sausage'],
    excludeAllergens: [],
    description: 'No meat, fish, or poultry'
  },
  vegan: {
    excludeIngredients: ['chicken', 'turkey', 'beef', 'pork', 'lamb', 'fish', 'tuna', 'salmon', 'shrimp', 'bacon', 'sausage', 'eggs', 'dairy', 'cheese', 'yogurt', 'milk', 'butter', 'whey', 'casein', 'honey'],
    excludeAllergens: ['eggs', 'dairy', 'fish'],
    description: 'No animal products'
  },
  mediterranean: {
    excludeIngredients: ['beef', 'pork', 'bacon', 'sausage', 'butter'],
    excludeAllergens: [],
    description: 'Fish, olive oil, whole grains, vegetables'
  }
};

// Get macro adjustments based on diet and goal
export function getDietMacros(dietType, goal) {
  const baseRatios = dietMacroRatios[dietType] || dietMacroRatios.standard;
  
  // Some diets override goal-based adjustments
  if (dietType === 'keto' || dietType === 'carnivore' || dietType === 'atkins') {
    // These diets have fixed macro ratios regardless of goal
    return baseRatios;
  }
  
  // For flexible diets, slightly adjust based on goal
  const ratios = { ...baseRatios };
  
  if (goal === 'weight_loss') {
    // Slightly increase protein for muscle preservation
    ratios.protein = Math.min(ratios.protein + 0.05, 0.40);
    ratios.carbs = Math.max(ratios.carbs - 0.05, 0.20);
  } else if (goal === 'muscle_gain') {
    // Increase protein and carbs for muscle building
    ratios.protein = Math.min(ratios.protein + 0.05, 0.40);
    if (ratios.carbs > 0.10) {
      ratios.carbs = Math.min(ratios.carbs + 0.05, 0.55);
      ratios.fat = Math.max(ratios.fat - 0.10, 0.20);
    }
  }
  
  return ratios;
}

// Check if a meal is compatible with diet
export function isMealDietCompliant(meal, dietType) {
  if (!meal || !meal.ingredients) return false;
  if (dietType === 'standard') return true;
  
  const restrictions = dietRestrictions[dietType];
  if (!restrictions) return true;
  
  const ingredientsLower = meal.ingredients.map(i => i.toLowerCase());
  const mealName = meal.name.toLowerCase();
  
  // Check if any restricted ingredient is in the meal
  for (const restricted of restrictions.excludeIngredients) {
    for (const ingredient of ingredientsLower) {
      if (ingredient.includes(restricted.toLowerCase())) {
        return false;
      }
    }
    // Also check meal name
    if (mealName.includes(restricted.toLowerCase())) {
      return false;
    }
  }
  
  // Check allergen restrictions
  if (restrictions.excludeAllergens && meal.allergens) {
    for (const allergen of restrictions.excludeAllergens) {
      if (meal.allergens.includes(allergen)) {
        return false;
      }
    }
  }
  
  return true;
}
