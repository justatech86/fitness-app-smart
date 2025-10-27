// Army Combat Fitness Test (ACFT) workout generator
// Focuses on: Deadlift, Standing Power Throw, Push-Ups, Sprint-Drag-Carry, Plank, 2-Mile Run

export function generateArmyPFTWorkout(week, dayNumber, profile) {
  const { difficulty = 'beginner', armyGoalFocus = 'balanced', equipment = [] } = profile;
  
  // Determine equipment access level based on available equipment
  const equipmentLevel = determineEquipmentLevel(equipment);
  
  // Determine phase based on week
  const phase = getTrainingPhase(week, profile.weeks || 12);
  
  // Get workout based on goal focus
  if (armyGoalFocus === 'strength') {
    return getStrengthFocusWorkout(week, dayNumber, difficulty, equipmentLevel, phase);
  } else if (armyGoalFocus === 'endurance') {
    return getEnduranceFocusWorkout(week, dayNumber, difficulty, equipmentLevel, phase);
  } else {
    return getBalancedWorkout(week, dayNumber, difficulty, equipmentLevel, phase);
  }
}

function determineEquipmentLevel(equipment) {
  // Convert equipment array to equipment access level
  const hasBarbell = equipment.includes('barbell');
  const hasCable = equipment.includes('cable');
  const hasMachine = equipment.includes('machine');
  const hasDumbbells = equipment.includes('dumbbells');
  const hasBands = equipment.includes('resistance_bands');
  
  // Full gym: has barbell and at least one of cable/machine
  if (hasBarbell && (hasCable || hasMachine)) {
    return 'full_gym';
  }
  
  // Limited: has dumbbells or bands
  if (hasDumbbells || hasBands || hasBarbell) {
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

// === BALANCED OVERALL WORKOUTS ===
function getBalancedWorkout(week, dayNumber, difficulty, equipment, phase) {
  const workouts = {
    1: {
      name: 'Deadlift & Core Strength',
      strength: getDeadliftExercises(difficulty, equipment, phase),
      cardio: [`Plank Progressions - ${getPlanTime(difficulty, phase)}`]
    },
    2: {
      name: 'Upper Body Power & Push',
      strength: getPushUpVariations(difficulty, equipment, phase),
      cardio: ['10-15 min easy jog or row (recovery pace)']
    },
    3: {
      name: 'Sprint-Drag-Carry Training',
      strength: getCarryExercises(difficulty, equipment, phase),
      cardio: getSprintDrillsBalanced(difficulty, phase)
    },
    4: {
      name: 'Power Throw & Explosive Work',
      strength: getPowerThrowExercises(difficulty, equipment, phase),
      cardio: ['Dynamic warm-up drills - 10 minutes']
    },
    5: {
      name: '2-Mile Run Conditioning',
      cardio: get2MileRunWorkout(difficulty, phase, week),
      strength: ['Light core work - 3 sets planks']
    },
    6: {
      name: 'Full ACFT Simulation',
      strength: getACFTSimulation(difficulty, equipment, phase),
      cardio: ['Complete 2-mile run at target pace']
    }
  };
  
  return workouts[dayNumber] || workouts[1];
}

// === STRENGTH/POWER EMPHASIS WORKOUTS ===
function getStrengthFocusWorkout(week, dayNumber, difficulty, equipment, phase) {
  const workouts = {
    1: {
      name: 'Max Deadlift Development',
      strength: [
        ...getDeadliftExercises(difficulty, equipment, phase),
        ...getAccessoryLifts(equipment, 'lower', difficulty)
      ],
      cardio: []
    },
    2: {
      name: 'Power Throw & Explosive Training',
      strength: [
        ...getPowerThrowExercises(difficulty, equipment, phase),
        ...getAccessoryLifts(equipment, 'upper', difficulty)
      ],
      cardio: ['High-intensity sled pushes - 5 sets of 20 yards']
    },
    3: {
      name: 'Push-Up Strength & Volume',
      strength: getPushUpVariations(difficulty, equipment, phase, true),
      cardio: [`Core work - ${getPlanTime(difficulty, phase)} total`]
    },
    4: {
      name: 'Sprint Power & Carries',
      strength: getCarryExercises(difficulty, equipment, phase),
      cardio: ['Sprint intervals - 8-12 x 40 yards with full recovery']
    },
    5: {
      name: 'Full Body Power',
      strength: [
        ...getOlympicLifts(equipment, difficulty),
        ...getCarryExercises(difficulty, equipment, phase)
      ],
      cardio: []
    },
    6: {
      name: 'ACFT Event Practice',
      strength: getACFTSimulation(difficulty, equipment, phase),
      cardio: ['2-mile run - moderate pace (not max effort)']
    }
  };
  
  return workouts[dayNumber] || workouts[1];
}

// === ENDURANCE/CONDITIONING EMPHASIS WORKOUTS ===
function getEnduranceFocusWorkout(week, dayNumber, difficulty, equipment, phase) {
  const workouts = {
    1: {
      name: 'Endurance Base Run',
      cardio: ['Easy run - 3-5 miles at conversational pace', 'Cool-down walk - 5 minutes'],
      strength: [`Core stability - ${getPlanTime(difficulty, phase)}`]
    },
    2: {
      name: 'Sprint-Drag-Carry Conditioning',
      cardio: getSprintDrillsEndurance(difficulty, phase),
      strength: getCarryExercises(difficulty, equipment, phase)
    },
    3: {
      name: 'Tempo Run & Strength',
      cardio: getTempoRunWorkout(difficulty, phase),
      strength: ['Push-ups - 3-4 sets to near failure', 'Planks - 3 sets max hold']
    },
    4: {
      name: 'Interval Training',
      cardio: ['Run intervals - 6-10 x 400m at 2-mile race pace', 'Active recovery between sets'],
      strength: getDeadliftExercises(difficulty, equipment, phase, true)
    },
    5: {
      name: 'Long Slow Distance',
      cardio: ['Long run - 5-8 miles at easy pace', 'Mobility work - 10 minutes'],
      strength: ['Bodyweight circuit - 20 minutes']
    },
    6: {
      name: 'ACFT Simulation',
      strength: getACFTSimulation(difficulty, equipment, phase),
      cardio: ['2-mile run at target pace']
    }
  };
  
  return workouts[dayNumber] || workouts[1];
}

// === EXERCISE LIBRARIES ===

function getDeadliftExercises(difficulty, equipment, phase, lightVersion = false) {
  const intensity = {
    'foundation': { beginner: '50-60%', intermediate: '60-70%', advanced: '70-75%' },
    'development': { beginner: '60-70%', intermediate: '70-80%', advanced: '75-85%' },
    'peak': { beginner: '70-75%', intermediate: '75-85%', advanced: '85-90%' }
  };
  
  const sets = lightVersion ? '3-4' : difficulty === 'beginner' ? '4-5' : difficulty === 'intermediate' ? '5-6' : '6-8';
  const reps = lightVersion ? '5-8' : difficulty === 'beginner' ? '8-10' : difficulty === 'intermediate' ? '5-8' : '3-5';
  
  if (equipment === 'full_gym') {
    return [
      `Conventional Deadlift - ${sets} sets x ${reps} reps @ ${intensity[phase][difficulty]} 1RM`,
      `Romanian Deadlifts - 3 sets x 8-12 reps`,
      `Barbell Hip Thrusts - 3 sets x 10-15 reps`,
      `Hamstring Curls - 3 sets x 12-15 reps`
    ];
  } else if (equipment === 'limited') {
    return [
      `Dumbbell Deadlift - ${sets} sets x ${reps} reps (heavy DBs)`,
      `Single-leg Romanian DL - 3 sets x 10 each leg`,
      `Goblet Squats - 3 sets x 12-15 reps`,
      `Glute Bridges - 3 sets x 15-20 reps`
    ];
  } else {
    return [
      `Single-leg Deadlift - ${sets} sets x ${reps} each leg`,
      `Nordic Hamstring Curls - 3 sets x 5-8 reps`,
      `Jump Squats - 3 sets x 10-12 reps`,
      `Glute Bridges - 4 sets x 20 reps`
    ];
  }
}

function getPushUpVariations(difficulty, equipment, phase, volumeDay = false) {
  const base = volumeDay ? 1.5 : 1;
  const sets = Math.round((difficulty === 'beginner' ? 4 : difficulty === 'intermediate' ? 5 : 6) * base);
  
  if (equipment === 'full_gym') {
    return [
      `Bench Press - ${sets} sets x ${difficulty === 'beginner' ? '8-10' : difficulty === 'intermediate' ? '6-8' : '5-6'} reps`,
      `Incline Dumbbell Press - 3 sets x 10-12 reps`,
      `Push-ups - 3-4 sets x max reps (2 min rest)`,
      `Dips - 3 sets x 8-12 reps`,
      `Tricep Pushdowns - 3 sets x 12-15 reps`
    ];
  } else if (equipment === 'limited') {
    return [
      `Dumbbell Chest Press - ${sets} sets x 10-12 reps`,
      `Push-ups - 4-5 sets x max reps`,
      `Dumbbell Flyes - 3 sets x 12-15 reps`,
      `Diamond Push-ups - 3 sets x max reps`
    ];
  } else {
    return [
      `Standard Push-ups - ${sets} sets x max reps (2 min rest)`,
      `Wide-grip Push-ups - 3 sets x max reps`,
      `Diamond Push-ups - 3 sets x max reps`,
      `Decline Push-ups (feet elevated) - 3 sets x max reps`,
      `Plyometric Push-ups - 3 sets x 8-10 reps`
    ];
  }
}

function getPowerThrowExercises(difficulty, equipment, phase) {
  if (equipment === 'full_gym') {
    return [
      `Medicine Ball Overhead Throw - ${difficulty === 'beginner' ? '3' : difficulty === 'intermediate' ? '4' : '5'} sets x 5-8 throws`,
      `Medicine Ball Slam - 3 sets x 10 reps`,
      `Seated Box Jumps - 3 sets x 5 reps`,
      `Cable Wood Chops - 3 sets x 10 each side`,
      `Landmine Press - 3 sets x 8-10 reps`
    ];
  } else if (equipment === 'limited') {
    return [
      `Medicine Ball Overhead Throw - ${difficulty === 'beginner' ? '3' : difficulty === 'intermediate' ? '4' : '5'} sets x 5-8 throws`,
      `Medicine Ball Slam - 3 sets x 10 reps`,
      `Dumbbell Push Press - 3 sets x 8-10 reps`,
      `Rotational Med Ball Throws - 3 sets x 8 each side`
    ];
  } else {
    return [
      `Explosive Push-ups - 4 sets x 6-8 reps`,
      `Jump Squats - 4 sets x 8-10 reps`,
      `Burpee Broad Jumps - 3 sets x 5-8 reps`,
      `Plyo Push-ups - 3 sets x 6-8 reps`
    ];
  }
}

function getCarryExercises(difficulty, equipment, phase) {
  const distance = difficulty === 'beginner' ? '25 yards' : difficulty === 'intermediate' ? '40 yards' : '50 yards';
  
  if (equipment === 'full_gym') {
    return [
      `Sled Push - 5-8 sets x ${distance}`,
      `Farmer's Carry (heavy) - 4-6 sets x ${distance}`,
      `Sandbag Carry - 4 sets x ${distance}`,
      `Kettlebell Rack Carry - 3 sets x ${distance} each side`,
      `Barbell Walking Lunges - 3 sets x 20 steps`
    ];
  } else if (equipment === 'limited') {
    return [
      `Dumbbell Farmer's Carry - 5-6 sets x ${distance}`,
      `Sandbag/Heavy Object Carry - 4 sets x ${distance}`,
      `Overhead Carry - 3 sets x ${distance}`,
      `Suitcase Carry - 3 sets x ${distance} each side`
    ];
  } else {
    return [
      `Bear Crawl - 5 sets x ${distance}`,
      `Broad Jumps - 5 sets x 10 jumps`,
      `Fireman Carry (partner or heavy pack) - 4 sets x ${distance}`,
      `Sprint-Backpedal Drills - 6 sets x ${distance}`
    ];
  }
}

function getSprintDrillsBalanced(difficulty, phase) {
  const sprints = difficulty === 'beginner' ? '6-8' : difficulty === 'intermediate' ? '8-10' : '10-12';
  return [
    `Sprint intervals - ${sprints} x 40 yards @ 90% effort`,
    'Lateral shuffle drills - 4 sets x 20 yards each direction',
    'Backpedal sprints - 4 sets x 20 yards',
    'Pro agility shuttle - 4-6 reps'
  ];
}

function getSprintDrillsEndurance(difficulty, phase) {
  const rounds = difficulty === 'beginner' ? '4-5' : difficulty === 'intermediate' ? '5-6' : '6-8';
  return [
    `Sprint-Drag-Carry Circuit - ${rounds} rounds:`,
    '  • Sprint 50 yards',
    '  • Drag sled/partner 50 yards',
    '  • Lateral shuffle 50 yards',
    '  • Carry kettlebells 50 yards',
    '  • Sprint 50 yards',
    'Rest 2-3 minutes between rounds'
  ];
}

function get2MileRunWorkout(difficulty, phase, week) {
  if (phase === 'foundation') {
    return [
      `Easy run - ${difficulty === 'beginner' ? '15-20' : difficulty === 'intermediate' ? '20-25' : '25-30'} minutes`,
      'Focus on building aerobic base',
      'Keep heart rate in Zone 2 (conversational pace)'
    ];
  } else if (phase === 'development') {
    return [
      `Tempo run - ${difficulty === 'beginner' ? '1-1.5' : difficulty === 'intermediate' ? '1.5-2' : '2-2.5'} miles at threshold pace`,
      'Warm-up 10 minutes easy',
      'Cool-down 5-10 minutes easy'
    ];
  } else {
    return [
      'Time trial - 2 miles at race pace',
      'Warm-up 15 minutes (dynamic drills + strides)',
      'Cool-down 10 minutes easy'
    ];
  }
}

function getTempoRunWorkout(difficulty, phase) {
  return [
    'Warm-up - 10 minutes easy jog',
    `Tempo run - ${difficulty === 'beginner' ? '15' : difficulty === 'intermediate' ? '20' : '25'} minutes at comfortably hard pace`,
    'Cool-down - 5-10 minutes easy',
    'Stretching routine - 10 minutes'
  ];
}

function getACFTSimulation(difficulty, equipment, phase) {
  return [
    '🏋️ 3-Rep Max Deadlift (work up to heavy triple)',
    '⚡ Standing Power Throw - 3 attempts for max distance',
    '💪 Hand-Release Push-ups - 2 minutes max reps',
    '🏃 Sprint-Drag-Carry - full event simulation',
    '🧘 Leg Tuck or Plank - choose your event (max reps or max time)',
    '⏱️ 2-Mile Run - target race pace'
  ];
}

function getAccessoryLifts(equipment, focus, difficulty) {
  if (focus === 'lower') {
    if (equipment === 'full_gym') {
      return [
        'Front Squats - 3 sets x 8-10 reps',
        'Bulgarian Split Squats - 3 sets x 10 each leg',
        'Leg Press - 3 sets x 12-15 reps'
      ];
    } else {
      return [
        'Goblet Squats - 3 sets x 12-15 reps',
        'Lunges - 3 sets x 10 each leg',
        'Single-leg RDL - 3 sets x 10 each leg'
      ];
    }
  } else {
    if (equipment === 'full_gym') {
      return [
        'Overhead Press - 3 sets x 8-10 reps',
        'Bent-over Rows - 3 sets x 10-12 reps',
        'Cable Flyes - 3 sets x 12-15 reps'
      ];
    } else {
      return [
        'Dumbbell Shoulder Press - 3 sets x 10-12 reps',
        'Bent-over DB Rows - 3 sets x 12 reps',
        'Push-up variations - 3 sets x max reps'
      ];
    }
  }
}

function getOlympicLifts(equipment, difficulty) {
  if (equipment === 'full_gym') {
    const sets = difficulty === 'beginner' ? '3' : difficulty === 'intermediate' ? '4' : '5';
    return [
      `Power Clean - ${sets} sets x 3-5 reps`,
      `Push Jerk - ${sets} sets x 3-5 reps`,
      'Hang Snatch - 3 sets x 3 reps'
    ];
  } else {
    return [
      'Dumbbell Clean and Press - 4 sets x 6-8 reps',
      'Dumbbell Snatch - 3 sets x 5 each arm',
      'Jump Squats - 3 sets x 8-10 reps'
    ];
  }
}

function getPlanTime(difficulty, phase) {
  const times = {
    'foundation': { beginner: '1-2 min holds', intermediate: '2-3 min holds', advanced: '3-4 min holds' },
    'development': { beginner: '2-3 min holds', intermediate: '3-4 min holds', advanced: '4-5 min holds' },
    'peak': { beginner: '3-4 min holds', intermediate: '4-5 min holds', advanced: '5+ min holds' }
  };
  return times[phase][difficulty];
}
