# Humanity's Last Survival Archive 🌍

> **A Cinematic Survival Archive Landing Page set in the year 2187.**

Humanity's Last Survival Archive is an immersive futuristic landing page built around a fictional end-of-Earth scenario. It presents the last remaining human settlements, planetary resources, population records, archived memories, and possible evacuation colonies through a cinematic terminal-style interface.

## Preview

The experience is designed to feel like a recovered emergency archive from the final days of Earth.

Core sections include:

- 🌎 **The Last Archive** — cinematic introduction to the 2187 scenario
- ⏳ **Evacuation Window** — live countdown interface
- 🏙️ **Surviving Cities** — remaining settlements and environmental telemetry
- ⚡ **Planetary Resources** — oxygen, water, energy, genetics, and atmosphere data
- 👥 **Population Tracker** — remaining population and survival statistics
- 🧠 **Archived Memories** — preserved memories from the old world
- 🚀 **Choose a Colony** — fictional destinations for humanity's evacuation

---

## Features

### Cinematic Hero

The opening screen establishes the world and visual language of the archive with:

- A dying Earth visual
- Futuristic typography
- Animated overlays
- Archive status indicators
- Evacuation countdown
- Smooth navigation into the archive

### Evacuation Countdown

The evacuation section displays a continuously updating countdown using:

- Days
- Hours
- Minutes
- Seconds
- Centiseconds

The interface is intentionally styled like a high-priority mission terminal.

### Surviving Cities

Visitors can explore the remaining fictional human settlements and inspect information such as:

- Population
- Atmospheric conditions
- Structural integrity
- Environmental status
- Settlement classification
- Operational condition

City details are displayed through interactive modal interfaces.

### Planetary Resource Monitoring

The resource dashboard presents fictional survival telemetry for essential planetary systems.

Tracked resources include:

- Atmospheric oxygen
- Fresh water
- Geothermal energy
- Genetic reserves
- Atmospheric shielding

### Population Tracker

The population section communicates the scale of humanity's remaining population through visual statistics and manifest-style information.

### Archived Memories

The archive preserves personal memories of the world before evacuation.

Users can:

- Browse memories
- Expand memory entries
- Like memories
- Play synthesized atmospheric audio
- Stop audio playback
- Submit a new memory

Submitted memories are currently stored in React state and are not persisted to a backend.

### Colony Registry

The colony section provides several fictional destinations.

Each colony can be inspected through an interactive boarding-pass interface containing destination and survival information.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Development and production tooling |
| Tailwind CSS 4 | Styling |
| Motion | Animations and transitions |
| Lucide React | Interface icons |
| Web Audio API | Synthesized interface/audio effects |
| Google GenAI SDK | AI integration support |

---

## Requirements

Before running the project, make sure you have:

- Node.js
- npm

You can verify your installation with:

```bash
node --version
npm --version
```

---

## Installation

Clone or download the project and install its dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

The application is configured to run on:

```text
http://localhost:3000
```

---

## Production

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run TypeScript checking:

```bash
npm run lint
```

Clean generated files:

```bash
npm run clean
```

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
│
├── assets/
│   └── images/
│
├── components/
│   ├── hero/
│   │   ├── DyingEarthCanvas.tsx
│   │   ├── EvacuationCountdown.tsx
│   │   └── HeroSection.tsx
│   │
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── modals/
│   │   ├── BoardingPassModal.tsx
│   │   ├── CityDetailModal.tsx
│   │   └── SubmitMemoryModal.tsx
│   │
│   └── sections/
│       ├── ArchivedMemoriesSection.tsx
│       ├── ChooseColonySection.tsx
│       ├── PopulationTrackerSection.tsx
│       ├── ResourcesSection.tsx
│       └── SurvivingCitiesSection.tsx
│
├── data/
│   └── archiveData.ts
│
├── types/
│   └── archive.ts
│
└── utils/
    └── audioSynth.ts
```
## Design Direction

The visual design intentionally combines:

- Sci-fi interfaces
- Emergency control rooms
- Archival terminals
- Holographic dashboards
- Space-mission interfaces
- Post-apocalyptic storytelling

### Visual Language

The UI relies heavily on:

- Dark backgrounds
- Cyan interface accents
- Monospaced telemetry
- Thin borders
- Scanlines
- Grid patterns
- Glow effects
- Data panels
- Modal terminals
- Animated status indicators

---

## Architecture

The project is intentionally component-driven.

Large sections are separated into reusable components rather than placing the entire experience inside a single page component.

The general hierarchy is:

```text
App
├── Navigation
├── Hero
│   ├── Dying Earth
│   └── Evacuation Countdown
├── Surviving Cities
├── Resources
├── Population Tracker
├── Archived Memories
├── Colony Selection
└── Footer
```

Interactive overlays are handled separately through modal components:

```text
Modals
├── City Detail
├── Boarding Pass
└── Submit Memory
```

This structure makes it easier to replace the fictional content or connect the interface to a real backend later.

---

## Audio

The project uses browser-based audio synthesis instead of relying entirely on external audio assets.

The audio utility can create interface sounds and atmospheric effects dynamically.

This keeps the experience lightweight while reinforcing the futuristic terminal aesthetic.

Browser audio may require user interaction before playback depending on the browser's autoplay policy.

---

## Responsive Design

The interface is designed to adapt across:

- Desktop
- Tablet
- Mobile

Large telemetry layouts collapse into stacked content on smaller screens while preserving the archive's visual hierarchy.

---

## Accessibility

The interface includes accessibility-oriented features such as:

- Semantic HTML landmarks
- Skip-to-content navigation
- Keyboard-accessible controls
- Descriptive image alternatives
- Visible interaction states
- Button-based interactive elements
- Section labels and headings

---

## Data & Persistence

The current version is primarily a frontend experience.

Most archive information comes from static TypeScript data:

```text
src/data/archiveData.ts
```

User-created memories are held in client-side React state.

### Current behavior

```text
User submits memory
        ↓
React state
        ↓
Memory appears in archive
        ↓
Page/session state only
```

There is currently no database persistence.

---

## Future Improvements

Possible future development could include:

- Backend persistence for submitted memories
- User accounts
- Real-time evacuation telemetry
- Database-backed colony information
- AI-generated memory restoration
- Cloud audio storage
- Image uploads
- Search across the memory archive
- Authentication for archive contributors
- Admin moderation tools
- Analytics
- Automated tests
- Production deployment configuration

---

## Development Notes

When adding new archive content, prefer modifying:

```text
src/data/archiveData.ts
```

rather than hard-coding content directly into presentation components.

When adding a new interactive feature:

1. Create or update the appropriate type.
2. Add data to the data layer.
3. Create a dedicated component if the UI is substantial.
4. Keep modal behavior inside the relevant modal component.
5. Avoid coupling unrelated sections together.

This keeps the project easier to maintain as the fictional archive grows.

---

## Final Transmission

**ARCHIVE STATUS:** ACTIVE  
**YEAR:** 2187  
**PLANET:** EARTH  
**HUMANITY:** STILL HERE

> *Preserve what remains.*
