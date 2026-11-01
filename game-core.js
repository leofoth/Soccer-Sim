/* Football Career core: deterministic helpers are intentionally dependency-free. */
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const overall = (p) => Math.round((p.pace + p.passing + p.dribbling + p.shot + p.finishing + p.stamina) / 6);

export function developPlayer(player, training = "balanced") {
  const next = structuredClone(player);
  const keys = training === "pace" ? ["pace", "stamina"]
    : training === "technique" ? ["dribbling", "passing"]
    : training === "finishing" ? ["shot", "finishing"]
    : ["stamina", "passing"];
  keys.forEach((key) => { next[key] = clamp((next[key] || 40) + 1, 1, 99); });
  next.xp = (next.xp || 0) + 10;
  return next;
}

export function simulateMatch({ homeStrength, awayStrength, playerRating = 50, form = 0, tactics = 0, random = Math.random }) {
  const poisson = (lambda) => {
    const limit = Math.exp(-Math.max(0.05, lambda));
    let product = 1, k = 0;
    do { k++; product *= random(); } while (product > limit && k < 20);
    return k - 1;
  };
  const homeLambda = clamp(1.35 + (homeStrength - awayStrength) * 0.045 + tactics * 0.12, 0.2, 4.2);
  const awayLambda = clamp(1.15 + (awayStrength - homeStrength) * 0.04, 0.2, 4.0);
  const goalsFor = poisson(homeLambda * (1 + (playerRating - 50) * 0.003 + form * 0.002));
  const goalsAgainst = poisson(awayLambda);
  return { goalsFor, goalsAgainst, result: goalsFor > goalsAgainst ? "W" : goalsFor === goalsAgainst ? "D" : "L" };
}

export function updateTable(table, home, away, homeGoals, awayGoals) {
  const next = structuredClone(table);
  for (const id of [home, away]) {
    next[id] ||= { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
    next[id].played++;
  }
  next[home].gf += homeGoals; next[home].ga += awayGoals;
  next[away].gf += awayGoals; next[away].ga += homeGoals;
  if (homeGoals > awayGoals) { next[home].won++; next[home].points += 3; next[away].lost++; }
  else if (homeGoals < awayGoals) { next[away].won++; next[away].points += 3; next[home].lost++; }
  else { next[home].drawn++; next[away].drawn++; next[home].points++; next[away].points++; }
  return next;
}

export function saveCareer(storage, career, key = "football-career-save-v1") {
  storage.setItem(key, JSON.stringify(career));
}
export function loadCareer(storage, key = "football-career-save-v1") {
  try { const raw = storage.getItem(key); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}
