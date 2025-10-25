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
    restDays: [6],
    planType: 'algorithmic',
    foodSensitivities: [],
    equipment: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSensitivityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, foodSensitivities: selectedOptions });
  };

  const handleEquipmentToggle = (equipmentType) => {
    const current = formData.equipment;
    if (current.includes(equipmentType)) {
      setFormData({ ...formData, equipment: current.filter(e => e !== equipmentType) });
    } else {
      setFormData({ ...formData, equipment: [...current, equipmentType] });
    }
  };

  const handleRestDayToggle = (dayIndex) => {
    const current = formData.restDays;
    if (current.includes(dayIndex)) {
      // Must have at least one rest day
      if (current.length === 1) return;
      setFormData({ ...formData, restDays: current.filter(d => d !== dayIndex) });
    } else {
      // Can't have more than 3 rest days (minimum 4 training days)
      if (current.length >= 3) return;
      setFormData({ ...formData, restDays: [...current, dayIndex].sort((a, b) => a - b) });
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Sensitivities (Optional)</label>
            <select
              multiple
              value={formData.foodSensitivities}
              onChange={handleSensitivityChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              size="3"
            >
              <option value="gluten">Gluten</option>
              <option value="fish">Fish</option>
              <option value="dairy">Dairy</option>
              <option value="soy">Soy</option>
              <option value="nuts">Nuts</option>
              <option value="eggs">Eggs</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Click to select multiple. Meals will be adjusted to exclude selected ingredients.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rest & Cheat Days (Select 1-3)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 0, label: 'Sunday' },
                { value: 1, label: 'Monday' },
                { value: 2, label: 'Tuesday' },
                { value: 3, label: 'Wednesday' },
                { value: 4, label: 'Thursday' },
                { value: 5, label: 'Friday' },
                { value: 6, label: 'Saturday' }
              ].map((day) => (
                <label key={day.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.restDays.includes(day.value)}
                    onChange={() => handleRestDayToggle(day.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{day.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formData.restDays.length} rest day{formData.restDays.length !== 1 ? 's' : ''}, {7 - formData.restDays.length} training days
            </p>
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
