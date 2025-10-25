// Algorithmic workout generator based on user profile

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

function generateCardioWorkout(profile, weekNumber, dayType) {
  const { goal, difficulty, age } = profile;
  const intensity = getIntensityForWeek(weekNumber, difficulty);
  const fitnessLevel = getFitnessLevel(difficulty);
  
  // Age-adjusted heart rate zones
  const maxHR = 220 - age;
  const zone2 = Math.round(maxHR * 0.7);
  const zone3 = Math.round(maxHR * 0.8);
  const zone4 = Math.round(maxHR * 0.9);

  const cardioTypes = {
    weight_loss: {
      beginner: [
        `Brisk walk: ${Math.round(20 * intensity)} min @ ${zone2} bpm`,
        `Light jog intervals: 1 min jog / 2 min walk × ${Math.round(6 * intensity)}`,
        `Incline walk: ${Math.round(15 * intensity)} min @ 5-8% incline`
      ],
      intermediate: [
        `Steady run: ${Math.round(30 * intensity)} min @ ${zone2}-${zone3} bpm`,
        `HIIT intervals: 30s sprint / 90s jog × ${Math.round(10 * intensity)}`,
        `Cycling: ${Math.round(35 * intensity)} min moderate pace`
      ],
      advanced: [
        `Long run: ${Math.round(45 * intensity)} min @ ${zone3} bpm`,
        `Sprint intervals: 45s sprint / 60s rest × ${Math.round(12 * intensity)}`,
        `Rowing: ${Math.round(25 * intensity)} min @ ${zone3}-${zone4} bpm`
      ]
    },
    muscle_gain: {
      beginner: [
        `Light cardio: ${Math.round(15 * intensity)} min easy pace`,
        `Active recovery walk: ${Math.round(20 * intensity)} min`
      ],
      intermediate: [
        `Moderate cardio: ${Math.round(20 * intensity)} min @ ${zone2} bpm`,
        `Jump rope: ${Math.round(10 * intensity)} min (rest as needed)`
      ],
      advanced: [
        `HIIT conditioning: 20s work / 40s rest × ${Math.round(15 * intensity)}`,
        `Bike sprints: 30s all-out / 90s easy × ${Math.round(8 * intensity)}`
      ]
    },
    maintenance: {
      beginner: [
        `Walk/jog combo: ${Math.round(25 * intensity)} min @ comfortable pace`,
        `Swimming: ${Math.round(20 * intensity)} min easy laps`
      ],
      intermediate: [
        `Run: ${Math.round(30 * intensity)} min @ ${zone2}-${zone3} bpm`,
        `Cycling: ${Math.round(35 * intensity)} min moderate intensity`
      ],
      advanced: [
        `Tempo run: ${Math.round(35 * intensity)} min @ ${zone3} bpm`,
        `Mixed cardio: ${Math.round(30 * intensity)} min (bike/row/run combo)`
      ]
    }
  };

  return cardioTypes[goal]?.[difficulty] || cardioTypes.maintenance.beginner;
}

