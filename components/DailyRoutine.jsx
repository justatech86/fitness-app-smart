import React, { useState } from 'react';

export default function DailyRoutine({ weekData, initialDayIndex }) {
  const [selectedDay, setSelectedDay] = useState(initialDayIndex || 0);
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  if (!weekData || !weekData.days) return null;

  const currentDay = weekData.days[selectedDay];

  const openMealDetail = (meal) => {
    setSelectedMeal(meal);
    setShowMealModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Daily Routine - Week {weekData.weekNumber}</h2>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekData.days.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
              selectedDay === index
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {day.dayName}
          </button>
        ))}
      </div>

      {currentDay.isRestDay ? (
        <div className="bg-gradient-to-br from-accent to-primary rounded-lg shadow-lg p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">🎉 Rest & Cheat Day!</h3>
          <p className="text-xl mb-6">{currentDay.dayName} is your day to recover and enjoy!</p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h4 className="text-2xl font-semibold mb-3">💪 Recovery</h4>
              <p className="text-lg">Give your body time to rest and rebuild. Light stretching or a gentle walk is perfect.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h4 className="text-2xl font-semibold mb-3">🍕 Cheat Meal</h4>
              <p className="text-lg">Enjoy your favorite foods! One cheat meal helps keep you motivated and on track.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-primary mb-2">{currentDay.workout.name}</h3>
            <p className="text-sm text-gray-500 mb-6">Week {weekData.weekNumber} - {currentDay.dayName}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {currentDay.workout.cardio && currentDay.workout.cardio.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center">
                    <span className="mr-2">🏃‍♂️</span> Cardio
                  </h4>
                  <ul className="space-y-2">
                    {currentDay.workout.cardio.map((exercise, index) => (
                      <li key={index} className="text-gray-700 pl-4 border-l-2 border-accent">
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {currentDay.workout.strength && currentDay.workout.strength.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center">
                    <span className="mr-2">💪</span> Strength
                  </h4>
                  <ul className="space-y-2">
                    {currentDay.workout.strength.map((exercise, index) => (
                      <li key={index} className="text-gray-700 pl-4 border-l-2 border-primary">
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Today's Meals</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(currentDay.meals).map(([mealType, meal]) => (
                <div
                  key={mealType}
                  onClick={() => openMealDetail(meal)}
                  className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium capitalize">{mealType}</div>
                      <div className="text-sm text-gray-600">{meal.name}</div>
                    </div>
                    <div className="text-accent font-semibold">{meal.calories} cal</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMealModal && selectedMeal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowMealModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-primary">{selectedMeal.name}</h3>
              <button
                onClick={() => setShowMealModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 text-center">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-primary">{selectedMeal.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-primary">{selectedMeal.protein}g</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-primary">{selectedMeal.carbs}g</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-primary">{selectedMeal.fat}g</div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Prep Time: {selectedMeal.prepTime}</div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-primary mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-2">Instructions:</h4>
              <p className="text-gray-700">{selectedMeal.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
