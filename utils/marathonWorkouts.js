// Marathon Training Plan Generator
// 16-week progressive plan with algorithmic customization

export function generateMarathonWorkout(week, dayNumber, profile) {
  const { gender, age, height, weight, difficulty = 'intermediate', goal = 'finish' } = profile;
  
  // Map difficulty to level
  const level = difficulty === 'beginner' ? 'beginner' : difficulty === 'advanced' ? 'advanced' : 'intermediate';
  
  // Calculate metrics using Mifflin-St Jeor equation
  const bmi = weight / ((height / 100) ** 2);
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  
  const tdee = bmr * (level === 'beginner' ? 1.4 : level === 'advanced' ? 1.8 : 1.6);
  
  // Determine training variables based on level
  const baseMileage = level === 'beginner' ? 15 : level === 'advanced' ? 35 : 25;
  const longRunPct = level === 'beginner' ? 0.4 : level === 'advanced' ? 0.3 : 0.35;
  const speedWorkPct = level === 'beginner' ? 0.1 : level === 'advanced' ? 0.2 : 0.15;
  
  // Calculate weekly mileage (progressive)
  const mileageIncrease = level === 'advanced' ? 2.5 : 1.5;
  const weeklyMileage = baseMileage + week * mileageIncrease;
  
  // Calculate specific workout distances
  const longRun = Math.round(weeklyMileage * longRunPct);
  const tempoRun = Math.round(weeklyMileage * 0.2);
  const easyRun = Math.round(weeklyMileage * 0.25);
  const recoveryRun = 3;
  
  // Determine if speed work is included this week
  const hasSpeedWork = level === 'advanced' || week > 8;
  
  // Get workout for specific day
  return getMarathonDayWorkout(dayNumber, {
    week,
    level,
    goal,
    gender,
    weeklyMileage,
    longRun,
    tempoRun,
    easyRun,
    recoveryRun,
    hasSpeedWork,
    bmi,
    bmr,
    tdee
  });
}

function getMarathonDayWorkout(dayNumber, params) {
  const { week, level, goal, gender, weeklyMileage, longRun, tempoRun, easyRun, recoveryRun, hasSpeedWork, tdee } = params;
  
  // 6-day training cycle (rest days are handled by user's selected rest days)
  const workouts = {
    1: {
      name: 'Easy Run',
      cardio: getEasyRunWorkout(easyRun, level, week),
      strength: ['Light stretching - 10 minutes']
    },
    2: {
      name: 'Strength & Core Training',
      cardio: ['Optional: 20-30 min easy bike or swim (cross-training)'],
      strength: getStrengthCoreWorkout(level, week)
    },
    3: {
      name: 'Tempo Run',
      cardio: getTempoRunWorkout(tempoRun, level, week, goal),
      strength: [
        'Post-run stretching - 10 minutes',
        '',
        '💪 CORE ACTIVATION (important for running form):',
        '  • Plank hold - 2 sets x 30-45s',
        '  • Purpose: Strengthen core stability to maintain proper posture during fatigue',
        '  • Benefits: Prevents lower back pain, improves running economy, reduces injury risk'
      ]
    },
    4: {
      name: hasSpeedWork ? 'Speed Work & Intervals' : 'Cross Training',
      cardio: hasSpeedWork 
        ? getSpeedWorkWorkout(level, week, goal, gender)
        : getCrossTrainingWorkout(level),
      strength: hasSpeedWork 
        ? ['Dynamic stretching - 10 minutes', 'Leg swings - 2 sets x 10 each']
        : []
    },
    5: {
      name: 'Long Run',
      cardio: getLongRunWorkout(longRun, level, week, goal),
      strength: ['Post-run recovery protocol:', '  • Walk 5-10 minutes', '  • Static stretching - 15 minutes', '  • Foam rolling - 10 minutes']
    },
    6: {
      name: 'Recovery Run',
      cardio: getRecoveryRunWorkout(recoveryRun, level),
      strength: ['Yoga or light stretching - 20-30 minutes']
    }
  };
  
  return workouts[dayNumber] || workouts[1];
}

// === WORKOUT LIBRARIES ===