function generateStrengthWorkout(profile, weekNumber, dayType) {
  const { goal, difficulty, gender } = profile;
  const intensity = getIntensityForWeek(weekNumber, dayType);
  const fitnessLevel = getFitnessLevel(difficulty);

  // Adjust reps and sets based on goal
  const repSchemes = {
    weight_loss: { sets: 3, reps: '12-15', rest: '45s' },
    muscle_gain: { sets: 4, reps: '8-12', rest: '90s' },
    maintenance: { sets: 3, reps: '10-12', rest: '60s' }
  };
  
  const scheme = repSchemes[goal] || repSchemes.maintenance;

  const exercises = {
    upper_body: {
      beginner: [
        `Push-ups (modified if needed): ${scheme.sets} × ${scheme.reps}`,
        `Dumbbell rows: ${scheme.sets} × ${scheme.reps} each arm`,
        `Shoulder press: ${scheme.sets} × ${scheme.reps}`,
        `Bicep curls: ${scheme.sets} × ${scheme.reps}`,
        `Tricep dips (assisted): ${scheme.sets} × ${scheme.reps}`,
        `Plank hold: ${scheme.sets} × ${Math.round(30 * intensity)}s`
      ],
      intermediate: [
        `Push-ups: ${scheme.sets} × ${scheme.reps}`,
        `Bent-over rows: ${scheme.sets} × ${scheme.reps}`,
        `Overhead press: ${scheme.sets} × ${scheme.reps}`,
        `Pull-ups (assisted if needed): ${scheme.sets} × max reps`,
        `Chest press: ${scheme.sets} × ${scheme.reps}`,
        `Face pulls: ${scheme.sets} × ${scheme.reps}`,
        `Plank: ${scheme.sets} × ${Math.round(45 * intensity)}s`
      ],
      advanced: [
        `Weighted push-ups: ${scheme.sets} × ${scheme.reps}`,
        `Pull-ups: ${scheme.sets} × ${scheme.reps}`,
        `Barbell rows: ${scheme.sets} × ${scheme.reps}`,
        `Overhead press: ${scheme.sets} × ${scheme.reps}`,
        `Dips: ${scheme.sets} × ${scheme.reps}`,
        `Arnold press: ${scheme.sets} × ${scheme.reps}`,
        `Weighted plank: ${scheme.sets} × ${Math.round(60 * intensity)}s`
      ]
    },
    lower_body: {
      beginner: [
        `Bodyweight squats: ${scheme.sets} × ${scheme.reps}`,
        `Lunges: ${scheme.sets} × ${scheme.reps} each leg`,
        `Glute bridges: ${scheme.sets} × ${scheme.reps}`,
        `Calf raises: ${scheme.sets} × ${scheme.reps}`,
        `Wall sit: ${scheme.sets} × ${Math.round(30 * intensity)}s`,
        `Leg raises: ${scheme.sets} × ${scheme.reps}`
      ],
      intermediate: [
        `Goblet squats: ${scheme.sets} × ${scheme.reps}`,
        `Bulgarian split squats: ${scheme.sets} × ${scheme.reps} each`,
        `Romanian deadlifts: ${scheme.sets} × ${scheme.reps}`,
        `Step-ups: ${scheme.sets} × ${scheme.reps} each leg`,
        `Leg press: ${scheme.sets} × ${scheme.reps}`,
        `Calf raises: ${scheme.sets} × ${scheme.reps}`,
        `Hanging knee raises: ${scheme.sets} × ${scheme.reps}`
      ],
      advanced: [
        `Barbell squats: ${scheme.sets} × ${scheme.reps}`,
        `Deadlifts: ${scheme.sets} × ${scheme.reps}`,
        `Front squats: ${scheme.sets} × ${scheme.reps}`,
        `Walking lunges (weighted): ${scheme.sets} × ${scheme.reps} each`,
        `Leg press: ${scheme.sets} × ${scheme.reps}`,
        `Hamstring curls: ${scheme.sets} × ${scheme.reps}`,
        `Hanging leg raises: ${scheme.sets} × ${scheme.reps}`
      ]
    },
    full_body: {
      beginner: [
        `Squats: ${scheme.sets} × ${scheme.reps}`,
        `Push-ups: ${scheme.sets} × ${scheme.reps}`,
        `Dumbbell rows: ${scheme.sets} × ${scheme.reps}`,
        `Lunges: ${scheme.sets} × ${scheme.reps} each`,
        `Plank: ${scheme.sets} × ${Math.round(30 * intensity)}s`,
        `Bird dogs: ${scheme.sets} × ${scheme.reps} each side`
      ],
      intermediate: [
        `Deadlifts: ${scheme.sets} × ${scheme.reps}`,
        `Bench press: ${scheme.sets} × ${scheme.reps}`,
        `Squats: ${scheme.sets} × ${scheme.reps}`,
        `Pull-ups: ${scheme.sets} × max reps`,
        `Shoulder press: ${scheme.sets} × ${scheme.reps}`,
        `Plank to push-up: ${scheme.sets} × ${scheme.reps}`,
        `Russian twists: ${scheme.sets} × ${Math.round(20 * intensity)}`
      ],
      advanced: [
        `Barbell complexes: ${scheme.sets} rounds (deadlift, clean, press, squat)`,
        `Pull-ups: ${scheme.sets} × ${scheme.reps}`,
        `Front squats: ${scheme.sets} × ${scheme.reps}`,
        `Bench press: ${scheme.sets} × ${scheme.reps}`,
        `Barbell rows: ${scheme.sets} × ${scheme.reps}`,
        `Overhead walking lunges: ${scheme.sets} × ${scheme.reps} each`,
        `Ab wheel rollouts: ${scheme.sets} × ${scheme.reps}`
      ]
    },
    core: {
      beginner: [
        `Crunches: ${scheme.sets} × ${scheme.reps}`,
        `Plank: ${scheme.sets} × ${Math.round(30 * intensity)}s`,
        `Side plank: ${scheme.sets} × ${Math.round(20 * intensity)}s each`,
        `Dead bug: ${scheme.sets} × ${scheme.reps}`,
        `Glute bridges: ${scheme.sets} × ${scheme.reps}`
      ],
      intermediate: [
        `Sit-ups: ${scheme.sets} × ${scheme.reps}`,
        `Plank: ${scheme.sets} × ${Math.round(60 * intensity)}s`,
        `Russian twists: ${scheme.sets} × ${Math.round(20 * intensity)}`,
        `Leg raises: ${scheme.sets} × ${scheme.reps}`,
        `Mountain climbers: ${scheme.sets} × ${Math.round(20 * intensity)}`,
        `Bicycle crunches: ${scheme.sets} × ${Math.round(20 * intensity)}`
      ],
      advanced: [
        `Hanging leg raises: ${scheme.sets} × ${scheme.reps}`,
        `Weighted plank: ${scheme.sets} × ${Math.round(60 * intensity)}s`,
        `Dragon flags: ${scheme.sets} × ${scheme.reps}`,
        `Ab wheel rollouts: ${scheme.sets} × ${scheme.reps}`,
        `L-sit hold: ${scheme.sets} × ${Math.round(20 * intensity)}s`,
        `Windshield wipers: ${scheme.sets} × ${scheme.reps}`
      ]
    }
  };

  return exercises[dayType]?.[difficulty] || exercises.full_body.beginner;
}

