import React, { useState, useEffect } from 'react';

export default function Profile({ currentUser, onBack }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    loadPhotos();
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

  const handleProgressPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = {
          id: Date.now(),
          image: reader.result,
          date: new Date().toISOString(),
          note: ''
        };
        const updatedPhotos = [...progressPhotos, newPhoto];
        setProgressPhotos(updatedPhotos);
        savePhotos(profilePhoto, updatedPhotos);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
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
        {/* Profile Photo Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary">Profile Photo</h2>
            {uploadSuccess && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Photo updated!
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
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
            <div>
              <p className="text-gray-600 text-sm">
                Upload a profile photo to personalize your account
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Max file size: 5MB
              </p>
            </div>
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
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {formatDate(photo.date)}
                    </p>
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
              Capture your fitness journey! Upload a photo to track your progress over time.
            </p>
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-600">Click to upload photo</p>
              <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleProgressPhotoUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowUploadModal(false)}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
