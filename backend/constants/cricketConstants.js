export const BATTING_STYLES = [
  "Right-hand Bat",
  "Left-hand Bat"
];

export const BOWLING_STYLES = [
  "Right-arm Fast",
  "Right-arm Medium",
  "Right-arm Offspin",
  "Right-arm Legspin",
  "Left-arm Fast",
  "Left-arm Medium",
  "Left-arm Orthodox",
  "Left-arm Chinaman"
];

export const SHOT_TYPES = [
  "Front Foot Defense",
  "Cover Drive",
  "Straight Drive",
  "On Drive",
  "Square Drive",
  "Lofted Drive",
  "Back Foot Defense",
  "Cut Shot",
  "Late Cut",
  "Pull Shot",
  "Hook Shot",
  "Sweep",
  "Reverse Sweep",
  "Paddle Sweep",
  "Step Out Lofted Shot",
  "Uppercut",
  "Switch Hit",
  "Helicopter Shot",
  "Ramp Shot",
  "Scoop Shot",
  "Behind Stumps Flick"
];

export const SHOT_DIRECTIONS = [
  "Leg Side",
  "Straight",
  "Off Side",
  "Behind Stumps"
];

export const FIELDING_STYLES = [
  "Direct Throw",
  "Underarm Throw",
  "High Catch",
  "Low Catch",
  "Dive Stop",
  "Slide Stop",
  "Relay Throw",
  "Boundary Save"
];

export const WICKET_TYPES = [
  "Bowled",
  "Caught",
  "Run Out",
  "LBW",
  "Stumped",
  "Hit Wicket"
];

export const BALL_TYPES = [
  "Good Length",
  "Full Length",
  "Yorker",
  "Bouncer",
  "Short Pitch",
  "Inswing",
  "Outswing",
  "Slower Ball",
  "Off Cutter",
  "Leg Cutter"
];

export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
