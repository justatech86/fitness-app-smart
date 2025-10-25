import React, { useState } from 'react';

export default function ProfileSetup({ onSubmit }) {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    goal: 'weight_loss',
    difficulty: 'beginner',
    cheatDay: 6,
    planType: 'algorithmic',
    foodSensitivities: [],
    equipment: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSensitivityToggle = (sensitivity) => {
    const current = formData.foodSensitivities;
    if (current.includes(sensitivity)) {
      setFormData({ ...formData, foodSensitivities: current.filter(s => s !== sensitivity) });
    } else {
      setFormData({ ...formData, foodSensitivities: [...current, sensitivity] });
    }
  };

  const handleEquipmentToggle = (equipmentType) => {
    const current = formData.equipment;
    if (current.includes(equipmentType)) {
      setFormData({ ...formData, equipment: current.filter(e => e !== equipmentType) });
    } else {
      setFormData({ ...formData, equipment: [...current, equipmentType] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const heightInCm = Math.round((parseFloat(formData.heightFeet) * 30.48) + (parseFloat(formData.heightInches) * 2.54));
    const weightInKg = Math.round(parseFloat(formData.weight) * 0.453592);
    const profileData = {
      ...formData,
      height: heightInCm,
      weight: weightInKg
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    onSubmit(profileData);
  };

  return (
    <div className="min-h-screen bg-neutralBg flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-2">12-Week Fitness Plan</h1>
        <p className="text-gray-600 mb-6">Let's create your personalized training program</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="13"
              max="100"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  name="heightFeet"
                  value={formData.heightFeet}
                  onChange={handleChange}
                  required
                  min="3"
                  max="8"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Feet"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="heightInches"
                  value={formData.heightInches}
                  onChange={handleChange}
                  required
                  min="0"
                  max="11"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Inches"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="66"
              max="660"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Training Plan Type</label>
            <select
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="algorithmic">Algorithmic (Personalized)</option>
              <option value="fbi_pft">FBI PFT Program</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {formData.planType === 'algorithmic' 
                ? 'Workouts adapt to your profile, goal, and difficulty level'
                : 'Fixed FBI fitness test preparation program'
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Equipment (Select All That Apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'dumbbells', label: 'Dumbbells' },
                { value: 'barbell', label: 'Barbell & Weights' },
                { value: 'pull_up_bar', label: 'Pull-up Bar' },
                { value: 'resistance_bands', label: 'Resistance Bands' },
                { value: 'cable', label: 'Cable Machine' },
                { value: 'machine', label: 'Gym Machines' }
              ].map((eq) => (
                <label key={eq.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(eq.value)}
                    onChange={() => handleEquipmentToggle(eq.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{eq.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Bodyweight exercises are always included. Select additional equipment you have access to.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Sensitivities (Optional)</label>
            <div className="grid grid-cols-2 gap-2">
              {['gluten', 'fish', 'dairy', 'soy', 'nuts', 'eggs'].map((sensitivity) => (
                <label key={sensitivity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.foodSensitivities.includes(sensitivity)}
                    onChange={() => handleSensitivityToggle(sensitivity)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm capitalize">{sensitivity}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Meals will be adjusted to exclude selected ingredients
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rest & Cheat Day</label>
            <select
              name="cheatDay"
              value={formData.cheatDay}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold mt-6"
          >
            Generate My Plan
          </button>
        </form>
      </div>
    </div>
  );
}
