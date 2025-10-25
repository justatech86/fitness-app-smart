import React from 'react';
import { generateMacroSummary } from '../utils/nutritionAlgorithm';

export default function MacroSummary({ profile }) {
  if (!profile) return null;

  const macros = generateMacroSummary(profile);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">Your Personalized Nutrition Plan</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Goal</p>
            <p className="text-lg font-semibold">{macros.goalDescription}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Activity Level</p>
            <p className="text-lg font-semibold">{macros.planDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{macros.dailyCalories}</div>
            <div className="text-sm opacity-90">Daily Calories</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{macros.dailyProtein}g</div>
            <div className="text-sm opacity-90">Protein ({macros.macroSplit.protein}%)</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{macros.dailyCarbs}g</div>
            <div className="text-sm opacity-90">Carbs ({macros.macroSplit.carbs}%)</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{macros.dailyFat}g</div>
            <div className="text-sm opacity-90">Fat ({macros.macroSplit.fat}%)</div>
          </div>
        </div>

        <div className="text-sm opacity-90">
          <p className="mb-2">
            <span className="font-semibold">BMR:</span> {macros.bmr} calories/day (at rest)
          </p>
          <p>
            <span className="font-semibold">TDEE:</span> {macros.tdee} calories/day (with activity)
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="font-semibold text-primary mb-2">Breakfast</h4>
          <div className="space-y-1 text-sm">
            <p>{macros.mealMacros.breakfast.calories} cal</p>
            <p>{macros.mealMacros.breakfast.protein}g protein</p>
            <p>{macros.mealMacros.breakfast.carbs}g carbs</p>
            <p>{macros.mealMacros.breakfast.fat}g fat</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="font-semibold text-primary mb-2">Lunch</h4>
          <div className="space-y-1 text-sm">
            <p>{macros.mealMacros.lunch.calories} cal</p>
            <p>{macros.mealMacros.lunch.protein}g protein</p>
            <p>{macros.mealMacros.lunch.carbs}g carbs</p>
            <p>{macros.mealMacros.lunch.fat}g fat</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="font-semibold text-primary mb-2">Dinner</h4>
          <div className="space-y-1 text-sm">
            <p>{macros.mealMacros.dinner.calories} cal</p>
            <p>{macros.mealMacros.dinner.protein}g protein</p>
            <p>{macros.mealMacros.dinner.carbs}g carbs</p>
            <p>{macros.mealMacros.dinner.fat}g fat</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="font-semibold text-primary mb-2">Snack</h4>
          <div className="space-y-1 text-sm">
            <p>{macros.mealMacros.snack.calories} cal</p>
            <p>{macros.mealMacros.snack.protein}g protein</p>
            <p>{macros.mealMacros.snack.carbs}g carbs</p>
            <p>{macros.mealMacros.snack.fat}g fat</p>
          </div>
        </div>
      </div>
    </div>
  );
}