function getEasyRunWorkout(miles, level, week) {
  const pace = level === 'beginner' ? '10:00-11:00/mi' : level === 'advanced' ? '8:00-9:00/mi' : '9:00-10:00/mi';
  const kmPace = level === 'beginner' ? '6:13-6:50/km' : level === 'advanced' ? '4:58-5:35/km' : '5:35-6:13/km';
  
  return [
    `Easy aerobic run - ${miles} miles (${Math.round(miles * 1.6)} km)`,
    `Target pace: ${pace} (${kmPace})`,
    'Effort: Conversational pace - should be able to speak in full sentences',
    'Focus: Building aerobic base and endurance',
    'Warm-up: 5-10 min easy jog',
    'Cool-down: 5 min walk'
  ];
}

function getStrengthCoreWorkout(level, week) {
  const sets = level === 'beginner' ? '2-3' : level === 'advanced' ? '3-4' : '3';
  
  return [
    '🏋️ LOWER BODY STRENGTH:',
    `  • Single-leg squats - ${sets} sets x 10 each leg`,
    `  • Walking lunges - ${sets} sets x 12 each leg`,
    `  • Romanian deadlifts - ${sets} sets x 12 reps`,
    `  • Calf raises - ${sets} sets x 15-20 reps`,
    `  • Glute bridges - ${sets} sets x 15 reps`,
    '',
    '💪 CORE CIRCUIT:',
    `  • Plank hold - ${sets} sets x 45-60s`,
    `  • Side planks - ${sets} sets x 30-45s each side`,
    `  • Dead bugs - ${sets} sets x 12 each side`,
    `  • Bird dogs - ${sets} sets x 10 each side`,
    `  • Russian twists - ${sets} sets x 20 total`,
    '',
    '⚡ PLYOMETRICS (explosive power - optional for advanced runners):',
    level === 'advanced' ? '  • Box jumps - 3 sets x 8 reps' : '',
    level === 'advanced' ? '  • Single-leg hops - 3 sets x 10 each leg' : '',
    level === 'advanced' ? '  • Purpose: Develop explosive power and running economy' : '',
    level === 'advanced' ? '  • Note: Skip if feeling fatigued to avoid injury risk' : '',
    '',
    '✅ Overall Focus: Running-specific strength to prevent injury and improve efficiency'
  ].filter(Boolean);
}

function getTempoRunWorkout(miles, level, week, goal) {
  const pace = level === 'beginner' ? '9:00-9:30/mi' : level === 'advanced' ? '7:15-7:45/mi' : '8:00-8:30/mi';
  const kmPace = level === 'beginner' ? '5:35-5:54/km' : level === 'advanced' ? '4:30-4:49/km' : '4:58-5:17/km';
  const effortPct = goal === 'performance' ? '85-90%' : '80-85%';
  
  return [
    'Warm-up: 10-15 min easy jog + dynamic stretches',
    '',
    `🎯 TEMPO RUN - ${miles} miles (${Math.round(miles * 1.6)} km)`,
    `Target pace: ${pace} (${kmPace})`,
    `Effort: ${effortPct} max HR - comfortably hard`,
    'Should be able to speak short phrases but not full sentences',
    '',
    'Cool-down: 10 min easy jog',
    '',
    '💡 Purpose: Improve lactate threshold and race pace endurance'
  ];
}

function getSpeedWorkWorkout(level, week, goal, gender) {
  if (level === 'beginner') {
    return [
      'Warm-up: 15 min easy jog + strides (4 x 100m)',
      '',
      '🏃 INTERVAL WORKOUT:',
      '  • 6 x 400m @ 5K pace (90s recovery jog between)',
      '  • Focus on consistent splits',
      '',
      'Cool-down: 10 min easy jog',
      '',
      '💡 Purpose: Develop speed and running economy'
    ];
  } else if (level === 'intermediate') {
    return [
      'Warm-up: 15 min easy jog + dynamic drills + 6 x 100m strides',
      '',
      '🏃 INTERVAL WORKOUT (choose one):',
      week % 2 === 0 
        ? '  • 8 x 800m @ 10K pace (2 min recovery)'
        : '  • 5 x 1 mile @ half-marathon pace (3 min recovery)',
      '  • Focus on negative splits (faster second half)',
      '',
      'Cool-down: 10-15 min easy jog',
      '',
      '💡 Purpose: Improve VO2max and race pace confidence'
    ];
  } else {
    // Advanced
    const goalPace = gender === 'male' ? '6:30-7:00/mi' : '7:30-8:00/mi';
    return [
      'Warm-up: 2 miles easy + dynamic drills + 8 x 100m strides',
      '',
      '🏃 ADVANCED SPEED WORKOUT (choose one):',
      week % 3 === 0 
        ? `  • 10 x 1000m @ ${goalPace} (90s recovery)`
        : week % 3 === 1
          ? '  • Yasso 800s: 8 x 800m @ target marathon time (e.g., 3:30 for 3:30 marathon)'
          : '  • Tempo intervals: 3 x 2 miles @ marathon pace (2 min recovery)',
      '',
      'Cool-down: 1-2 miles easy jog',
      '',
      '💡 Purpose: Marathon-specific pace work and mental toughness'
    ];
  }
}

