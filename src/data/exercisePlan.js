// Exercise library + 12-week phased plan for ACL+Meniscus rehab (1 year post-op,
// re-conditioning phase). YouTube links are well-known reputable channels.

export const EXERCISES = {
  // ---- Mobility / Activation ----
  quad_sets: {
    id: "quad_sets",
    name: "Quad Sets (Isometric)",
    category: "Activation",
    description:
      "Sit with leg straight, press the back of the knee firmly into the floor by tightening the thigh. Hold, then relax.",
    cue: "Feel the inner-thigh (VMO) contract above the kneecap.",
    youtube: "https://www.youtube.com/watch?v=lOTPmMV5y7o",
  },
  heel_slides: {
    id: "heel_slides",
    name: "Heel Slides",
    category: "Mobility",
    description:
      "Lie on back, slowly slide the heel of the surgical leg toward you, bending the knee as far as comfortable. Slide back.",
    cue: "Smooth and controlled, no clicking.",
    youtube: "https://www.youtube.com/watch?v=6-anByqnKp8",
  },
  ankle_pumps: {
    id: "ankle_pumps",
    name: "Ankle Pumps",
    category: "Activation",
    description: "Point and flex the foot through full range.",
    cue: "Warm-up the calf and ankle for the session.",
    youtube: "https://www.youtube.com/watch?v=KxfFzSOAT7g",
  },
  // ---- Foundation strength ----
  glute_bridge: {
    id: "glute_bridge",
    name: "Glute Bridge",
    category: "Strength",
    description:
      "On your back, knees bent, push through heels to lift hips into a straight line.",
    cue: "Squeeze glutes at the top, don't arch the lower back.",
    youtube: "https://www.youtube.com/watch?v=wPM8icPu6H8",
  },
  clamshells: {
    id: "clamshells",
    name: "Clamshells (Banded)",
    category: "Strength",
    description:
      "Side-lying, knees bent, open the top knee like a clam while keeping heels together.",
    cue: "Hips stay stacked, no rolling back.",
    youtube: "https://www.youtube.com/watch?v=39vuP5xozsI",
  },
  side_leg_raise: {
    id: "side_leg_raise",
    name: "Side-Lying Leg Raise",
    category: "Strength",
    description:
      "Side-lying with body straight, lift top leg slowly up to ~45°, lower with control.",
    cue: "Toes pointed forward, lift with the side glute.",
    youtube: "https://www.youtube.com/watch?v=jgh6sGwtTwk",
  },
  calf_raises: {
    id: "calf_raises",
    name: "Double-leg Calf Raise",
    category: "Strength",
    description:
      "Stand tall holding a wall, rise onto the balls of feet, lower slowly.",
    cue: "3-second descent for tendon health.",
    youtube: "https://www.youtube.com/watch?v=cqDMYUaIXvw",
  },
  wall_sit: {
    id: "wall_sit",
    name: "Wall Sit",
    category: "Strength",
    description:
      "Back against the wall, slide down to a comfortable knee bend (start ~45°), hold.",
    cue: "Knees stay over ankles, not past toes.",
    youtube: "https://www.youtube.com/watch?v=y-wV4Venusw",
  },
  tke: {
    id: "tke",
    name: "Terminal Knee Extension (Band)",
    category: "Strength",
    description:
      "Loop a band behind the knee anchored ahead of you. Push the knee back to straighten fully.",
    cue: "Lock out the knee at the top, contract VMO.",
    youtube: "https://www.youtube.com/watch?v=xdKm8PSX438",
  },
  // ---- Balance / Single leg ----
  single_leg_balance: {
    id: "single_leg_balance",
    name: "Single-Leg Balance",
    category: "Balance",
    description:
      "Stand on the surgical leg, slight knee bend, balance steady. Progress to eyes closed.",
    cue: "Hip stays level — no hip drop on the unsupported side.",
    youtube: "https://www.youtube.com/watch?v=4XYzgIPyzqA",
  },
  step_ups: {
    id: "step_ups",
    name: "Step-Ups",
    category: "Strength",
    description:
      "Step onto a low step with surgical leg, drive through heel to stand tall, control down.",
    cue: "Push from the leg on the step, don't push off the back foot.",
    youtube: "https://www.youtube.com/watch?v=WCFCdxzFBa4",
  },
  mini_squat: {
    id: "mini_squat",
    name: "Mini Squats",
    category: "Strength",
    description:
      "Stand feet shoulder-width, squat to ~45° knee bend keeping knees aligned with toes.",
    cue: "Sit back into hips, chest up.",
    youtube: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
  },
  reverse_lunge: {
    id: "reverse_lunge",
    name: "Reverse Lunges",
    category: "Strength",
    description:
      "Step back into a lunge, drop the back knee, return to standing.",
    cue: "Front knee stacks over ankle.",
    youtube: "https://www.youtube.com/watch?v=xrPteyQlPv8",
  },
  lateral_band_walk: {
    id: "lateral_band_walk",
    name: "Lateral Band Walks",
    category: "Strength",
    description:
      "Band around knees or ankles, partial squat, take small steps sideways.",
    cue: "Toes pointed forward, knees pushed out.",
    youtube: "https://www.youtube.com/watch?v=qzs7utgu1Bk",
  },
  // ---- Phase 3+ ----
  bulgarian_split_squat: {
    id: "bulgarian_split_squat",
    name: "Bulgarian Split Squat",
    category: "Strength",
    description:
      "Rear foot on a low bench, descend into a lunge with the front leg.",
    cue: "Most weight through front heel.",
    youtube: "https://www.youtube.com/watch?v=2C-uNgKwPLE",
  },
  single_leg_rdl: {
    id: "single_leg_rdl",
    name: "Single-Leg RDL",
    category: "Strength",
    description:
      "Stand on one leg, hinge at hips lowering torso while back leg lifts behind.",
    cue: "Back stays flat, knee stays soft.",
    youtube: "https://www.youtube.com/watch?v=FvMxnTBLOSc",
  },
  nordic_curl_easy: {
    id: "nordic_curl_easy",
    name: "Banded Nordic Curl (Assisted)",
    category: "Strength",
    description:
      "Kneel with ankles anchored, lower slowly with band assistance, catch with hands.",
    cue: "Hamstrings work hardest in the descent.",
    youtube: "https://www.youtube.com/watch?v=W7XAQrJiQNc",
  },
  // ---- Plyo ----
  pogo_hops: {
    id: "pogo_hops",
    name: "Pogo Hops (Double-leg)",
    category: "Plyometric",
    description: "Small, quick double-leg hops in place, stay on the balls of feet.",
    cue: "Minimal knee bend, ankle-driven.",
    youtube: "https://www.youtube.com/watch?v=8_pCzN1QYZw",
  },
  lateral_line_hop: {
    id: "lateral_line_hop",
    name: "Lateral Line Hops",
    category: "Plyometric",
    description: "Quick double-leg hops side-to-side over a line.",
    cue: "Soft landing through mid-foot.",
    youtube: "https://www.youtube.com/watch?v=GnPCYCnGu4U",
  },
  single_leg_hop: {
    id: "single_leg_hop",
    name: "Single-Leg Hop (Stick the Landing)",
    category: "Plyometric",
    description:
      "Small forward hops on the surgical leg, hold each landing for 2 seconds.",
    cue: "Knee bends and tracks straight over toes on landing.",
    youtube: "https://www.youtube.com/watch?v=H8R5h8qSt7M",
  },
  box_jump_low: {
    id: "box_jump_low",
    name: "Low Box Jump",
    category: "Plyometric",
    description: "Jump onto a low (15–25 cm) sturdy box, step down.",
    cue: "Never jump down — step down to protect the knee.",
    youtube: "https://www.youtube.com/watch?v=hxldG9FX4j4",
  },
  // ---- Cardio / Walking ----
  walk: {
    id: "walk",
    name: "Brisk Walk",
    category: "Cardio",
    description: "Steady-pace walking outdoors or on a treadmill.",
    cue: "Heel-to-toe stride, even gait on both sides.",
    youtube: "https://www.youtube.com/watch?v=nmvVfgrExAg",
  },
  stationary_bike: {
    id: "stationary_bike",
    name: "Stationary Cycling",
    category: "Cardio",
    description: "Low resistance cycling at conversational pace.",
    cue: "Saddle height — slight bend in knee at bottom of stroke.",
    youtube: "https://www.youtube.com/watch?v=KKxojxHQYxQ",
  },
  // ---- Stretch / Cooldown ----
  hamstring_stretch: {
    id: "hamstring_stretch",
    name: "Hamstring Stretch",
    category: "Mobility",
    description: "Seated or lying, gently lengthen the hamstring.",
    cue: "Hold without bouncing, breathe.",
    youtube: "https://www.youtube.com/watch?v=me22JRV7pJc",
  },
  hip_flexor_stretch: {
    id: "hip_flexor_stretch",
    name: "Hip Flexor Stretch",
    category: "Mobility",
    description: "Half-kneeling, squeeze glute, gently push hips forward.",
    cue: "Tall posture, breathe deeply.",
    youtube: "https://www.youtube.com/watch?v=YQmpO9VT2X4",
  },
  foam_roll_quad: {
    id: "foam_roll_quad",
    name: "Foam Roll Quads & ITB",
    category: "Recovery",
    description: "Slow rolling along the front and outer thigh.",
    cue: "Spend extra time on tender spots.",
    youtube: "https://www.youtube.com/watch?v=JyT2Og_xJO4",
  },
};

