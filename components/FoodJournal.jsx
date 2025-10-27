import React, { useState, useEffect } from 'react';

export default function FoodJournal({ profile, currentUser }) {
  const [entries, setEntries] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load entries from localStorage
  useEffect(() => {
    const storageKey = `user_${currentUser}_foodJournal_${selectedDate}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      setEntries([]);
    }
  }, [currentUser, selectedDate]);

  // Save entries to localStorage
  const saveEntries = (newEntries) => {
    const storageKey = `user_${currentUser}_foodJournal_${selectedDate}`;
    localStorage.setItem(storageKey, JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    
    if (!foodName.trim() || !calories || calories <= 0) {
      return;
    }

    const newEntry = {
      id: Date.now(),
      foodName: foodName.trim(),
      calories: parseInt(calories),
      timestamp: new Date().toISOString()
    };

    const updatedEntries = [...entries, newEntry];
    saveEntries(updatedEntries);
    
    setFoodName('');
    setCalories('');
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveEntries(updatedEntries);
  };

  // Calculate total calories
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  
  // Get daily calorie target from profile
  const targetCalories = profile?.dailyCalories || 2000;
  const caloriesRemaining = targetCalories - totalCalories;
  const percentageConsumed = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Food Journal</h2>
        
        {/* Date Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Calorie Summary */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 md:p-6 text-white mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm opacity-90">Target</p>
              <p className="text-2xl md:text-3xl font-bold">{targetCalories}</p>
              <p className="text-xs opacity-80">calories</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Consumed</p>
              <p className="text-2xl md:text-3xl font-bold">{totalCalories}</p>
              <p className="text-xs opacity-80">calories</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Remaining</p>
              <p className={`text-2xl md:text-3xl font-bold ${caloriesRemaining < 0 ? 'text-red-200' : ''}`}>
                {caloriesRemaining}
              </p>
              <p className="text-xs opacity-80">calories</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                percentageConsumed > 100 ? 'bg-red-400' : 'bg-white'
              }`}
              style={{ width: `${percentageConsumed}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-2 opacity-90">
            {percentageConsumed.toFixed(1)}% of daily target
          </p>
        </div>

        {/* Add Food Form */}
        <form onSubmit={handleAddEntry} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Log Food</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., Chicken Breast, Banana, Protein Shake"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="e.g., 250"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full md:w-auto bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Entry
          </button>
        </form>

        {/* Food Entries List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Today's Entries ({entries.length})
          </h3>
          
          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No entries logged yet for this date</p>
              <p className="text-sm mt-1">Start tracking your food above!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3 md:p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{entry.foodName}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(entry.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{entry.calories}</p>
                      <p className="text-xs text-gray-600">calories</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete entry"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tracking Tips
        </h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Log your meals as you eat them for accuracy</li>
          <li>• Include snacks and drinks with calories</li>
          <li>• Check nutrition labels or use a food database for calorie info</li>
          <li>• Be honest with portion sizes for best results</li>
        </ul>
      </div>
    </div>
  );
}
