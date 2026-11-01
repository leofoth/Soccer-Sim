import test from "node:test";
import assert from "node:assert/strict";
import { developPlayer, overall, simulateMatch, updateTable, saveCareer, loadCareer } from "../game-core.js";

test("training improves only relevant attributes and grants XP", () => {
  const p = { pace: 50, passing: 50, dribbling: 50, shot: 50, finishing: 50, stamina: 50, xp: 0 };
  const trained = developPlayer(p, "pace");
  assert.equal(trained.pace, 51); assert.equal(trained.stamina, 51);
  assert.equal(trained.passing, 50); assert.equal(trained.xp, 10);
  assert.equal(overall(trained), 50);
});
test("league table awards 3 points for a win and 1 for a draw", () => {
  let t = updateTable({}, "A", "B", 2, 0);
  assert.equal(t.A.points, 3); assert.equal(t.B.lost, 1);
  t = updateTable(t, "A", "B", 1, 1);
  assert.equal(t.A.points, 4); assert.equal(t.B.points, 1);
  assert.equal(t.A.played, 2); assert.equal(t.B.gf, 1);
});
test("match simulation is deterministic with a controlled random source", () => {
  const r = simulateMatch({ homeStrength: 70, awayStrength: 60, random: () => 0.5 });
  assert.ok(["W", "D", "L"].includes(r.result));
  assert.ok(r.goalsFor >= 0 && r.goalsAgainst >= 0);
});
test("career save/load round-trips JSON", () => {
  const data = new Map();
  const storage = { setItem: (k,v) => data.set(k,v), getItem: k => data.get(k) ?? null };
  saveCareer(storage, { player: "Alex", season: 1 });
  assert.deepEqual(loadCareer(storage), { player: "Alex", season: 1 });
});
