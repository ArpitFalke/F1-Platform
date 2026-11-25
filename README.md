# 🏎️ F1 STREAM — Live Formula 1 Streaming, Highlights Hub & Race Center

A high-octane Formula 1 live streaming, telemetry, race highlights, and real-time friend watch-party platform for the **2026 Formula 1 Season**.

**Created & Engineered by:** [**ArpitFalke**](https://github.com/ArpitFalke) • **Repository:** [F1-Platform](https://github.com/ArpitFalke/F1-Platform)

---

## ⚡ Live Stream Integration
The platform integrates a high-definition Formula 1 live broadcast embed:
```html
<iframe src="https://westreamf1.st/westreamf1.php" loading="lazy" name="frame" scrolling="no" frameborder="no" allow="fullscreen" align="center" height="450px" width="100%"></iframe>
```
- **Theater Mode**: Expand video to cinematic 100% viewport width with a single click.
- **Picture-in-Picture (PiP)**: Pop out the stream into an independent floating desktop window.
- **Stream Reloader**: One-click buffer flush and reconnect without refreshing the page.

---

## 🌟 Key Features

### 1. 🎬 Interactive Race Highlights Hub (All 21 Completed Races)
- Dedicated Highlights Hub covering completed rounds from Round 1 (Australia) through Round 21 (Las Vegas).
- **Interactive Lap-by-Lap Recap Player**: Click *"Play Interactive Lap Recap"* inside any race modal to step through key overtakes, strategy calls, and lap timestamps with an animated progress bar.
- **Race Story, Podium & Fastest Laps**: Full podium breakdown, race summary, winning time, and fastest lap telemetry.
- **Instant Filtering & Search**: Filter by All Races (21), Latest Rounds (18–21), Classic Thrillers, Street Circuits, or search by GP/driver/team.

### 2. 🏆 2026 Drivers' & Constructors' Championship Standings
- **Drivers' Standings (25 Drivers)**:
  - **P1: Kimi Antonelli** (Mercedes) — 402 pts (8 wins, 8 fastest laps, 15 podiums)
  - **P2: Max Verstappen** (Red Bull Racing) — 304 pts (4 wins)
  - **P3: Lewis Hamilton** (Ferrari) — 267 pts (1 win)
  - **P4: George Russell** (Mercedes) — 264 pts (3 wins)
  - **P5: Lando Norris** (McLaren) — 264 pts (3 wins)
- **Constructors' Standings (11 Teams)**:
  - Features **Mercedes** (666 pts), **Ferrari** (517 pts), **Red Bull Racing** (440 pts), **McLaren** (431 pts), **Racing Bulls**, **Alpine**, **Haas**, **Audi F1 Team** (works entry replacing Sauber), **Williams**, **Aston Martin**, and **Cadillac Formula 1 Team**.

### 3. 🗺️ Interactive 2026 Circuit Maps & Sector Telemetry
- 23 circuits across Street, Permanent, High-Speed Power, and High-Downforce categories.
- **Multi-Tab Track Modal**:
  - **Overview & Layout Map**: Circuit length, race distance, laps, turns, DRS zones, lap record, and track overview.
  - **Telemetry & Specs**: Full throttle percentage gauge, elevation profile, speed trap top speed, downforce setup, tyre degradation rating, gear shifts per lap, and braking severity.
  - **Sector Analysis & Overtaking**: Granular breakdowns of Sector 1, Sector 2, and Sector 3 with primary overtaking corners.

### 4. 💬 Real-Time Friend Chat (`chat.js`) — 100% Real Users, Zero Bots
- Pure user-to-user live chat designed for watching races together with friends (no automated chat bots).
- **Multi-Tab Real-Time Sync**: Uses browser `BroadcastChannel` and `localStorage` synchronization so friends signed into separate tabs update instantly in real time.
- **Rooms, Typing Indicators & Quick Reactions**: Switch between `#main-race`, `#watch-party`, and `#strategy-desk`, view live typing indicators, use `+Tab` to test side-by-side friend discussion, and send quick motorsport emojis.

### 5. 🔐 Upgraded Paddock Auth System (`auth.js`)
- Modern split-screen **Sign In / Create Account** modal with sliding tab switcher, live **2026 Grid Pass** card preview updating with your favorite team colors, password strength meter, inline password reset, and per-tab/persistent session storage.

### 6. 📜 Terms & Conditions, Privacy Policy & Modern 10s Cookie System (`legal.js`)
- **10-Second Modern Cookie Consent Popup**: Appears automatically 10 seconds after site load if consent hasn't been configured, complete with collapsible granular category toggles (Essential, Functional & Chat Rooms, Stream Diagnostics).
- **Real Browser Cookie & Storage Controls**: Persists consent via `document.cookie` (`f1stream_consent`) and `localStorage`, and lets users revisit **Terms & Conditions**, **Privacy Policy**, or **Cookie Settings** anytime via the Footer or User Menu.

---

## 📂 Modular Architecture

```
f1-stream/
├── index.html              # Application shell, sections, creator footer & scripts
├── style.css               # Modern dark motorsport UI, animations & modal styles
├── app.js                  # Core controller, navigation, animations & modals
├── auth.js                 # Split-screen Sign In / Sign Up & Paddock Pass preview
├── chat.js                 # Real-time friend chat (BroadcastChannel, zero bots)
├── legal.js                # Terms, Privacy Policy & 10-second Cookie Consent system
├── README.md               # Platform documentation
│
└── data/                   # Modular season data modules
    ├── circuits.js         # 23 circuit layouts, telemetry specs & sector breakdowns
    ├── drivers.js          # 25 drivers, standings points, stats & bios
    ├── teams.js            # 11 constructors (Audi replacing Sauber, Cadillac)
    ├── races.js            # 2026 race calendar, winners, times & fastest laps
    └── highlights.js       # Highlight recaps, podiums & key moments (Rounds 1–21)
```

---

## 🚀 How to Run

Open `index.html` directly in your browser, or launch a local HTTP server (recommended so `document.cookie` and `BroadcastChannel` operate smoothly across tabs on `localhost`):

```bash
cd "C:\Users\PC World\.gemini\antigravity\scratch\f1-stream"
python -m http.server 8080
```
Then open `http://localhost:8080`.

---

## ⌨️ Keyboard Shortcuts
- `1` — Home
- `2` — Live Stream
- `3` — Highlights Hub
- `4` — 2026 Schedule
- `5` — Circuits & Telemetry
- `6` — Championship Standings
- `7` — Drivers
- `8` — Teams
- `Escape` — Close any active modal, legal dialog, search overlay, or theater mode
