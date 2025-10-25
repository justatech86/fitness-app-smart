import AuthPage from './components/AuthPage';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import DailyRoutine from './components/DailyRoutine';
import GroceryList from './components/GroceryList';
import MacroSummary from './components/MacroSummary';
import { generate12WeekPlan } from './utils/planGenerator';
import { getCurrentDayIndex } from './utils/dayHelper';
import { registerBiometric, hasBiometricCredential } from './utils/biometricAuth';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showBiometricSetup, setShowBiometricSetup] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      loadUserData(loggedInUser);
    }
    setCurrentDayIndex(getCurrentDayIndex());
  }, []);

  const loadUserData = (username) => {
    const userKey = `user_${username}_profile`;
    const planKey = `user_${username}_plan`;
    
    const storedProfile = localStorage.getItem(userKey);
    const storedPlan = localStorage.getItem(planKey);
    
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      
      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      } else {
        const newPlan = generate12WeekPlan(parsedProfile);
        setPlan(newPlan);
        localStorage.setItem(planKey, JSON.stringify(newPlan));
      }
    } else {
      setShowProfileSetup(true);
    }
  };

  const handleLogin = async (username) => {
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
    localStorage.setItem('lastLoggedInUser', username);
    loadUserData(username);
    
    // Check if biometric is already set up
    if (!hasBiometricCredential(username)) {
      setShowBiometricSetup(true);
    }
  };

  const handleBiometricSetup = async () => {
    try {
      await registerBiometric(currentUser);
      setShowBiometricSetup(false);
    } catch (err) {
      console.error('Failed to set up biometric:', err);
      setShowBiometricSetup(false);
    }
  };

  const handleProfileSubmit = (newProfile) => {
    setProfile(newProfile);
    const userKey = `user_${currentUser}_profile`;
    const planKey = `user_${currentUser}_plan`;
    localStorage.setItem(userKey, JSON.stringify(newProfile));
    const newPlan = generate12WeekPlan(newProfile);
    setPlan(newPlan);
    localStorage.setItem(planKey, JSON.stringify(newPlan));
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
    const planKey = `user_${currentUser}_plan`;
    localStorage.setItem(planKey, JSON.stringify(updatedPlan));
  };

  const handleLogout = () => {
    // Clear current session
    setCurrentUser(null);
    setProfile(null);
    setPlan([]);
    setShowProfileSetup(false);
    localStorage.removeItem('currentUser');
    // Note: We keep lastLoggedInUser for biometric login convenience on personal devices
    // Users can clear browser data if sharing devices
  };

  // Show auth page if no user is logged in
  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Show biometric setup modal after first login
  if (showBiometricSetup) {
    return (
      <div className="min-h-screen bg-neutralBg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Enable Biometric Login</h2>
            <p className="text-gray-600">
              Use your fingerprint or face to quickly and securely access your fitness plan next time.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleBiometricSetup}
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
            >
              Enable Biometric Login
            </button>
            <button
              onClick={() => setShowBiometricSetup(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show profile setup if user hasn't created their fitness profile yet
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
        currentUser={currentUser}
        onEditProfile={() => setShowProfileSetup(true)}
        onLogout={handleLogout}
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