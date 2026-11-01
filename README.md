# Soccer-Sim — Football Career

A German-language, mobile-first football career sandbox. The existing career manager is a single-file installable web app; this iteration adds a separate playable landscape match prototype and a small reusable game-core module.

## Technology decision

- **Godot:** excellent native 2D/touch support, but migrating the existing browser career simulator would mean rebuilding its established systems.
- **Unity:** powerful mobile tooling, but heavier than needed for this 2D prototype.
- **Chosen: HTML Canvas + vanilla JavaScript ES modules (PWA-ready).** It reuses the repository's current web architecture, starts without a build step, and can later be packaged for Android/iOS with Capacitor. Canvas gameplay is deliberately lightweight; the career hub remains browser-based.

## Run locally

1. Install Node.js 20 or newer.
2. Clone the repository: `git clone https://github.com/leofoth/Soccer-Sim.git`
3. From the repository root run `node --test tests/game-core.test.mjs` to run core tests.
4. Serve the folder over HTTP (ES modules require a server), e.g. `npx serve .`.
5. Open `http://localhost:3000` for the career manager or `http://localhost:3000/match.html` for the landscape match prototype. Rotate the phone to landscape.

## Current playable slice

- Existing `index.html`: player creation, career progression, season simulation, league/club world, transfer negotiations, training, history, and local save slots.
- New `match.html`: real-time canvas match with touch movement, pass, shot, timer, score, opponent movement and final whistle.
- New `game-core.js`: isolated player training, match simulation, table calculations and save/load helpers.
- New `tests/game-core.test.mjs`: automated smoke tests for the core helpers.

## Known limitations

- The live match is currently a **standalone prototype**; its match record is saved under `football-career-save-v1` and is not yet merged into the legacy career profile/season calendar.
- The canvas match uses simple arcade physics and a single opponent, not a full 11-v-11 simulation.
- Existing career code remains a large inline script in `index.html`; gradual extraction into modules is recommended before adding more systems.
- Browser storage is local to the browser/device. Export/import and cloud sync are not implemented.
- The project has not yet been packaged or device-tested as an Android/iOS application.

## Project layout

```
index.html             Existing career hub and season simulation
match.html             Touch-friendly landscape match prototype
game-core.js           Reusable pure game rules and save helpers
tests/game-core.test.mjs  Node.js test suite
README.md              Setup, scope and development notes
```
