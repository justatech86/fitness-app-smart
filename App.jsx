import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import DailyRoutine from './components/DailyRoutine';
import GroceryList from './components/GroceryList';
import MacroSummary from './components/MacroSummary';
import { generate12WeekPlan } from './utils/planGenerator';
import { getCurrentDayIndex } from './utils/dayHelper';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    const storedPlan = localStorage.getItem('fitnessPlan');
    
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      
      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      } else {
        const newPlan = generate12WeekPlan(parsedProfile);
        setPlan(newPlan);
        localStorage.setItem('fitnessPlan', JSON.stringify(newPlan));
      }
    } else {
      setShowProfileSetup(true);
    }
    setCurrentDayIndex(getCurrentDayIndex());
  }, []);

  const handleProfileSubmit = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    const newPlan = generate12WeekPlan(newProfile);
    setPlan(newPlan);
    localStorage.setItem('fitnessPlan', JSON.stringify(newPlan));
    setShowProfileSetup(false);
  };

  const toggleExerciseCompletion = (weekIndex, dayIndex, exerciseType, exerciseIndex) => {
    const updatedPlan = [...plan];
    const day = updatedPlan[weekIndex].days[dayIndex];
    
    if (!day.completedExercises) {
      day.completedExercises = { cardio: [], strength: [] };
    }
    
    if (!day.completedExercises[exerciseType]) {
      day.completedExercises[exerciseType] = [];
    }
    
    day.completedExercises[exerciseType][exerciseIndex] = !day.completedExercises[exerciseType][exerciseIndex];
    
    setPlan(updatedPlan);
    localStorage.setItem('fitnessPlan', JSON.stringify(updatedPlan));
  };

  if (!profile || showProfileSetup) {
    return <ProfileSetup onSubmit={handleProfileSubmit} existingProfile={profile} />;
  }

  return (
    <div className="min-h-screen bg-neutralBg">
      <Dashboard
        plan={plan}
        setWeek={setCurrentWeek}
        setCurrentDayIndex={setCurrentDayIndex}
        currentWeek={currentWeek}
        onEditProfile={() => setShowProfileSetup(true)}
      />
      <MacroSummary profile={profile} />
      {plan.length > 0 && (
        <>
          <DailyRoutine
            weekData={plan[currentWeek - 1]}
            initialDayIndex={currentDayIndex}
            weekIndex={currentWeek - 1}
            onToggleExercise={toggleExerciseCompletion}
          />
          <GroceryList week={plan[currentWeek - 1]} />
        </>
      )}
    </div>
  );
}