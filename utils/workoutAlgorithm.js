// Algorithmic workout generator based on user profile with equipment filtering

function calculateBMI(heightCm, weightKg) {
  return weightKg / ((heightCm / 100) ** 2);
}

function calculateBMR(gender, age, heightCm, weightKg) {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

function getFitnessLevel(difficulty) {
  const levels = {
    beginner: { modifier: 0.7, recoveryDays: 2 },
    intermediate: { modifier: 1.0, recoveryDays: 1 },
    advanced: { modifier: 1.3, recoveryDays: 1 }
  };
  return levels[difficulty] || levels.beginner;
}

function getIntensityForWeek(weekNumber, difficulty) {
  // Progressive overload: increase intensity over weeks
  const baseIntensity = getFitnessLevel(difficulty).modifier;
  const weekMultiplier = 1 + (weekNumber - 1) * 0.05; // 5% increase per week
  return Math.min(baseIntensity * weekMultiplier, baseIntensity * 1.5); // Cap at 50% increase
}

// Exercise database with equipment tags
const exerciseDatabase = {
  upper_body: [
    { name: 'Push-ups', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Diamond push-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Decline push-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Pike push-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Dumbbell rows', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Dumbbell bench press', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Dumbbell shoulder press', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Dumbbell flyes', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Dumbbell pullovers', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Bicep curls', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Hammer curls', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Tricep kickbacks', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Overhead tricep extension', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Pull-ups', equipment: 'pull_up_bar', difficulty: 'intermediate' },
    { name: 'Chin-ups', equipment: 'pull_up_bar', difficulty: 'intermediate' },
    { name: 'Inverted rows', equipment: 'pull_up_bar', difficulty: 'beginner' },
    { name: 'Barbell bench press', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Barbell rows', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Barbell overhead press', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Barbell curls', equipment: 'barbell', difficulty: 'beginner' },
    { name: 'Resistance band chest press', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Resistance band rows', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Resistance band shoulder press', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Resistance band bicep curls', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Cable flyes', equipment: 'cable', difficulty: 'intermediate' },
    { name: 'Face pulls', equipment: 'cable', difficulty: 'intermediate' },
    { name: 'Tricep dips', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Bench dips', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Plank hold', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Side plank', equipment: 'bodyweight', difficulty: 'beginner' }
  ],
  lower_body: [
    { name: 'Bodyweight squats', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Jump squats', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Pistol squats', equipment: 'bodyweight', difficulty: 'advanced' },
    { name: 'Lunges', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Reverse lunges', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Walking lunges', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Glute bridges', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Single-leg glute bridges', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Calf raises', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Wall sit', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Step-ups', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Goblet squats', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Dumbbell lunges', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Bulgarian split squats', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Romanian deadlifts (dumbbells)', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Dumbbell step-ups', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Dumbbell calf raises', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Barbell squats', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Barbell deadlifts', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Front squats', equipment: 'barbell', difficulty: 'advanced' },
    { name: 'Barbell lunges', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Sumo deadlifts', equipment: 'barbell', difficulty: 'intermediate' },
    { name: 'Resistance band squats', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Resistance band glute kickbacks', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Resistance band lateral walks', equipment: 'resistance_bands', difficulty: 'beginner' },
    { name: 'Leg press', equipment: 'machine', difficulty: 'beginner' },
    { name: 'Leg curls', equipment: 'machine', difficulty: 'beginner' },
    { name: 'Leg extensions', equipment: 'machine', difficulty: 'beginner' }
  ],
  core: [
    { name: 'Crunches', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Bicycle crunches', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Plank', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Side plank', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Mountain climbers', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Russian twists', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Leg raises', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Dead bug', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Bird dogs', equipment: 'bodyweight', difficulty: 'beginner' },
    { name: 'Flutter kicks', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Hollow body hold', equipment: 'bodyweight', difficulty: 'intermediate' },
    { name: 'Hanging knee raises', equipment: 'pull_up_bar', difficulty: 'intermediate' },
    { name: 'Hanging leg raises', equipment: 'pull_up_bar', difficulty: 'advanced' },
    { name: 'Weighted Russian twists', equipment: 'dumbbells', difficulty: 'intermediate' },
    { name: 'Dumbbell side bends', equipment: 'dumbbells', difficulty: 'beginner' },
    { name: 'Ab wheel rollouts', equipment: 'cable', difficulty: 'advanced' },
    { name: 'Cable woodchops', equipment: 'cable', difficulty: 'intermediate' }
  ]
};

function filterExercisesByEquipment(exercises, userEquipment) {
  // Always include bodyweight exercises
  const availableEquipment = ['bodyweight', ...(userEquipment || [])];
  
  return exercises.filter(ex => availableEquipment.includes(ex.equipment));
}

function selectExercises(exercisePool, difficulty, count, scheme, intensity) {
  // Filter by difficulty level and lower
  const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
  const maxDifficultyIndex = difficultyOrder.indexOf(difficulty);
  
  const availableExercises = exercisePool.filter(ex => {
    const exDifficultyIndex = difficultyOrder.indexOf(ex.difficulty);
    return exDifficultyIndex <= maxDifficultyIndex;
  });

  // Shuffle and select
  const shuffled = [...availableExercises].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // Format exercises with sets and reps
  return selected.map(ex => {
    if (ex.name.includes('Plank') || ex.name.includes('hold')) {
      return `${ex.name}: ${scheme.sets} × ${Math.round(30 * intensity)}s`;
    } else {
      return `${ex.name}: ${scheme.sets} × ${scheme.reps}`;
    }
  });
}

function generateCardioWorkout(profile, weekNumber) {
  const { goal, difficulty, age, equipment = [] } = profile;
  const intensity = getIntensityForWeek(weekNumber, difficulty);
  
  // Age-adjusted heart rate zones
  const maxHR = 220 - age;
  const zone2 = Math.round(maxHR * 0.7);
  const zone3 = Math.round(maxHR * 0.8);
  const zone4 = Math.round(maxHR * 0.9);

  // Equipment-based cardio options
  const hasMinimalEquipment = equipment.length > 0;

  const cardioTypes = {
    weight_loss: {
      beginner: [
        `Brisk walk: ${Math.round(20 * intensity)} min @ ${zone2} bpm`,
        `Light jog intervals: 1 min jog / 2 min walk × ${Math.round(6 * intensity)}`,
        hasMinimalEquipment ? `Jump rope: ${Math.round(5 * intensity)} min (rest as needed)` : `Jumping jacks: ${Math.round(5 * intensity)} min`
      ],
      intermediate: [
        `Steady run: ${Math.round(30 * intensity)} min @ ${zone2}-${zone3} bpm`,
        `HIIT: 30s high knees / 30s rest × ${Math.round(10 * intensity)}`,
        `Burpees: ${Math.round(3 * intensity)} sets of 10`
      ],
      advanced: [
        `Long run: ${Math.round(45 * intensity)} min @ ${zone3} bpm`,
        `Sprint intervals: 45s sprint / 60s jog × ${Math.round(12 * intensity)}`,
        `Box jumps: 3 × 12` 
      ]
    },
    muscle_gain: {
      beginner: [
        `Light walk: ${Math.round(15 * intensity)} min easy pace`,
        `Active recovery: ${Math.round(20 * intensity)} min light movement`
      ],
      intermediate: [
        `Moderate cardio: ${Math.round(20 * intensity)} min @ ${zone2} bpm`,
        hasMinimalEquipment ? `Jump rope: ${Math.round(10 * intensity)} min` : `High knees: ${Math.round(10 * intensity)} min`
      ],
      advanced: [
        `HIIT conditioning: 20s work / 40s rest × ${Math.round(15 * intensity)}`,
        `Battle ropes: 30s on / 30s off × ${Math.round(8 * intensity)}`
      ]
    },
    maintenance: {
      beginner: [
        `Walk/jog: ${Math.round(25 * intensity)} min @ comfortable pace`,
        `Dynamic stretching: ${Math.round(10 * intensity)} min`
      ],
      intermediate: [
        `Run: ${Math.round(30 * intensity)} min @ ${zone2}-${zone3} bpm`,
        `Circuit cardio: ${Math.round(20 * intensity)} min mixed movements`
      ],
      advanced: [
        `Tempo run: ${Math.round(35 * intensity)} min @ ${zone3} bpm`,
        `Mixed HIIT: ${Math.round(30 * intensity)} min varied exercises`
      ]
    }
  };

  return cardioTypes[goal]?.[difficulty] || cardioTypes.maintenance.beginner;
}

function generateStrengthWorkout(profile, weekNumber, dayType) {
  const { goal, difficulty, equipment = [] } = profile;
  const intensity = getIntensityForWeek(weekNumber, difficulty);

  // Adjust reps and sets based on goal
  const repSchemes = {
    weight_loss: { sets: 3, reps: '12-15', rest: '45s' },
    muscle_gain: { sets: 4, reps: '8-12', rest: '90s' },
    maintenance: { sets: 3, reps: '10-12', rest: '60s' }
  };
  
  const scheme = repSchemes[goal] || repSchemes.maintenance;

  // Get equipment-filtered exercises
  let exercisePool = [];
  let exerciseCount = difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 6 : 7;

  if (dayType === 'upper_body') {
    exercisePool = filterExercisesByEquipment(exerciseDatabase.upper_body, equipment);
  } else if (dayType === 'lower_body') {
    exercisePool = filterExercisesByEquipment(exerciseDatabase.lower_body, equipment);
  } else if (dayType === 'core') {
    exercisePool = filterExercisesByEquipment(exerciseDatabase.core, equipment);
  } else if (dayType === 'full_body') {
    const upperFiltered = filterExercisesByEquipment(exerciseDatabase.upper_body, equipment);
    const lowerFiltered = filterExercisesByEquipment(exerciseDatabase.lower_body, equipment);
    const coreFiltered = filterExercisesByEquipment(exerciseDatabase.core, equipment);
    
    // Mix of upper, lower, and core
    const upper = selectExercises(upperFiltered, difficulty, 2, scheme, intensity);
    const lower = selectExercises(lowerFiltered, difficulty, 2, scheme, intensity);
    const core = selectExercises(coreFiltered, difficulty, 1, scheme, intensity);
    
    return [...upper, ...lower, ...core];
  }

  return selectExercises(exercisePool, difficulty, exerciseCount, scheme, intensity);
}

export function generateAlgorithmicWorkout(profile, weekNumber, trainingDay) {
  const { goal } = profile;
  
  // 6-day training split
  const trainingSchedule = {
    weight_loss: [
      { name: 'Full Body Cardio & Strength', strengthType: 'full_body' },
      { name: 'Lower Body & HIIT', strengthType: 'lower_body' },
      { name: 'Upper Body & Cardio', strengthType: 'upper_body' },
      { name: 'Core & Endurance', strengthType: 'core' },
      { name: 'Full Body Circuit', strengthType: 'full_body' },
      { name: 'Active Recovery & Core', strengthType: 'core' }
    ],
    muscle_gain: [
      { name: 'Chest & Triceps', strengthType: 'upper_body' },
      { name: 'Legs & Core', strengthType: 'lower_body' },
      { name: 'Back & Biceps', strengthType: 'upper_body' },
      { name: 'Shoulders & Core', strengthType: 'upper_body' },
      { name: 'Leg Power Day', strengthType: 'lower_body' },
      { name: 'Full Body Strength', strengthType: 'full_body' }
    ],
    maintenance: [
      { name: 'Upper Body Strength', strengthType: 'upper_body' },
      { name: 'Lower Body & Cardio', strengthType: 'lower_body' },
      { name: 'Full Body Circuit', strengthType: 'full_body' },
      { name: 'Core & Conditioning', strengthType: 'core' },
      { name: 'Upper Body & Cardio', strengthType: 'upper_body' },
      { name: 'Lower Body & Flexibility', strengthType: 'lower_body' }
    ]
  };

  const schedule = trainingSchedule[goal] || trainingSchedule.maintenance;
  const dayPlan = schedule[trainingDay - 1];

  return {
    name: `${dayPlan.name} - Week ${weekNumber}`,
    cardio: generateCardioWorkout(profile, weekNumber),
    strength: generateStrengthWorkout(profile, weekNumber, dayPlan.strengthType)
  };
}
