# NAVIKA-SAR: Satellite Marine Oil-Spill Investigation & Vessel Attribution System
### Prototype for Smart India Hackathon (SIH 2026)

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)

> **NAVIKA-SAR** is an intelligent satellite-based decision-support and forensic investigation platform intended for authorized maritime, environmental, and security authorities (such as the Indian Coast Guard, INCOIS, and port-state control officers).
>
> The goal is **not simply to detect oil spills**, but to construct an explainable, forensically sound **evidence chain** linking satellite SAR observations to probable release windows, AIS vessel trajectories, multi-factor attribution scores, and dark contact screening.

---

## 🧭 The End-to-End Investigation Workflow

```text
SATELLITE OBSERVATION (Sentinel-1 / RISAT)
        ↓
SAR PREPROCESSING & L1 CALIBRATION
        ↓
SUSPECTED SPILL SEGMENTATION (U-Net, 18.7 km², -6.2 dB damping)
        ↓
SPILL VERIFICATION & ENVIRONMENTAL SCREENING
        ↓
METOCEAN LAGRANGIAN BACKTRACKING (ECMWF Wind + INCOIS Currents)
        ↓
PROBABLE ORIGIN UNCERTAINTY ELLIPSE (±6.4 km, 06:00–10:00 UTC)
        ↓
AIS TRAJECTORY RECONSTRUCTION & SPATIAL-TEMPORAL CORRELATION
        ↓
MULTI-FACTOR VESSEL ATTRIBUTION (Top Candidate Score: 89/100)
        ↓
DARK CONTACT DETECTION (CFAR Radar Target #SAR-017, Zero AIS)
        ↓
FORENSIC EVIDENCE DOSSIER & REPORT EXPORT
```

---

## 🚀 How to Run on Any Computer

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### 1. Clone or Copy the Repository
```bash
git clone https://github.com/<your-username>/marine-oil-spill-investigation.git
cd marine-oil-spill-investigation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 🌐 How to Deploy Online (Free 1-Click Hosting)

You can host this live on the internet so evaluators, teammates, and hackathon judges can open it directly on their phones or laptops without installing anything:

### Deploying to Vercel (Recommended)
1. Push this project to your GitHub account.
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and select your `marine-oil-spill-investigation` repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. Within 60 seconds, you will receive a public URL (e.g. `https://navika-sar.vercel.app`)!

---

## 🛠️ Architecture & Project Structure

```text
src/
├── components/
│   ├── layout/            # AppShell, TopBar, Sidebar navigation
│   ├── maps/              # MaritimeMap (Leaflet), SARViewer (Canvas dual-pol simulation)
│   ├── investigation/     # WorkflowBreadcrumb stepper
│   ├── evidence/          # AttributionScoreCard, UnmatchedContactCard (#SAR-017)
│   ├── tables/            # VesselRankingTable, TelemetryTable
│   └── report/            # DossierView (formal printable investigation summary)
├── pages/
│   ├── Dashboard.tsx          # Command center with active cases & telemetry feed
│   ├── NewInvestigation.tsx   # AOI bounding box, temporal window & sensor selector
│   ├── Processing.tsx         # 9-stage pipeline tracker with live diagnostic terminal
│   ├── SpillDetection.tsx     # Hero SAR screen (Original / Mask / Overlay modes)
│   ├── IncidentAnalysis.tsx   # Metocean backtrack & origin uncertainty ellipse
│   ├── VesselAttribution.tsx  # AIS tracks, candidate matrix & CFAR dark contacts
│   └── InvestigationReport.tsx# Official forensic report with PDF & JSON export
├── data/                      # Dedicated mock data layer (spill, metocean, vessels, contacts)
├── services/                  # mockInvestigationService.ts (pluggable API provider)
├── types/                     # Clean TypeScript definitions for all analytical entities
└── context/                   # InvestigationContext.tsx (state management)
```

---

## ⚖️ Legal & Investigative Principles
- **Decision-Support, Not Autonomous Conviction**: The system computes multi-factor evidentiary scores (e.g., *Attribution Score: 89/100*), identifies closest approach points, and isolates investigation leads. It avoids deterministic accusatory labels.
- **Physical Uncertainty**: Release locations are modeled as hydrodynamic uncertainty ellipses ($\pm 6.4\text{ km}$) rather than false-precision points.
- **Dark Contacts as Leads**: Contact `#SAR-017` (CFAR radar hard target with zero AIS) is categorized as an active investigative lead requiring surface corroboration, accounting for transmission gaps, antenna dead zones, or non-cooperative craft.

---

*Developed for Smart India Hackathon (SIH 2026).*