function getCrossTrainingWorkout(level) {
  const duration = level === 'beginner' ? '30-40' : level === 'advanced' ? '45-60' : '40-50';
  
  return [
    '🚴 CROSS-TRAINING OPTIONS (choose one):',
    `  • Cycling - ${duration} minutes at moderate intensity`,
    `  • Swimming - ${duration} minutes continuous`,
    `  • Elliptical - ${duration} minutes`,
    `  • Rowing - ${duration} minutes`,
    '',
    '💡 Purpose: Maintain cardiovascular fitness while giving your running muscles a break',
    '  • Benefits: No impact on joints/bones = active recovery',
    '  • Reduces injury risk from repetitive running stress',
    '  • Keeps heart rate elevated without the pounding',
    '',
    'Keep effort conversational - Zone 2 heart rate (able to chat comfortably)'
  ];
}

function getLongRunWorkout(miles, level, week, goal) {
  const pace = level === 'beginner' ? '10:30-11:30/mi' : level === 'advanced' ? '8:30-9:30/mi' : '9:30-10:30/mi';
  const kmPace = level === 'beginner' ? '6:32-7:09/km' : level === 'advanced' ? '5:17-5:54/km' : '5:54-6:32/km';
  const duration = Math.round(miles * (level === 'beginner' ? 11 : level === 'advanced' ? 9 : 10));
  
  return [
    `🏃 LONG RUN - ${miles} miles (${Math.round(miles * 1.6)} km)`,
    `Target pace: ${pace} (${kmPace})`,
    `Estimated duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')} hours`,
    '',
    'Effort: Easy conversational pace - 65-75% max HR',
    'Purpose: Build endurance, mental toughness, and fat adaptation',
    '',
    week >= 12 ? '⚡ LAST 3-4 MILES: Pick up pace to marathon goal pace (practice race finish)' : '',
    '',
    '💡 TIPS:',
    '  • Start slower than target pace (negative split)',
    '  • Practice race-day fueling and hydration',
    week >= 14 ? '  • Visualize race day scenarios' : '  • Run on similar terrain to race course if possible'
  ].filter(Boolean);
}

function getRecoveryRunWorkout(miles, level) {
  const pace = level === 'beginner' ? '11:00-12:00/mi' : level === 'advanced' ? '9:00-10:00/mi' : '10:00-11:00/mi';
  
  return [
    `Recovery run - ${miles} miles (${Math.round(miles * 1.6)} km)`,
    `Target pace: ${pace} - VERY EASY`,
    'Effort: Should feel effortless - could maintain for hours',
    '',
    '💡 Purpose: Active recovery to help your body bounce back from the long run',
    '  • Benefits: Light movement increases blood flow to muscles',
    '  • Flushes out metabolic waste (lactic acid, inflammation)',
    '  • Speeds up recovery better than complete rest',
    '  • This run should leave you feeling BETTER than when you started',
    '',
    '⚠️ Important: Replace with complete rest day if feeling very fatigued or sore'
  ];
}

// Export for integration
export function getMarathonPlanOverview(profile) {
  const { difficulty = 'intermediate' } = profile;
  const level = difficulty === 'beginner' ? 'beginner' : difficulty === 'advanced' ? 'advanced' : 'intermediate';
  
  const baseMileage = level === 'beginner' ? 15 : level === 'advanced' ? 35 : 25;
  const peakWeek = 16;
  const peakMileage = baseMileage + peakWeek * (level === 'advanced' ? 2.5 : 1.5);
  
  return {
    duration: '16 weeks',
    baseMileage: `${baseMileage} miles/week`,
    peakMileage: `${Math.round(peakMileage)} miles/week`,
    longRunMax: `${Math.round(peakMileage * (level === 'beginner' ? 0.4 : level === 'advanced' ? 0.3 : 0.35))} miles`,
    structure: '6-day training cycle: Easy Run → Strength/Core → Tempo → Speed Work/Cross Train → Long Run → Recovery (your selected rest days)',
    focus: level === 'beginner' ? 'Finish strong' : level === 'advanced' ? 'Performance & PR' : 'Balanced endurance & speed'
  };
}
