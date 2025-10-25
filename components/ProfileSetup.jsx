import React, { useState, useRef, useEffect } from 'react';

export default function ProfileSetup({ onSubmit, existingProfile }) {
  const [formData, setFormData] = useState(existingProfile || {
    gender: 'male',
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    goal: 'weight_loss',
    difficulty: 'beginner',
    restDays: [6],
    planType: 'algorithmic',
    dietType: 'standard',
    foodSensitivities: [],
    equipment: []
  });
  
  const [showSensitivitiesDropdown, setShowSensitivitiesDropdown] = useState(false);
  const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
  const [showRestDaysDropdown, setShowRestDaysDropdown] = useState(false);
  const sensitivityDropdownRef = useRef(null);
  const equipmentDropdownRef = useRef(null);
  const restDaysDropdownRef = useRef(null);

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
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (sensitivityDropdownRef.current && !sensitivityDropdownRef.current.contains(event.target)) {
        setShowSensitivitiesDropdown(false);
      }
      if (equipmentDropdownRef.current && !equipmentDropdownRef.current.contains(event.target)) {
        setShowEquipmentDropdown(false);
      }
      if (restDaysDropdownRef.current && !restDaysDropdownRef.current.contains(event.target)) {
        setShowRestDaysDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <option value="fbi_pft">PFT Program</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {formData.planType === 'algorithmic' 
                ? 'Workouts adapt to your profile, goal, and difficulty level'
                : 'Structured fitness test preparation program'
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

          <div className="relative" ref={equipmentDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Equipment (Optional)</label>
            <div
              onClick={() => setShowEquipmentDropdown(!showEquipmentDropdown)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <span className="text-gray-700">
                {formData.equipment.length === 0 
                  ? 'Select equipment...' 
                  : formData.equipment.map(e => {
                      const equipmentLabels = {
                        'dumbbells': 'Dumbbells',
                        'barbell': 'Barbell',
                        'pull_up_bar': 'Pull-up Bar',
                        'resistance_bands': 'Bands',
                        'cable': 'Cable',
                        'machine': 'Machines'
                      };
                      return equipmentLabels[e];
                    }).join(', ')
                }
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showEquipmentDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {[
                  { value: 'dumbbells', label: 'Dumbbells' },
                  { value: 'barbell', label: 'Barbell & Weights' },
                  { value: 'pull_up_bar', label: 'Pull-up Bar' },
                  { value: 'resistance_bands', label: 'Resistance Bands' },
                  { value: 'cable', label: 'Cable Machine' },
                  { value: 'machine', label: 'Gym Machines' }
                ].map((eq) => (
                  <label 
                    key={eq.value} 
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={formData.equipment.includes(eq.value)}
                      onChange={() => handleEquipmentToggle(eq.value)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                    />
                    <span className="text-sm">{eq.label}</span>
                  </label>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Bodyweight exercises are always included.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Plan</label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="standard">Standard (Balanced)</option>
              <option value="keto">Keto (Low Carb, High Fat)</option>
              <option value="paleo">Paleo (Whole Foods, No Grains)</option>
              <option value="atkins">Atkins (Very Low Carb)</option>
              <option value="carnivore">Carnivore (Meat Only)</option>
              <option value="vegetarian">Vegetarian (No Meat)</option>
              <option value="vegan">Vegan (Plant-Based)</option>
              <option value="mediterranean">Mediterranean (Heart-Healthy)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {formData.dietType === 'standard' && 'Balanced macros with all food groups'}
              {formData.dietType === 'keto' && 'Very low carb (5-10%), high fat (70-75%), moderate protein'}
              {formData.dietType === 'paleo' && 'Whole foods, no grains, legumes, or dairy'}
              {formData.dietType === 'atkins' && 'Very low carb, higher protein than keto'}
              {formData.dietType === 'carnivore' && 'Animal products only, zero carbs'}
              {formData.dietType === 'vegetarian' && 'No meat, fish, or poultry'}
              {formData.dietType === 'vegan' && 'No animal products whatsoever'}
              {formData.dietType === 'mediterranean' && 'Fish, olive oil, whole grains, vegetables'}
            </p>
          </div>

          <div className="relative" ref={sensitivityDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Sensitivities (Optional)</label>
            <div
              onClick={() => setShowSensitivitiesDropdown(!showSensitivitiesDropdown)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <span className="text-gray-700">
                {formData.foodSensitivities.length === 0 
                  ? 'Select sensitivities...' 
                  : formData.foodSensitivities.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')
                }
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showSensitivitiesDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {['gluten', 'fish', 'dairy', 'soy', 'nuts', 'eggs'].map((sensitivity) => (
                  <label 
                    key={sensitivity} 
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={formData.foodSensitivities.includes(sensitivity)}
                      onChange={() => handleSensitivityToggle(sensitivity)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                    />
                    <span className="text-sm capitalize">{sensitivity}</span>
                  </label>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Meals will be adjusted to exclude selected ingredients.
            </p>
          </div>

          <div className="relative" ref={restDaysDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rest & Cheat Days (Select 1-3)</label>
            <div
              onClick={() => setShowRestDaysDropdown(!showRestDaysDropdown)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <span className="text-gray-700">
                {formData.restDays.length === 0 
                  ? 'Select rest days...' 
                  : formData.restDays.map(d => {
                      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                      return dayNames[d];
                    }).join(', ')
                }
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showRestDaysDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {[
                  { value: 0, label: 'Sunday' },
                  { value: 1, label: 'Monday' },
                  { value: 2, label: 'Tuesday' },
                  { value: 3, label: 'Wednesday' },
                  { value: 4, label: 'Thursday' },
                  { value: 5, label: 'Friday' },
                  { value: 6, label: 'Saturday' }
                ].map((day) => (
                  <label 
                    key={day.value} 
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={formData.restDays.includes(day.value)}
                      onChange={() => handleRestDayToggle(day.value)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                      disabled={formData.restDays.includes(day.value) && formData.restDays.length === 1}
                    />
                    <span className="text-sm">{day.label}</span>
                  </label>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.restDays.length} rest day{formData.restDays.length !== 1 ? 's' : ''}, {7 - formData.restDays.length} training days
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
