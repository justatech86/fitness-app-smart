import React, { useState, useEffect } from 'react';

const encouragementMessages = [
  "Amazing progress! Keep crushing those goals! 💪",
  "You're doing incredible! Every step forward counts! 🌟",
  "Look at you go! Your dedication is inspiring! 🔥",
  "Consistency is key, and you're nailing it! 🎯",
  "Your hard work is paying off! Keep it up! 🚀",
  "You're stronger than you think! Keep pushing! 💯",
  "Progress, not perfection! You're doing great! ⭐",
  "This is what commitment looks like! Proud of you! 🏆",
  "Small steps lead to big changes! You got this! 👏",
  "Your future self will thank you for this! 💚",
  "Transformation in progress! Stay focused! 🎉",
  "You're building something amazing! Keep going! 🌈",
  "Every photo tells a story of strength! 📸",
  "You showed up today - that's what matters! 🙌",
  "Progress photo = proof of your dedication! 🌟"
];

export default function Profile({ currentUser, profile, onBack }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [tempPhotoFile, setTempPhotoFile] = useState(null);
  const [tempWeight, setTempWeight] = useState('');
  const [encouragementMessage, setEncouragementMessage] = useState('');
  const encouragementTimeoutRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Calculate user stats
  const getUserStats = () => {
    if (!profile) return null;

    const initialWeight = profile.weight;
    const mostRecentPhoto = progressPhotos.length > 0 
      ? progressPhotos.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;
    
    const currentWeight = mostRecentPhoto ? mostRecentPhoto.weight : initialWeight;
    const weightChange = currentWeight - initialWeight;

    return {
      age: profile.age,
      heightFeet: profile.heightFeet,
      heightInches: profile.heightInches,
      initialWeight,
      currentWeight,
      weightChange
    };
  };

  const stats = getUserStats();

  useEffect(() => {
    loadPhotos();
    
    // Cleanup timeout on unmount
    return () => {
      if (encouragementTimeoutRef.current) {
        clearTimeout(encouragementTimeoutRef.current);
      }
    };
  }, [currentUser]);

  const loadPhotos = () => {
    const photoKey = `user_${currentUser}_photos`;
    const stored = localStorage.getItem(photoKey);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setProfilePhoto(data.profilePhoto || null);
        setProgressPhotos(data.progressPhotos || []);
      } catch (error) {
        console.error('Error loading photos:', error);
        setProfilePhoto(null);
        setProgressPhotos([]);
      }
    }
  };

  const savePhotos = (newProfilePhoto, newProgressPhotos) => {
    const photoKey = `user_${currentUser}_photos`;
    localStorage.setItem(photoKey, JSON.stringify({
      profilePhoto: newProfilePhoto,
      progressPhotos: newProgressPhotos
    }));
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = reader.result;
        setProfilePhoto(newPhoto);
        savePhotos(newPhoto, progressPhotos);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setTempPhotoFile(file);
    }
  };

  const handleProgressPhotoSubmit = () => {
    if (!tempPhotoFile) {
      alert('Please select a photo');
      return;
    }
    if (!tempWeight || tempWeight <= 0) {
      alert('Please enter your current weight');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto = {
        id: Date.now(),
        image: reader.result,
        date: new Date().toISOString(),
        weight: parseFloat(tempWeight),
        note: ''
      };
      const updatedPhotos = [...progressPhotos, newPhoto];
      setProgressPhotos(updatedPhotos);
      savePhotos(profilePhoto, updatedPhotos);
      
      // Show random encouragement message
      const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
      setEncouragementMessage(randomMessage);
      
      setShowUploadModal(false);
      setTempPhotoFile(null);
      setTempWeight('');
      
      // Clear any existing timeout before setting a new one
      if (encouragementTimeoutRef.current) {
        clearTimeout(encouragementTimeoutRef.current);
      }
      
      // Clear encouragement after 5 seconds
      encouragementTimeoutRef.current = setTimeout(() => {
        setEncouragementMessage('');
        encouragementTimeoutRef.current = null;
      }, 5000);
    };
    reader.readAsDataURL(tempPhotoFile);
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setTempPhotoFile(null);
    setTempWeight('');
  };

  const deleteProgressPhoto = (photoId) => {
    if (confirm('Are you sure you want to delete this progress photo?')) {
      const updatedPhotos = progressPhotos.filter(p => p.id !== photoId);
      setProgressPhotos(updatedPhotos);
      savePhotos(profilePhoto, updatedPhotos);
    }
  };

  const updatePhotoNote = (photoId, note) => {
    const updatedPhotos = progressPhotos.map(p => 
      p.id === photoId ? { ...p, note } : p
    );
    setProgressPhotos(updatedPhotos);
    savePhotos(profilePhoto, updatedPhotos);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all your workout progress? This will clear all completed exercises but keep your profile and progress photos.')) {
      // Clear workout completion data
      const planKey = `user_${currentUser}_plan`;
      localStorage.removeItem(planKey);
      alert('Workout progress has been reset. Please refresh the page to see changes.');
    }
  };

  const handleDeleteAccount = () => {
    const confirmMessage = `⚠️ WARNING: This will permanently delete your account and ALL data including:\n\n• Your fitness profile\n• All progress photos\n• Workout history\n• All personal data\n\nType "${currentUser}" to confirm deletion:`;
    
    const confirmation = prompt(confirmMessage);
    
    if (confirmation === currentUser) {
      // Delete all user data
      const userKeys = [
        `user_${currentUser}_profile`,
        `user_${currentUser}_plan`,
        `user_${currentUser}_photos`
      ];
      
      userKeys.forEach(key => localStorage.removeItem(key));
      
      // Remove from users list
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      delete users[currentUser];
      localStorage.setItem('users', JSON.stringify(users));
      
      // Remove biometric credentials
      const biometricCreds = JSON.parse(localStorage.getItem('biometricCredentials') || '{}');
      delete biometricCreds[currentUser];
      localStorage.setItem('biometricCredentials', JSON.stringify(biometricCreds));
      
      // Clear current session
      localStorage.removeItem('currentUser');
      localStorage.removeItem('lastLoggedInUser');
      
      alert('Your account has been permanently deleted.');
      window.location.reload();
    } else if (confirmation !== null) {
      alert('Account deletion cancelled. Username did not match.');
    }
  };

  return (
    <div className="min-h-screen bg-neutralBg">
      {/* Header */}
      <div className="bg-primary text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-sm opacity-80 mt-1">@{currentUser}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-primary border-b-2 border-primary bg-gray-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'account'
                  ? 'text-primary border-b-2 border-primary bg-gray-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Account
              </div>
            </button>
          </div>
        </div>

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <>
        {/* Profile Photo & Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary">Profile</h2>
            {uploadSuccess && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Photo updated!
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">
                Max 5MB
              </p>
            </div>

            {/* User Stats */}
            {stats && (
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Age */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Age</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.age}</p>
                  <p className="text-xs text-gray-400 mt-1">years</p>
                </div>

                {/* Height */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Height</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.heightFeet}'{stats.heightInches}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">feet/inches</p>
                </div>

                {/* Current Weight */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Weight</p>
                  <p className="text-2xl font-bold text-primary">{stats.currentWeight}</p>
                  <p className="text-xs text-gray-400 mt-1">lbs</p>
                </div>

                {/* Weight Change */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Change</p>
                  <div className="flex items-center gap-1">
                    {stats.weightChange !== 0 && (
                      <svg 
                        className={`w-5 h-5 ${stats.weightChange > 0 ? 'text-blue-500' : 'text-green-500'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        {stats.weightChange > 0 ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        )}
                      </svg>
                    )}
                    <p className={`text-2xl font-bold ${
                      stats.weightChange > 0 ? 'text-blue-500' : 
                      stats.weightChange < 0 ? 'text-green-500' : 
                      'text-gray-800'
                    }`}>
                      {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {stats.weightChange === 0 ? 'no change' : 
                     stats.weightChange > 0 ? 'gained' : 'lost'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Photos Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary">Progress Photos</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Photo
            </button>
          </div>

          {/* Encouragement Message */}
          {encouragementMessage && (
            <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-4 rounded-r-lg animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{encouragementMessage}</p>
              </div>
            </div>
          )}

          {progressPhotos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No progress photos yet</p>
              <p className="text-sm mt-1">Track your fitness journey with progress photos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progressPhotos.sort((a, b) => new Date(b.date) - new Date(a.date)).map((photo) => (
                <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img 
                      src={photo.image} 
                      alt="Progress" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Progress Date</p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(photo.date)}
                        </p>
                      </div>
                      {photo.weight && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Weight</p>
                          <p className="text-sm font-bold text-primary">
                            {photo.weight} lbs
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={photo.note}
                      onChange={(e) => updatePhotoNote(photo.id, e.target.value)}
                      placeholder="Add a note..."
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      onClick={() => deleteProgressPhoto(photo.id)}
                      className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
      )}

        {/* Account Tab Content */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              {/* Reset Progress Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Workout Progress</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Clear all completed exercise checkmarks and start fresh with your current plan. 
                      Your profile, progress photos, and meal plans will remain unchanged.
                    </p>
                    <button
                      onClick={handleResetProgress}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Progress
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
                    <p className="text-red-800 text-sm mb-2">
                      <strong>Warning:</strong> This action cannot be undone. This will permanently delete:
                    </p>
                    <ul className="text-red-700 text-sm mb-4 list-disc list-inside space-y-1">
                      <li>Your fitness profile and preferences</li>
                      <li>All workout history and progress</li>
                      <li>All progress photos and weight data</li>
                      <li>Your account credentials</li>
                    </ul>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account Permanently
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  <strong>Account:</strong> @{currentUser}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-primary mb-4">Add Progress Photo</h3>
            <p className="text-gray-600 text-sm mb-4">
              Capture your fitness journey! Upload a photo and record your current weight.
            </p>
            
            {/* Photo Upload */}
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {tempPhotoFile ? (
                <p className="text-sm text-green-600 font-medium">✓ Photo selected</p>
              ) : (
                <p className="text-sm text-gray-600">Click to upload photo</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoFileSelect}
                className="hidden"
              />
            </label>

            {/* Weight Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weight (lbs)
              </label>
              <input
                type="number"
                value={tempWeight}
                onChange={(e) => setTempWeight(e.target.value)}
                placeholder="Enter your weight"
                min="0"
                step="0.1"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelUpload}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProgressPhotoSubmit}
                className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Add Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
