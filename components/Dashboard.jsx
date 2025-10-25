import React from 'react';

export default function Dashboard({ plan, setWeek, currentWeek, currentUser, onEditProfile, onShowProfile, onLogout }) {
  return (
    <div className="bg-primary text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Your 12-Week Journey</h1>
            {currentUser && (
              <p className="text-sm opacity-80 mt-1">Welcome back, {currentUser}!</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onShowProfile}
              className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Profile
            </button>
            <button
              onClick={onEditProfile}
              className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={onLogout}
              className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {plan.map((week) => (
            <button
              key={week.weekNumber}
              onClick={() => setWeek(week.weekNumber)}
              className={`p-4 rounded-lg transition-all ${
                currentWeek === week.weekNumber
                  ? 'bg-accent text-primary font-bold scale-105'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
            >
              <div className="text-sm opacity-80">Week</div>
              <div className="text-2xl font-bold">{week.weekNumber}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Week {currentWeek} Overview</h2>
          <p className="text-sm opacity-90">
            Stay consistent with your workouts and nutrition. Track your progress daily!
          </p>
        </div>
      </div>
    </div>
  );
}