export function generateAlgorithmicWorkout(profile, weekNumber, trainingDay) {
  const { goal, difficulty } = profile;
  
  // 6-day training split
  const trainingSchedule = {
    weight_loss: [
      { name: 'Full Body Cardio & Strength', cardioType: 'cardio', strengthType: 'full_body' },
      { name: 'Lower Body & HIIT', cardioType: 'cardio', strengthType: 'lower_body' },
      { name: 'Upper Body & Cardio', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Core & Endurance Cardio', cardioType: 'cardio', strengthType: 'core' },
      { name: 'Full Body Circuit', cardioType: 'cardio', strengthType: 'full_body' },
      { name: 'Active Recovery & Cardio', cardioType: 'cardio', strengthType: 'core' }
    ],
    muscle_gain: [
      { name: 'Chest & Triceps', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Legs & Core', cardioType: 'cardio', strengthType: 'lower_body' },
      { name: 'Back & Biceps', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Shoulders & Core', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Leg Power Day', cardioType: 'cardio', strengthType: 'lower_body' },
      { name: 'Full Body Strength', cardioType: 'cardio', strengthType: 'full_body' }
    ],
    maintenance: [
      { name: 'Upper Body Strength', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Lower Body & Cardio', cardioType: 'cardio', strengthType: 'lower_body' },
      { name: 'Full Body Circuit', cardioType: 'cardio', strengthType: 'full_body' },
      { name: 'Core & Conditioning', cardioType: 'cardio', strengthType: 'core' },
      { name: 'Upper Body & Cardio', cardioType: 'cardio', strengthType: 'upper_body' },
      { name: 'Lower Body & Flexibility', cardioType: 'cardio', strengthType: 'lower_body' }
    ]
  };

  const schedule = trainingSchedule[goal] || trainingSchedule.maintenance;
  const dayPlan = schedule[trainingDay - 1];

  return {
    name: `${dayPlan.name} - Week ${weekNumber}`,
    cardio: generateCardioWorkout(profile, weekNumber, dayPlan.cardioType),
    strength: generateStrengthWorkout(profile, weekNumber, dayPlan.strengthType)
  };
}
