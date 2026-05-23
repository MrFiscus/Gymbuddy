# GymBuddy

GymBuddy is a responsive React gym tracking app built as a Progressive Web App with offline-first local storage, live form tracking, an interactive muscle map, and a Capacitor-ready structure for future iOS and Android deployment.

## Highlights

- Workout logger with exercises, sets, reps, weight, supersets, circuits, PR alerts, and queued exercises
- Custom and built-in workout plans
- Progress dashboard with Recharts visualizations for volume, PRs, and frequency
- Exercise library with an interactive front/back muscle map
- Dedicated exercise detail pages with inline movement previews and step-by-step guidance
- Live form tracker using `@mediapipe/pose` in the browser
- Rest timer, 1RM calculator, plate calculator, warm-up generator, body metrics tracking, and export tools
- Dark/light mode and a mobile-first UI that expands cleanly to desktop
- PWA installability, service worker support, and Capacitor configuration

## Tech Stack

- React 19
- Vite
- React Router
- Recharts
- Motion
- `@mediapipe/pose`
- `lottie-web`
- `vite-plugin-pwa`
- Capacitor
- `localStorage` for persistence

## Current Experience

### Dashboard
- Training overview
- Progress charts
- PR and recovery-oriented summaries

### Workouts
- Log sets, reps, and weight
- Queue exercises from the library directly into the workout flow
- Track rest timing and PRs

### Plans
- Browse built-in plans
- Create custom plans

### Library
- Interactive flippable muscle map
- Muscle-specific exercise lists
- Dedicated exercise pages at `/library/:exerciseId`
- Inline VectorFit-powered motion preview when a matching animation is available
- Muscle & Strength guide link for deeper reference

### Live Form Tracker
- Webcam pose detection in-browser
- Real-time landmark tracking
- Angle-based form scoring
- Rep counting and live cues

### Tools
- 1RM calculator
- Plate calculator
- Warm-up set generator
- Body weight and measurements tracking
- Export support

## PWA + Mobile App Readiness

The app is configured as a PWA through [`vite-plugin-pwa`](./vite.config.js) with:

- installable manifest
- generated service worker
- offline caching for built assets
- MediaPipe CDN runtime caching

Capacitor is configured in [`capacitor.config.ts`](./capacitor.config.ts) with:

- `appId: com.gymbuddy.app`
- `webDir: dist`
- Android HTTPS scheme support

Useful commands:

```bash
npm run cap:sync
npm run cap:open:android
npm run cap:open:ios
```

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/   shared UI, trackers, animation player, shell
  context/      global app state and localStorage persistence
  data/         seed data, plans, muscle map, exercise library
  hooks/        reusable hooks
  pages/        route-level screens
  utils/        calculators, storage helpers, VectorFit matcher
public/
  male-front-back-base.svg
  vectorfit-player.html
  muscle-map-attribution.txt
```

## Important Notes

### Persistence

GymBuddy stores app data in `localStorage`. There is no backend in the current version.

### Exercise motion previews

Exercise detail pages attempt to match each exercise against the public VectorFit preview library. When a match exists, GymBuddy loads the preview inside a local iframe player. If no good match exists, the page falls back gracefully.

### Pose tracking

Live form tracking depends on webcam permissions and browser support for MediaPipe and WebAssembly.

### Bundle size

The production bundle is still fairly large because of charting, PDF/export, MediaPipe, and animation-related dependencies. Route-level code splitting would be a good next optimization pass.

## Attribution

### Body illustration

The interactive muscle map uses a locally stored anatomy base illustration:

- Source: Wikimedia Commons, `Male front-back 3d-shaded human illustration.svg`
- Author: Goran tek-en
- License: CC BY-SA 4.0
- Attribution file: [`public/muscle-map-attribution.txt`](./public/muscle-map-attribution.txt)

### Exercise preview reference

The exercise motion preview workflow references the public VectorFit exercise animation library:

- https://vectorfitexercises.com/exercise-animations

GymBuddy does not bundle the full VectorFit animation library in this repository.

## Status

This project is functional as a local-first PWA prototype with a strong frontend feature set and a Capacitor-ready foundation. The next likely improvements are deeper exercise preview coverage, bundle splitting, and more polished offline behavior for remote preview dependencies.
