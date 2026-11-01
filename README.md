# Soccer Sim — Football Career Manager

Ein deutscher, direkt im Browser spielbarer Fußball-Karrieremanager. Übernimm einen echten Club, plane Transfers, simuliere Spieltage und schreibe deine eigene Vereinsgeschichte.

## Direkt spielen
Öffne **[career-mode.html](./career-mode.html)** im Repository oder starte GitHub Pages (Settings → Pages → Deploy from a branch → `main` / `/(root)`). Nach Aktivierung ist das Spiel unter `https://leofoth.github.io/Soccer-Sim/career-mode.html` erreichbar.

## Features
- 50+ reale Clubs aus Premier League, Bundesliga, La Liga, Serie A und Ligue 1
- Saison für Saison: Spielplan, dynamische Ergebnisse, Tabelle, Meister und Saisonprämien
- Transfermarkt mit Spielerwerten, Kaderverwaltung, eingehenden Angeboten und Verhandlungen
- Zufällige Ereignisse: Sponsor-Deals, Kabinenstimmung, Talententwicklung, Betriebskosten und Fanreaktionen
- Spieler mit Alter, Position, Gesamtstärke, Potenzial, Marktwert und Vertragslaufzeit
- Newsfeed, Saisonarchiv, Budgets, Team-Moral und lokales Autosave
- Responsive Layout für Handy und Desktop, ohne Installation oder Build-Schritt

## Spielen
1. Öffne `career-mode.html` in einem Browser oder hoste das Repository über GitHub Pages.
2. Wähle einen Verein und gib deinen Managernamen ein.
3. Simuliere Spieltage über „Nächster Spieltag“.
4. Nutze Kader und Transfermarkt, um dein Team umzubauen.
5. Spielstände werden automatisch lokal in deinem Browser gespeichert.

## Technologie
Vanilla HTML, CSS und JavaScript. Keine Abhängigkeiten, kein Backend. Das Spiel nutzt Clubnamen als Text und einfache Emoji-Marker; es enthält keine offiziellen Vereinslogos oder Spielerbilder. Vereinsdaten sind ein spielerischer Startdatensatz, keine Live-Daten. Dieses Fanprojekt ist nicht mit Vereinen oder Ligen verbunden.

## Weitere Teile
- `index.html`: bestehender Karriere-Hub
- `match.html`: spielbarer Match-Prototyp
- `game-core.js`: wiederverwendbare Spielregeln
- `career-mode.html`: eigenständiger Saison- und Transfermanager