// 4 phases, each lasts 3 weeks. Day rotation is the same in a phase;
// sets/reps scale weekly within the phase.
const PHASES = {
  1: {
    name: "Foundation",
    intention: "Symmetry over speed.",
    intentionBody: "Pay attention to how each side feels. The clicking, the limp, the jerky stair descent — they all soften when the surgical leg learns to bear weight evenly again. Slow, controlled reps win.",
    focus: "Activate quads + glutes, restore symmetry and confidence.",
    days: {
      Mon: ["quad_sets", "glute_bridge", "tke", "calf_raises", "hamstring_stretch"],
      Tue: ["walk", "ankle_pumps", "clamshells", "side_leg_raise", "foam_roll_quad"],
      Wed: ["quad_sets", "wall_sit", "step_ups", "calf_raises", "hip_flexor_stretch"],
      Thu: ["heel_slides", "hamstring_stretch", "foam_roll_quad", "ankle_pumps"],
      Fri: ["glute_bridge", "tke", "clamshells", "mini_squat", "calf_raises"],
      Sat: ["walk", "single_leg_balance", "side_leg_raise", "hamstring_stretch"],
      Sun: ["heel_slides", "ankle_pumps", "hip_flexor_stretch"],
    },
  },
  2: {
    name: "Progressive Strength",
    intention: "Earn the range.",
    intentionBody: "Single-leg work is where confidence is rebuilt. Move slowly into depth. If your hip drops or knee caves, regress the load before adding more.",
    focus: "Build single-leg control, hip stability, deeper range.",
    days: {
      Mon: ["mini_squat", "step_ups", "glute_bridge", "calf_raises", "hamstring_stretch"],
      Tue: ["walk", "single_leg_balance", "lateral_band_walk", "clamshells", "foam_roll_quad"],
      Wed: ["reverse_lunge", "tke", "wall_sit", "side_leg_raise", "hip_flexor_stretch"],
      Thu: ["heel_slides", "ankle_pumps", "foam_roll_quad", "hamstring_stretch"],
      Fri: ["mini_squat", "step_ups", "clamshells", "calf_raises", "single_leg_balance"],
      Sat: ["walk", "reverse_lunge", "glute_bridge", "hip_flexor_stretch"],
      Sun: ["hamstring_stretch", "hip_flexor_stretch", "ankle_pumps"],
    },
  },
  3: {
    name: "Power Prep",
    intention: "Train the brakes, not just the gas.",
    intentionBody: "Eccentric strength is what protects you from re-injury. Land softly, decelerate with intent. Hamstrings catch what quads cannot.",
    focus: "Introduce light plyometrics, single-leg strength, hamstring eccentrics.",
    days: {
      Mon: ["bulgarian_split_squat", "single_leg_rdl", "calf_raises", "pogo_hops", "hamstring_stretch"],
      Tue: ["stationary_bike", "single_leg_balance", "lateral_band_walk", "clamshells"],
      Wed: ["reverse_lunge", "nordic_curl_easy", "glute_bridge", "lateral_line_hop", "hip_flexor_stretch"],
      Thu: ["walk", "foam_roll_quad", "hamstring_stretch", "ankle_pumps"],
      Fri: ["bulgarian_split_squat", "single_leg_rdl", "pogo_hops", "calf_raises"],
      Sat: ["stationary_bike", "lateral_band_walk", "single_leg_balance", "hip_flexor_stretch"],
      Sun: ["foam_roll_quad", "hamstring_stretch", "ankle_pumps"],
    },
  },
  4: {
    name: "Return to Activity",
    intention: "Move with quiet confidence.",
    intentionBody: "You're ready when the knee feels boring — when nothing pops, nothing pinches, and your body trusts itself again. Don't rush the last mile.",
    focus: "Single-leg power, deceleration, light running prep.",
    days: {
      Mon: ["bulgarian_split_squat", "single_leg_hop", "single_leg_rdl", "calf_raises"],
      Tue: ["walk", "box_jump_low", "lateral_band_walk", "single_leg_balance"],
      Wed: ["reverse_lunge", "nordic_curl_easy", "single_leg_hop", "lateral_line_hop"],
      Thu: ["stationary_bike", "foam_roll_quad", "hamstring_stretch", "hip_flexor_stretch"],
      Fri: ["bulgarian_split_squat", "box_jump_low", "single_leg_rdl", "calf_raises"],
      Sat: ["walk", "single_leg_hop", "lateral_line_hop", "single_leg_balance"],
      Sun: ["foam_roll_quad", "hamstring_stretch", "ankle_pumps"],
    },
  },
};

