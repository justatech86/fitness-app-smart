// FBI Physical Fitness Test (PFT) workout generator
// NEW 2025 Standards: Pull-ups, 300m Sprint, Push-ups, 1.5-Mile Run

export function generateFBIPFTWorkout(week, dayNumber, profile) {
  const { difficulty = 'beginner', equipment = [] } = profile;
  
  // Determine equipment access level
  const equipmentLevel = determineEquipmentLevel(equipment);
  
  // Determine phase based on week
  const phase = getTrainingPhase(week, profile.weeks || 12);
  
  // Get workout based on phase and day
  return getFBIPFTWorkout(week, dayNumber, difficulty, equipmentLevel, phase);
}

function determineEquipmentLevel(equipment) {
  const hasPullUpBar = equipment.includes('pull_up_bar');
  const hasBarbell = equipment.includes('barbell');
  const hasDumbbells = equipment.includes('dumbbells');
  const hasBands = equipment.includes('resistance_bands');
  
  // Full gym: has pull-up bar and weights
  if (hasPullUpBar && (hasBarbell || hasDumbbells)) {
    return 'full_gym';
  }
  
  // Limited: has some equipment
  if (hasPullUpBar || hasDumbbells || hasBands) {
    return 'limited';
  }
  
  // Minimal: bodyweight only
  return 'minimal';
}

function getTrainingPhase(week, totalWeeks) {
  const progress = week / totalWeeks;
  if (progress <= 0.33) return 'foundation';
  if (progress <= 0.66) return 'development';
  return 'peak';
}

// === FBI PFT WORKOUTS ===
function getFBIPFTWorkout(week, dayNumber, difficulty, equipment, phase) {
  const workouts = {
    1: {
      name: 'Pull-Up Strength Development',
      strength: getPullUpExercises(difficulty, equipment, phase),
      cardio: ['Light jog - 10-15 minutes (recovery)']
    },
    2: {
      name: '300m Sprint Training',
      cardio: get300mSprintWorkout(difficulty, phase),
      strength: ['Core stability - 3 sets planks 30-60s', 'Leg swings - 2 sets x 10 each direction']
    },
    3: {
      name: 'Push-Up Volume & Endurance',
      strength: getPushUpExercises(difficulty, equipment, phase),
      cardio: ['Easy run - 2-3 miles at conversational pace']
    },
    4: {
      name: '1.5-Mile Run Development',
      cardio: get1Point5MileRunWorkout(difficulty, phase, week),
      strength: ['Light upper body - 2 sets x 10 push-ups', 'Core work - 2 sets x 20 crunches']
    },
    5: {
      name: 'Full Body Conditioning',
      strength: [
        ...getPullUpExercises(difficulty, equipment, phase, true),
        ...getPushUpExercises(difficulty, equipment, phase, true)
      ],
      cardio: ['Tempo run - 20-30 minutes at moderate-hard pace']
    },
    6: {
      name: 'FBI PFT Full Simulation',
      strength: getFBIPFTSimulation(difficulty, equipment),
      cardio: []
    }
  };
  
  return workouts[dayNumber] || workouts[1];
}

// === EXERCISE LIBRARIES ===

function getPullUpExercises(difficulty, equipment, phase, lightVersion = false) {
  const sets = lightVersion ? 3 : (difficulty === 'beginner' ? 4 : difficulty === 'intermediate' ? 5 : 6);
  
  if (equipment === 'full_gym' || equipment === 'limited') {
    const hasWeights = equipment === 'full_gym';
    
    return [
      `Pull-ups (strict form) - ${sets} sets x max reps (2-3 min rest)`,
      `Negative Pull-ups (slow descent) - 3 sets x 3-5 reps`,
      `${hasWeights ? 'Lat Pulldowns' : 'Band-assisted Pull-ups'} - 3 sets x 8-12 reps`,
      `${hasWeights ? 'Barbell Rows' : 'Inverted Rows'} - 3 sets x 10-12 reps`,
      `Dead Hangs - 3 sets x max time (build grip strength)`,
      `Scapular Pull-ups - 2 sets x 10 reps (control at top)`
    ];
  } else {
    // Minimal equipment - build pull-up strength progressively
    return [
      `Assisted Pull-ups (chair/partner) - ${sets} sets x max reps`,
      `Negative Pull-ups (jump up, slow down) - 4 sets x 5 reps`,
      `Door Frame Rows or Table Rows - 4 sets x 12-15 reps`,
      `Flexed Arm Hang - 3 sets x max time`,
      `Towel Grip Rows - 3 sets x 10 reps (use doorframe)`,
      `Band Pull-aparts - 3 sets x 15 reps (if bands available)`
    ];
  }
}

function getPushUpExercises(difficulty, equipment, phase, lightVersion = false) {
  const sets = lightVersion ? 3 : (difficulty === 'beginner' ? 4 : difficulty === 'intermediate' ? 5 : 6);
  
  const exercises = [
    `Standard Push-ups - ${sets} sets x max reps (2 min rest)`,
    `Wide-grip Push-ups - 3 sets x max reps`,
    `Diamond Push-ups - 3 sets x max reps`,
    `Decline Push-ups (feet elevated) - 3 sets x 15-20 reps`,
    `Push-up Hold (top position) - 3 sets x 30-45s`,
    `Shoulder Taps (in plank) - 3 sets x 20 total`
  ];
  
  if (equipment === 'full_gym') {
    exercises.push(
      'Bench Press - 3 sets x 8-10 reps',
      'Dumbbell Flyes - 3 sets x 12 reps',
      'Tricep Dips - 3 sets x 12-15 reps'
    );
  } else if (equipment === 'limited') {
    exercises.push(
      'Dumbbell Chest Press - 3 sets x 10-12 reps',
      'Tricep Extensions - 3 sets x 12 reps'
    );
  }
  
  return exercises;
}

