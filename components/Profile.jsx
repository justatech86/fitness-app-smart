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
