import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import DailyRoutine from './components/DailyRoutine';
import GroceryList from './components/GroceryList';
import { generate12WeekPlan } from './utils/planGenerator';
import { getCurrentDayIndex } from './utils/dayHelper';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      const newPlan = generate12WeekPlan(parsedProfile);
      setPlan(newPlan);
    }
    setCurrentDayIndex(getCurrentDayIndex());
  }, []);

  const handleProfileSubmit = (newProfile) => {
    setProfile(newProfile);
    const newPlan = generate12WeekPlan(newProfile);
    setPlan(newPlan);
  };

  if (!profile) return <ProfileSetup onSubmit={handleProfileSubmit} />;

  return (
    <div className="min-h-screen bg-neutralBg">
      <Dashboard
        plan={plan}
        setWeek={setCurrentWeek}
        setCurrentDayIndex={setCurrentDayIndex}
        currentWeek={currentWeek}
        onResetProfile={() => {
          localStorage.removeItem('userProfile');
          localStorage.removeItem('weeklyPlan');
          setProfile(null);
          setPlan([]);
        }}
      />
      {plan.length > 0 && (
        <>
          <DailyRoutine
            weekData={plan[currentWeek - 1]}
            initialDayIndex={currentDayIndex}
          />
          <GroceryList week={plan[currentWeek - 1]} />
        </>
      )}
    </div>
  );
}