function get300mSprintWorkout(difficulty, phase) {
  const intervals = {
    'foundation': { beginner: '6-8', intermediate: '8-10', advanced: '10-12' },
    'development': { beginner: '8-10', intermediate: '10-12', advanced: '12-15' },
    'peak': { beginner: '10-12', intermediate: '12-15', advanced: '15-18' }
  };
  
  const targetPace = {
    beginner: '90-95% effort',
    intermediate: '95% effort',
    advanced: '95-100% effort (race pace)'
  };
  
  if (phase === 'foundation') {
    return [
      'Dynamic warm-up - 10 minutes (leg swings, high knees, butt kicks)',
      `${intervals[phase][difficulty]} x 100m sprints @ ${targetPace[difficulty]} (60-90s rest)`,
      '4 x 50m acceleration drills',
      'Cool-down jog - 5 minutes'
    ];
  } else if (phase === 'development') {
    return [
      'Dynamic warm-up - 10 minutes',
      `${intervals[phase][difficulty]} x 150m sprints @ ${targetPace[difficulty]} (2 min rest)`,
      '4 x 300m @ 90-95% (3 min rest) - PRACTICE PACING',
      'Cool-down jog - 5 minutes'
    ];
  } else {
    return [
      'Dynamic warm-up - 15 minutes (include strides)',
      `${intervals[phase][difficulty]} x 200m sprints @ ${targetPace[difficulty]} (2-3 min rest)`,
      '2-3 x 300m TIME TRIALS (full recovery between)',
      'Cool-down jog - 10 minutes'
    ];
  }
}

function get1Point5MileRunWorkout(difficulty, phase, week) {
  const targetTimes = {
    male: {
      beginner: '12:00-11:30',
      intermediate: '10:30-10:00',
      advanced: '9:30-9:00'
    },
    female: {
      beginner: '14:00-13:30',
      intermediate: '12:30-12:00',
      advanced: '11:30-11:00'
    }
  };
  
  if (phase === 'foundation') {
    return [
      'Warm-up - 10 minutes easy jog',
      `Easy run - ${difficulty === 'beginner' ? '2-3' : difficulty === 'intermediate' ? '3-4' : '4-5'} miles at conversational pace`,
      'Focus on building aerobic base',
      'Cool-down - 5 minutes walk',
      'Stretching routine - 10 minutes'
    ];
  } else if (phase === 'development') {
    return [
      'Warm-up - 10 minutes easy + 4 x 100m strides',
      `Tempo run - ${difficulty === 'beginner' ? '1-1.5' : difficulty === 'intermediate' ? '1.5-2' : '2-2.5'} miles at threshold pace`,
      'Run at comfortably hard effort (can speak short sentences)',
      'Cool-down - 10 minutes easy',
      'Dynamic stretching - 10 minutes'
    ];
  } else {
    return [
      'Warm-up - 15 minutes easy + dynamic drills + 6 x 100m strides',
      '1.5-mile TIME TRIAL at race pace',
      `Target: ${targetTimes.male[difficulty]} (male) or ${targetTimes.female[difficulty]} (female)`,
      'Focus on even pacing - negative split if possible',
      'Cool-down - 10-15 minutes easy',
      'Foam rolling and stretching - 15 minutes'
    ];
  }
}

function getFBIPFTSimulation(difficulty, equipment) {
  return [
    '🏋️ FBI PFT SIMULATION - NEW 2025 FORMAT:',
    '',
    '1️⃣ PULL-UPS (untimed, continuous motion)',
    '   → Max reps without stopping',
    `   → Target: ${difficulty === 'beginner' ? '6-8 (male) / 3-4 (female)' : difficulty === 'intermediate' ? '10-12 (male) / 5-6 (female)' : '15+ (male) / 8+ (female)'}`,
    '   → 5 minutes rest',
    '',
    '2️⃣ 300-METER SPRINT',
    '   → All-out effort on track or measured course',
    `   → Target: ${difficulty === 'beginner' ? '<52s (male) / <65s (female)' : difficulty === 'intermediate' ? '<46s (male) / <58s (female)' : '<43s (male) / <53s (female)'}`,
    '   → 5 minutes rest',
    '',
    '3️⃣ PUSH-UPS (untimed, continuous motion)',
    '   → Max reps in proper form',
    `   → Target: ${difficulty === 'beginner' ? '40+ (male) / 22+ (female)' : difficulty === 'intermediate' ? '50+ (male) / 30+ (female)' : '65+ (male) / 40+ (female)'}`,
    '   → 5 minutes rest',
    '',
    '4️⃣ 1.5-MILE RUN',
    '   → Timed run for best effort',
    `   → Target: ${difficulty === 'beginner' ? '<11:30 (male) / <13:30 (female)' : difficulty === 'intermediate' ? '<10:00 (male) / <12:00 (female)' : '<9:00 (male) / <11:00 (female)'}`,
    '',
    '📊 SCORING: Need 10+ total points (min 1 point per event)',
    '⚠️ Record all results and compare to official FBI scoring tables'
  ];
}