// Volume per phase week index (1, 2, or 3 within the phase)
function volume(category, phase, weekInPhase) {
  const base = {
    Activation: { sets: 3, reps: "10 holds × 5s" },
    Mobility: { sets: 1, reps: "8 each side" },
    Strength: { sets: 2, reps: 10 },
    Balance: { sets: 3, reps: "30s hold" },
    Plyometric: { sets: 2, reps: 8 },
    Cardio: { sets: 1, reps: "20 min" },
    Recovery: { sets: 1, reps: "60s per area" },
  };
  const b = base[category] || { sets: 2, reps: 10 };
  // Progress within phase
  const progSets = b.sets + (weekInPhase - 1);
  let reps = b.reps;
  if (typeof reps === "number") {
    reps = reps + (weekInPhase - 1) * 2 + (phase - 1) * 2;
  } else if (category === "Balance") {
    reps = `${30 + (weekInPhase - 1) * 15}s hold`;
  } else if (category === "Cardio") {
    reps = `${20 + (weekInPhase - 1) * 5 + (phase - 1) * 5} min`;
  }
  return { sets: progSets, reps };
}

export function getPhaseForWeek(week) {
  return Math.min(4, Math.ceil(week / 3));
}

export function getDayPlan(week, dayName) {
  const phase = getPhaseForWeek(week);
  const phaseData = PHASES[phase];
  const weekInPhase = ((week - 1) % 3) + 1;
  const ids = phaseData.days[dayName] || [];
  const items = ids.map((id) => {
    const ex = EXERCISES[id];
    const vol = volume(ex.category, phase, weekInPhase);
    return {
      ...ex,
      sets: vol.sets,
      reps: vol.reps,
      uid: `${id}__${dayName}`,
    };
  });
  return {
    phase,
    phaseName: phaseData.name,
    phaseFocus: phaseData.focus,
    intention: phaseData.intention,
    intentionBody: phaseData.intentionBody,
    weekInPhase,
    items,
  };
}

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ytThumbnail(url) {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    return v
      ? `https://img.youtube.com/vi/${v}/hqdefault.jpg`
      : null;
  } catch {
    return null;
  }
}
