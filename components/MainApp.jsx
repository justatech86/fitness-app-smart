import React, { useState } from 'react';
import Dashboard from './Dashboard';
import DailyRoutine from './DailyRoutine';
import GroceryList from './GroceryList';
import MacroSummary from './MacroSummary';
import FoodJournal from './FoodJournal';

export default function MainApp({ 
  plan, 
  currentWeek, 
  setCurrentWeek, 
  currentDayIndex, 
  setCurrentDayIndex,
  currentUser, 
  profile, 
  onEditProfile, 
  onShowProfile, 
  onLogout,
  onToggleExercise 
}) {
  const [activeTab, setActiveTab] = useState('journey');

  return (
    <div className="min-h-screen bg-neutralBg">
      <Dashboard
        plan={plan}
        setWeek={setCurrentWeek}
        setCurrentDayIndex={setCurrentDayIndex}
        currentWeek={currentWeek}
        currentUser={currentUser}
        profile={profile}
        onEditProfile={onEditProfile}
        onShowProfile={onShowProfile}
        onLogout={onLogout}
      />

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'journey'
                  ? 'text-primary border-primary bg-accent bg-opacity-10'
                  : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>My Journey</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('foodjournal')}
              className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'foodjournal'
                  ? 'text-primary border-primary bg-accent bg-opacity-10'
                  : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Food Journal</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('grocery')}
              className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'grocery'
                  ? 'text-primary border-primary bg-accent bg-opacity-10'
                  : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Grocery List</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'journey' && plan.length > 0 && (
          <>
            <MacroSummary profile={profile} />
            <DailyRoutine
              weekData={plan[currentWeek - 1]}
              initialDayIndex={currentDayIndex}
              weekIndex={currentWeek - 1}
              onToggleExercise={onToggleExercise}
            />
          </>
        )}

        {activeTab === 'foodjournal' && (
          <FoodJournal profile={profile} currentUser={currentUser} />
        )}

        {activeTab === 'grocery' && plan.length > 0 && (
          <GroceryList week={plan[currentWeek - 1]} />
        )}
      </div>
    </div>
  );
}
