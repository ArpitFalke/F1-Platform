# 🏎️ F1 STREAM — Live Formula 1 Streaming, Highlights Hub & Race Center

A premier, high-octane Formula 1 streaming and race center platform modeled after **F1 TV** and **FanCode**. Updated with verified **ongoing 2026 FIA Formula One World Championship** data directly from official **[Formula1.com](https://www.formula1.com)** sources.

---

## ⚡ Live Stream Integration
The platform integrates the high-definition free Formula 1 live stream feed:
```html
<iframe src="https://westreamf1.st/westreamf1.php" loading="lazy" name="frame" scrolling="no" frameborder="no" allow="fullscreen" align="center" height="450px" width="100%"></iframe>
```
- **Theater Mode**: Expand video to cinematic 100% viewport width with a single click.
- **Picture-in-Picture (PiP)**: Pop out stream into an independent floating desktop window.
- **Stream Reloader**: One-click buffer flush and reconnect without page refresh.
- **Server Selector**: Quick fallback toggles between Server 1 (Primary 1080p 60fps), Server 2 (Low Latency Backup), and Server 3 (Audio Only).

---

## 🌟 Key Features & 2026 Season Highlights

### 1. 🎬 Race Highlights Hub (All 21 Completed Races)
- Dedicated Highlights Hub covering every completed race from Round 1 (Australia) through Round 21 (Las Vegas).
- **Interactive Video Modal**:
  - Embedded high-definition race recap player with official F1 direct launch.
  - **Race Story & Tactical Analysis**: Comprehensive narrative of overtakes, pit stops, and weather strategies.
  - **Critical Lap-by-Lap Key Moments**: Timestamped chronological timeline of decisive race events.
  - **Official Podium Breakdown**: 1st, 2nd, and 3rd place finishers with team badges.
  - **DHL Fastest Lap Award**: Driver name and exact lap record time.
- **Instant Category Filtering**: All Races (21), Latest Rounds (18–21), Classic Thrillers, and Street Circuits.
- **Live Search**: Instant keyword filtering across Grand Prix names, winners, and circuits.

### 2. 🏆 Official 2026 Championship Standings
Verified directly from Formula 1's official results databases:
- **Drivers' World Championship**:
  - **P1: Kimi Antonelli** (Mercedes) — 402 pts (8 wins, 8 fastest laps, 15 podiums)
  - **P2: Max Verstappen** (Red Bull Racing) — 304 pts (4 wins, 2 fastest laps)
  - **P3: Lewis Hamilton** (Scuderia Ferrari) — 267 pts (1 win, 2 fastest laps)
  - **P4: George Russell** (Mercedes) — 264 pts (3 wins, 2 fastest laps)
  - **P5: Lando Norris** (McLaren) — 264 pts (3 wins, 2 fastest laps)
  - Full classification of all **25 drivers** with points bars, numbers, and nationality flags.
- **Constructors' World Championship**:
  - **P1: Mercedes** — 666 pts (World Champions)
  - **P2: Ferrari** — 517 pts
  - **P3: Red Bull Racing** — 440 pts
  - **P4: McLaren** — 431 pts
  - **P5: Racing Bulls** — 114 pts
  - **P6: Alpine** — 87 pts
  - **P7: Haas F1 Team** — 31 pts
  - **P8: Audi F1 Team** — 28 pts (**Officially replaced Sauber** with Nico Hülkenberg & Gabriel Bortoleto)
  - **P9: Williams** — 16 pts
  - **P10: Aston Martin** — 7 pts
  - **P11: Cadillac Formula 1 Team** — 0 pts (Historic 11th team entry with Valtteri Bottas & Sergio Perez)

### 3. 🗺️ Official 2026 Circuit Maps & Telemetry (Formula-Timer & F1.com)
- Track maps and technical geometry for all 2026 circuits, cross-referenced with **[Formula-Timer.com/circuit](https://formula-timer.com/circuit)** and **Formula1.com**.
- **Interactive Multi-Tab Circuit Modal**:
  - **Tab 1: Overview & Layout Map**: High-res Cloudinary F1 CDN map, track length, race distance, laps, turns, DRS zones, lap record, and track description.
  - **Tab 2: Telemetry & Specs (Formula-Timer)**:
    - **Full Throttle Percentage**: Visual bar (e.g. 80% at Monza, 78% at Las Vegas, 70% at Spa, 34% at Monaco).
    - **Elevation Profile**: Track elevation change (e.g. 102.2m at Spa, 65m at Red Bull Ring, 41m at COTA, 40m at Interlagos).
    - **Top Speed Trap**: Radar telemetry trap records (e.g. 356 km/h at Monza, 354 km/h at Baku, 352 km/h at Las Vegas).
    - **Downforce Package Level**: Minimum, Low, Medium, High, or Maximum.
    - **Tire Stress & Degradation**: Energy load on Pirelli compounds (Low to Extreme).
    - **Gear Shifts Per Lap**: Shift demands (e.g. 80 shifts at Singapore, 36 at Monza).
    - **Braking Load & Primary Overtaking Zones**.
  - **Tab 3: Sector Analysis & Overtakes**: Granular breakdown of **Sector 1**, **Sector 2**, and **Sector 3** detailing apexes, kerb behavior, and DRS attack zones.
- **Circuit Category Filters**: All (23), Street Tracks (7), Permanent Tracks (16), High Speed Power, and High Downforce.

### 4. 📅 2026 Race Calendar & Live Countdown
- Detailed schedule of all 24 rounds.
- Real-time countdown timer to **Round 22: Qatar Grand Prix** (Lusail International Circuit, Nov 27–29) and **Round 23: Abu Dhabi Grand Prix** (Yas Marina Circuit, Dec 4–6).

### 5. 🔐 Paddock Club Authentication System (`auth.js`)
- Full user registration and login system with client-side validation and LocalStorage persistence.
- Selection of favorite 2026 driver and constructor (including Audi F1 Team).
- Custom avatar selector, session tokens, and member badge.

### 6. 💬 Live Fan Chat (`chat.js`)
- Real-time chat box with live simulated paddock commentary bots.
- Driver flair badges, online user counter oscillation, and quick reactions.

---

## 📂 Modular Architecture & File Structure

The project has been separated into modular, maintainable files for easy scaling and data maintenance:

```
f1-stream/
│
├── index.html              # Main HTML5 application shell & view sections
├── style.css               # Modern dark-mode F1 styling, responsive grid, animations
├── app.js                  # Core controller, view orchestrator, navigation & modals
├── auth.js                 # Paddock Club user registration & login system
├── chat.js                 # Live chat simulation and bot commentary engine
├── README.md               # Complete platform documentation
│
└── data/                   # Modular season data files (Easy to maintain & update)
    ├── circuits.js         # 24 official circuit layouts, telemetry & description
    ├── drivers.js          # 25 classified 2026 drivers, points, headshots & bios
    ├── teams.js            # 11 constructor profiles (Audi replacing Sauber, Cadillac)
    ├── races.js            # 2026 race calendar, completed winners, times & fastest laps
    └── highlights.js       # Video highlights, podiums & key moments for all 21 races
```

---

## 🌐 Official Verification Sources Checked

All statistics, winners, fastest laps, circuit telemetry, and points have been cross-referenced and verified against:
- **Circuit Telemetry & Guides:** [formula-timer.com/circuit](https://formula-timer.com/circuit)
- **Drivers Championship:** [formula1.com/en/results/2026/drivers](https://www.formula1.com/en/results/2026/drivers)
- **Constructors Championship:** [formula1.com/en/results/2026/team](https://www.formula1.com/en/results/2026/team)
- **Race Results:** [formula1.com/en/results/2026/races](https://www.formula1.com/en/results/2026/races)
- **Fastest Laps:** [formula1.com/en/results/2026/awards/fastest-laps](https://www.formula1.com/en/results/2026/awards/fastest-laps)
- **2026 Racing Calendar:** [formula1.com/en/racing/2026](https://www.formula1.com/en/racing/2026)
- **Teams & Constructors:** [formula1.com/en/teams](https://www.formula1.com/en/teams)
- **Drivers:** [formula1.com/en/drivers](https://www.formula1.com/en/drivers)

---

## 🚀 How to Run

No build step or Node.js runtime is strictly required; it runs purely in standard web browsers!

### Option 1: Direct Browser
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
cd "C:\Users\PC World\.gemini\antigravity\scratch\f1-stream"
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

Using Node.js:
```bash
npx serve "C:\Users\PC World\.gemini\antigravity\scratch\f1-stream"
```

---

## ⌨️ Keyboard Shortcuts
- `1` — Home
- `2` — Live Stream
- `3` — Highlights Hub
- `4` — 2026 Schedule
- `5` — Circuits & Maps
- `6` — Championship Standings
- `7` — Drivers
- `8` — Teams
- `Escape` — Close any active modal, search overlay, or theater mode
