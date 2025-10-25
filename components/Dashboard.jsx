import React from 'react';

export default function Dashboard({ plan, setWeek, currentWeek, onResetProfile }) {
  return (
    <div className="bg-primary text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your 12-Week Journey</h1>
          <button
            onClick={onResetProfile}
            className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            Reset Profile
          </button>
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
