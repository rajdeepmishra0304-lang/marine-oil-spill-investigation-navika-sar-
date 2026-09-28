# NAVIKA-SAR: Complete System Documentation & Operational Manual
### Satellite Marine Oil-Spill Investigation & Vessel Attribution System
*Prepared for Indian Coast Guard (ICG), INCOIS, and Port-State Environmental Enforcement Authorities*

---

## 📑 Table of Contents
1. [Executive Overview & Purpose](#1-executive-overview--purpose)
2. [End-to-End Investigation Workflow](#2-end-to-end-investigation-workflow)
3. [Global Layout & Persistent Navigation](#3-global-layout--persistent-navigation)
4. [Exhaustive Page-by-Page & Button-by-Button Directory](#4-exhaustive-page-by-page--button-by-button-directory)
   - [Page 1: Command Dashboard (`Dashboard.tsx`)](#page-1-command-dashboard)
   - [Page 2: New Investigation (`NewInvestigation.tsx`)](#page-2-new-investigation)
   - [Page 3: SAR Processing & Diagnostic Tracker (`Processing.tsx`)](#page-3-sar-processing--diagnostic-tracker)
   - [Page 4: Spill Detection & Backscatter Verification (`SpillDetection.tsx`)](#page-4-spill-detection--backscatter-verification)
   - [Page 5: Metocean Drift & Lagrangian Backtracking (`IncidentAnalysis.tsx`)](#page-5-metocean-drift--lagrangian-backtracking)
   - [Page 6: AIS Vessel Attribution & Dark Contact Analysis (`VesselAttribution.tsx`)](#page-6-ais-vessel-attribution--dark-contact-analysis)
   - [Page 7: Forensic Investigation Dossier (`InvestigationReport.tsx`)](#page-7-forensic-investigation-dossier)
5. [Scientific, Algorithmic & Forensic Principles](#5-scientific-algorithmic--forensic-principles)
6. [Cloud Deployment & Offline Operation Guide](#6-cloud-deployment--offline-operation-guide)

---

## 1. Executive Overview & Purpose

**NAVIKA-SAR** is an intelligent decision-support and forensic maritime investigation platform developed for coastal authorities (Indian Coast Guard, INCOIS, State Maritime Boards, and Port-State Control officers).

### The Operational Challenge
In standard maritime surveillance, satellites detect dark patches on water, but identifying the responsible vessel is difficult due to:
* **Wind & Current Displacement:** By the time a satellite overpass captures an image, ocean currents and surface winds have drifted the oil miles away from its release point.
* **Complex Multi-Vessel Traffic:** High-density sea lanes (like the Arabian Sea tanker corridor) have hundreds of transiting ships.
* **Non-Cooperative Craft ("Dark Targets"):** Vessels illegally discharging bilge or cargo sludge often switch off their Automated Identification System (AIS) transponders.

### NAVIKA-SAR's Forensic Solution
NAVIKA-SAR does not stop at simple detection. It constructs an **explainable, defensible evidentiary chain**:
1. **Radar Anomaly Extraction:** Detects capillary wave damping in Sentinel-1 or RISAT-1A SAR imagery.
2. **Hydrodynamic Backtracking:** Inverts surface wind leeway and ocean current vectors backwards in time to determine the exact **release window** and **origin uncertainty ellipse**.
3. **Multi-Factor AIS Correlation:** Evaluates historical ship trajectories against the origin window using weighted scoring (Spatial, Temporal, Drift, and Trajectory).
4. **CFAR Dark Target Screening:** Discovers radar targets with zero AIS broadcasts within the release corridor.
5. **Certified Legal Dossier:** Compiles an intelligence report with a cryptographic verification hash and downloadable JSON audit bundle.

---

## 2. End-to-End Investigation Workflow

```text
[Surveillance Command Dashboard]
              │
              ▼
[New Investigation Configuration] ──► (Select AOI, Date, Sensor & Mode)
              │
              ▼
[Stage 1: SAR Processing Pipeline] ──► (9 Automated L1 GRD & ML Stages)
              │
              ▼
[Stage 2: Spill Detection & Verification] ──► (Dual-Pol SAR Canvas Viewer & -6.2 dB Damping Profiling)
              │
              ▼
[Stage 3: Metocean Drift & Origin Backtrack] ──► (INCOIS ROMS + ECMWF Drift Inversion & ±6.4 km Ellipse)
              │
              ▼
[Stage 4: AIS Attribution & Dark Contacts] ──► (Multi-Factor Scoring, CPA Waypoints, #SAR-017 Detection)
              │
              ▼
[Stage 5: Forensic Intelligence Dossier] ──► (Printable Audit Report & JSON Evidentiary Bundle)
```

At any point in an active case, the **Workflow Breadcrumb Stepper** at the top of the interface enables instant navigation between any of these stages while tracking completed milestones with green checkmarks.

---

## 3. Global Layout & Persistent Navigation

### The Top Bar (`TopBar.tsx`)
* **Case Selector Dropdown (`Case: IND-0261`)**: Clicking this button reveals a dropdown menu containing all stored active and archived incident files:
  * `IND-0261`: Arabian Sea Offshore Corridor (Primary Active Case).
  * `IND-0258`: Paradip Port Approaches (Bay of Bengal).
  * `IND-0249`: Tuticorin Shipping Channel (Gulf of Mannar).  
  *Selecting any case updates the entire workspace, telemetry, active map coordinates, and report data.*
* **Geographic Centroid Badge**: Displays the geographical coordinates of the active AOI centroid (e.g., `18.52°N, 71.18°E`).
* **Sensor & Mode Telemetry**: Identifies the satellite payload and acquisition mode (e.g., `Sentinel-1A C-SAR (IW GRD)`).
* **Live UTC Clock**: Real-time ticking Greenwich Mean Time clock ensuring synchronization with satellite orbit downlinks.
* **Telemetry Online Beacon**: Pulsing green status indicator confirming active data links.

### The Left Navigation Sidebar (`Sidebar.tsx`)
* **Branding & Seal**: NAVIKA-SAR Maritime Forensic Platform crest.
* **Active Case Pill**: Highlights the current Case ID, Priority badge (`Critical`), Region, and title.
* **Navigation Links**:
  * **Command Dashboard**: High-level national maritime overview.
  * **New Investigation**: Setup wizard for new satellite acquisitions.
  * **1. SAR Processing**: Ingestion and analytical pipeline progress tracker.
  * **2. Spill Detection**: Interactive SAR backscatter viewer and segmentation mask.
  * **3. Drift & Origin**: Metocean reverse Lagrangian drift model.
  * **4. Vessel Attribution**: AIS trajectory correlation and dark contact screening.
  * **5. Investigation Dossier**: Official printable forensic report.
* **Authority Identity Badge**: Displays the operating forensic unit and authorized officer (e.g., `MESIA / INCOIS-ICG • CDR R. K. Sharma`).

---

## 4. Exhaustive Page-by-Page & Button-by-Button Directory

---

### Page 1: Command Dashboard
*File: `src/pages/Dashboard.tsx`*

The operational command center summarizing national maritime surveillance and incident response.

#### Interactive Elements & Displays:
1. **Header Section**:
   * **Title & Subtitle**: Operational surveillance, satellite SAR anomaly detection, metocean backtracking, and AIS forensic attribution.
   * **`+ New Investigation` Button**: Navigates immediately to the New Investigation configuration page.
2. **Operational Metrics Bar**:
   * **Active AOI Corridors (4 Sectors)**: Monitored maritime corridors off Western India and the Bay of Bengal.
   * **SAR Passes Today (12 Granules)**: Ingested Sentinel-1 and RISAT overpasses.
   * **Suspected Discharges (1 Active)**: Active spill alert flagged for verification (`IND-0261`).
   * **Unmatched Dark Leads (1 Contact)**: Uncorrelated radar target without AIS broadcast (`#SAR-017`).
3. **Priority Active Incident Banner (Case `IND-0261`)**:
   * Displays critical incident metadata: Region (Arabian Sea), Centroid (`18.52°N, 71.18°E`), Area (`18.7 km²`), Radar Damping (`-6.2 dB`), and Top Attribution Score (`89/100`).
   * **`Open Investigation Workflow` Button**: Loads `IND-0261` and directly enters the active analytical step.
4. **Maritime Investigation Registry Table**:
   * Lists all current and archived satellite cases with columns: Case ID, Region/AOI, Incident Date, Priority (`Critical`, `Elevated`, `Standard`), and Status (`Analysis Available`, `Report Generated`).
   * **`Inspect` Buttons**: On each row, clicking `Inspect` selects that case and switches views to its active investigation phase.
5. **Surveillance Telemetry Feed**:
   * Real-time chronological alerts (CFAR radar contact isolated, U-Net inference completed, ECMWF wind data assimilated, Shadnagar Ground Station downlink verified).

---

### Page 2: New Investigation
*File: `src/pages/NewInvestigation.tsx`*

The setup wizard to configure satellite surveillance over a designated Area of Interest (AOI).

#### Form Inputs & Controls (Left Column):
* **`Surveillance Area of Interest (AOI)` Dropdown**:
  * *Arabian Sea: Mumbai High - Saurashtra Corridor (Primary)* — $14,850\text{ km²}$
  * *Bay of Bengal: Paradip Port Approaches* — $6,200\text{ km²}$
  * *Gulf of Mannar: Tuticorin Shipping Lane* — $4,800\text{ km²}$  
  *Selecting any option immediately updates the interactive geographic graticule on the right.*
* **`Incident Date` Field**: Date picker to define when the suspected incident took place (e.g. `2026-09-08`).
* **`Time Window Start` & `Time Window End` Fields**: UTC timestamp inputs bounding the transit period (e.g., `04:00 UTC` to `16:00 UTC`).
* **`Satellite SAR Data Source` Dropdown**:
  * *Sentinel-1A C-SAR — Interferometric Wide (IW GRD L1)*: 10m spatial resolution, VV+VH dual-pol.
  * *ISRO EOS-04 / RISAT-1A — Fine Resolution Stripmap (FRS-1)*: 3m spatial resolution, hybrid circular polarimetry.
* **`Forensic Analysis Mode` Radio Options**:
  * *End-to-End Forensic Attribution (Recommended)*: Full SAR calibration, U-Net segmentation, Lagrangian drift backtracking, AIS correlation, and CFAR dark target screening.
  * *Rapid Anomaly Verification Only*: Accelerated slick segmentation mask without deep vessel track matching.
* **`START INVESTIGATION (CASE IND-0261)` Button**:
  * Instantiates the new case, queues the computational pipeline, and transfers the user to the Processing Pipeline tracker.

#### Geospatial & Sensor Previews (Right Column):
* **Geographic Extent Preview**: Canvas graticule visualizing the search sector boundary, centroid coordinates, and total surface area coverage.
* **Sensor Product Specifications Card**: Breakdown of satellite payload, acquisition pass, ground resolution, and polarization modes.

---

### Page 3: SAR Processing & Diagnostic Tracker
*File: `src/pages/Processing.tsx`*

Tracks the real-time execution of the 9 automated computational stages required to process raw Level-1 SAR granules into calibrated forensic intelligence.

#### The 9 Analytical Pipeline Stages:
1. **SAR Acquisition**: Queries Open Access Hub, verifies SHA-256 checksums, and mounts the 824 MB package into GPU memory.
2. **Radiometric Calibration**: Converts raw Digital Numbers (DN) to radar backscatter Sigma Nought ($\sigma_0\text{ dB}$).
3. **Speckle Filtering**: Runs a $7\times 7$ Refined Lee filter to suppress noise while preserving ship hulls and linear slick boundaries.
4. **Land Masking**: Applies GSHHG coastline boundaries with a 1.5 km buffer and SRTM DEM to reject false alarms on shore.
5. **Tiling & Pyramids**: Generates $512\times 512$ tiles with 12.5% overlap to eliminate edge-boundary cuts.
6. **Spill Detection**: Deep residual U-Net segments the low-backscatter slick polygon ($18.7\text{ km²}$, 91.4% confidence).
7. **Environmental Analysis**: Ingests ECMWF ERA5 winds (12.4 kts) and INCOIS currents (0.45 m/s) to run 8-hour backward Lagrangian drift modeling.
8. **AIS Correlation**: Filters 142 vessels active in the corridor down to 3 candidate merchant ships transiting the origin window.
9. **Evidence Generation**: Executes CFAR detection for non-AIS radar targets (isolating contact `#SAR-017`) and computes vessel attribution scores.

#### Control Buttons & Terminal:
* **Live Diagnostic Execution Stream**: A scrolling dark CLI terminal displaying real-time mathematical operations, satellite pass IDs, and signal-to-noise metrics.
* **`Fast-Forward Pipeline` Button**: Allows an operator or evaluator to skip simulated computation delays and immediately complete all 9 stages.
* **`View Spill Detection (Hero SAR Screen)` Button**: Appears upon pipeline completion; advances the operator to the interactive SAR viewer.

---

### Page 4: Spill Detection & Backscatter Verification
*File: `src/pages/SpillDetection.tsx`*

The hero satellite observation screen where operators verify the physical properties of the radar anomaly.

#### Interactive Hero SAR Viewer Controls (`SARViewer.tsx`):
* **Procedural Rayleigh Radar Engine**: Built on HTML5 Canvas to render authentic SAR sea clutter, ocean swells, and metallic ship echoes.
* **Mode Selector Buttons**:
  * **`Original SAR` Button**: Renders raw greyscale radar backscatter where oil appears as a natural dark anomaly due to capillary wave damping.
  * **`Detection Mask` Button**: Renders the AI-segmented amber-orange false-color mask.
  * **`Blended Overlay` Button**: Combines the raw SAR imagery with a semi-transparent fluorescent amber overlay and dashed vector contours.
* **`Opacity` Slider**: Adjusts mask transparency in Overlay mode from 20% to 100%.
* **`Zoom In (+)` & `Zoom Out (-)` Buttons**: Dynamically scales the canvas viewport from $0.8\times$ to $2.0\times$ zoom.
* **`Reset View` Button**: Restores $1.0\times$ zoom and resets image contrast.
* **Heads-Up Display (HUD) Overlays**: Displays acquisition timestamp (`2026-09-08 14:22:15 UTC`), centroid (`18.42°N, 71.08°E`), contrast damping (`-6.2 dB`), and model ID (`SAR-Segmentation-v1.4`).
* **`VERIFY INCIDENT` Button (Bottom Right)**:
  * When clicked, confirms the anomaly as a verified slick and changes to a green **`INCIDENT VERIFIED ✓ (PROCEED TO BACKTRACK)`** state.
  * Formally certifies the incident and routes the operator to the Drift & Origin Backtracking screen.
* **`Skip to Drift Analysis` Button (Top Right)**: Direct shortcut to advance without manual verification.

#### Analytical Scientific Cards:
* **Backscatter Damping Signature**: Explains that ambient ocean backscatter is $-14.8\text{ dB}$ while the slick core drops to $-21.0\text{ dB}$, confirming a net damping delta of **$-6.2\text{ dB}$**.
* **Geometric & Morphological Metrics**: Continuous area ($18.7\text{ km²}$), perimeter ($34.2\text{ km}$), elongation ratio ($4.82:1$ showing strong current/wind shear), and estimated volume ($240\text{–}380\text{ m³}$).
* **Wind-Speed Feasibility Baseline**: Explains that radar oil detection is only physically valid between $3.0\text{ m/s}$ and $12.0\text{ m/s}$. Observed wind was $6.38\text{ m/s}$ ($12.4\text{ kts}$), verifying that the dark spot is a genuine viscoelastic film and not a low-wind false lookalike.

---

### Page 5: Metocean Drift & Lagrangian Backtracking
*File: `src/pages/IncidentAnalysis.tsx`*

Models the trajectory of the oil slick backwards in time using hydrodynamics to identify when and where the discharge occurred.

#### Key Metrics Bar:
* **Probable Origin Centroid**: $18^\circ 19.2'\text{N}, 70^\circ 58.4'\text{E}$.
* **Origin Uncertainty Area**: $\pm 6.4\text{ km}$ (hydrodynamic dispersion variance).
* **Estimated Release Window**: `08 Sept 2026, 06:00 – 10:00 UTC` ($T-8.4\text{h}$ to $T-4.4\text{h}$ before satellite observation).
* **Total Drift Displacement**: $31.8\text{ km}$ along vector $058^\circ\text{ ENE}$.

#### Interactive Leaflet Map Features (`MaritimeMap.tsx`):
* **Yellow Dotted Polygon**: Represents the detected slick position at satellite overpass ($14:22\text{ UTC}$).
* **Cyan Dashed Line & Drift Nodes**: The 8-hour backward Lagrangian trajectory path.
* **Red Dashed Circle ($\pm 6.4\text{ km}$)**: The **Probable Origin Uncertainty Ellipse** defining the spatial-temporal release zone.
* **Layer Visibility Toggle Panel (Top Right of Map)**:
  * Checkboxes allow toggling on/off: *Suspected Spill Polygon*, *Probable Origin Ellipse*, *Lagrangian Drift Vector*, *AIS Candidate Trajectories*, and *Unmatched Contact #SAR-017*.

#### Hydrodynamic Analysis Cards:
* **Assimilation Metocean Data**: Shows wind fields from ECMWF ERA5 ($12.4\text{ kts @ } 240^\circ\text{ SW}$) and surface currents from INCOIS ROMS ($0.45\text{ m/s @ } 070^\circ\text{ ENE}$).
* **Net Slick Velocity Vector**: Explains how 3% wind leeway drift ($0.19\text{ m/s}$) plus 100% surface current ($0.45\text{ m/s}$) combined to produce a net drift speed of $1.18\text{ kts}$ at $067^\circ$.
* **Lagrangian Backtrack Dispersal Timeline**: Step-by-step table of hourly coordinate fixes from detection back to origin, showing expanding uncertainty radii.
* **`Correlate AIS Vessel Trajectories` Button**: Advances to the Vessel Attribution stage.

---

### Page 6: AIS Vessel Attribution & Dark Contact Analysis
*File: `src/pages/VesselAttribution.tsx`*

Correlates candidate ships against the reconstructed release ellipse and identifies radar contacts operating without active AIS broadcasts.

#### Key Components & Controls:
1. **Interactive Maritime Attribution Map**:
   * Renders color-coded AIS tracks for candidate vessels.
   * Highlights the **Closest Point of Approach (CPA)** for each ship with coordinate markers.
   * Renders the red crosshair target for unmatched radar contact `#SAR-017`.
   * Clicking any ship on the map selects it across the entire screen.
2. **Multi-Factor Attribution Score Card (`AttributionScoreCard.tsx`)**:
   * Evaluates the selected ship across 4 weighted evidence factors:
     * **Spatial Proximity (30% weight)**: Distance to origin centroid (Vessel A: $1.2\text{ km} \rightarrow 92/100$).
     * **Temporal Compatibility (25% weight)**: Transit time alignment with 06:00–10:00 UTC window (Vessel A: $07:45\text{ UTC} \rightarrow 88/100$).
     * **Drift Consistency (25% weight)**: Upstream alignment with Lagrangian drift vector ($94/100$).
     * **Trajectory Consistency (20% weight)**: Speed/heading anomalies (Vessel A exhibited a $14^\circ$ course adjustment and throttle dip $\rightarrow 79/100$).
   * Computes the final composite **Attribution Score (89 / 100)**.
3. **Unmatched SAR Radar Target Card (`UnmatchedContactCard.tsx`)**:
   * Highlights **Contact `#SAR-017`**:
     * CFAR hard radar return with high SNR ($+14.8\text{ dB}$) and an estimated length of $85\text{ m}$, located $9.8\text{ km}$ from the origin.
     * **AIS Match: NONE RECORDED** (A dark contact).
     * Lists objective, non-accusatory investigative explanations (e.g. antenna dead zone, AIS slot collision, non-cooperative craft, or stationary offshore support boat).
4. **Candidate Vessels Ranking Table (`VesselRankingTable.tsx`)**:
   * Ranks the correlated ships transiting the corridor:
     * **#1 Vessel A (MT Ocean Glory)**: VLCC Tanker (Panama) • Score: **89/100** • CPA: $1.2\text{ km}$ at 07:45 UTC.
     * **#2 Vessel B (MV Star Trader)**: Bulk Carrier (Liberia) • Score: **78/100** • CPA: $4.8\text{ km}$ at 06:15 UTC.
     * **#3 Vessel C (CMA CGM Horizon)**: Container Ship (France) • Score: **42/100** • CPA: $14.6\text{ km}$ at 09:10 UTC.
   * **`Inspect` Buttons**: Selects any candidate ship to inspect its telemetry and score breakdown.
5. **AIS Trajectory Telemetry Table (`TelemetryTable.tsx`)**:
   * Chronological GPS log for the selected vessel showing timestamps, latitude, longitude, speed in knots, heading, and distance to origin.
   * The row representing the **Closest Point of Approach** is highlighted with a gold **`★ CPA`** badge.
6. **`Generate Investigation Dossier` Button**:
   * Advances the operator to the final formal intelligence report.

---

### Page 7: Forensic Investigation Dossier
*File: `src/pages/InvestigationReport.tsx` & `src/components/report/DossierView.tsx`*

The formal, printable intelligence report prepared for law enforcement, naval authorities, and court submissions.

#### Top Control Bar:
* **`Print Dossier` Button**:
  * Triggers the native print dialogue (`window.print()`).
  * Utilizes dedicated `@media print` CSS: automatically hides all sidebars, navigation bars, and buttons, formatting the document as a clean white-paper forensic report.
* **`Export JSON Audit Bundle` Button**:
  * Downloads `INVESTIGATION_DOSSIER_IND-0261.json`.
  * Contains the complete machine-readable audit trail (AOI bounds, raw damping decibels, drift particle coordinates, vessel telemetry, and factor weights).

#### Report Document Sections:
1. **Official Authority Header**: Official seal of the Maritime Environmental Surveillance & Intelligence Authority (MESIA), Government of India, case reference, classification (`OFFICIAL FORENSIC INTELLIGENCE`), and generation timestamp.
2. **Executive Intelligence Summary**: Concise narrative briefing of the incident, satellite pass, drift backtracking, and primary investigative leads.
3. **Core Case Parameters Grid**: Summary of region, spill area ($18.7\text{ km²}$, 91% confidence), release window ($06:00\text{–}10:00\text{ UTC}$), and top suspect vessel ($89/100$).
4. **Section 1: Corroborated Evidentiary Chain**: Step-by-step table documenting Satellite Ingest $\rightarrow$ Radiometric Calibration $\rightarrow$ U-Net Segmentation $\rightarrow$ Metocean Inversion $\rightarrow$ AIS Correlation $\rightarrow$ CFAR Screening.
5. **Section 2: Correlated AIS Vessel Attribution Matrix**: Detailed table comparing spatial, temporal, drift, and track scores for all merchant candidates.
6. **Section 3: Unmatched SAR Radar Contacts**: Formal summary of Contact `#SAR-017` recommending surface patrol corroboration.
7. **Section 4: Evidentiary Scope & Statutory Limitations**: Mandatory legal disclaimers stating that the system provides decision-support intelligence rather than autonomous judicial conviction.
8. **Investigator Certification Stamp**: Formally signed off by the Lead Investigating Officer with a digital verification hash: `HASH: 8F2A-44C9-981D-E0261`.

---

## 5. Scientific, Algorithmic & Forensic Principles

### 1. Radar Capillary Wave Damping
Synthetic Aperture Radar (SAR) operates in the microwave spectrum (C-band $\sim 5.4\text{ GHz}$). Rough sea surfaces produce Bragg scattering, reflecting microwave energy back to the satellite (bright signal). 
* When oil coats the surface, the viscoelastic surfactant film dampens high-frequency capillary and short gravity waves.
* The sea surface becomes smooth, reflecting radar beams away like a mirror (specular reflection).
* NAVIKA-SAR measures this as a backscatter deficit: **$-6.2\text{ dB}$ damping contrast** relative to ambient ocean clutter.

### 2. Hydrodynamic Drift Inversion
Oil slicks on the ocean surface move under two coupled physical forces:
$$\vec{V}_{\text{slick}} = \vec{V}_{\text{current}} + \alpha \cdot \vec{V}_{\text{wind}}$$
* $\vec{V}_{\text{current}}$: 100% of the surface ocean current vector (from INCOIS Regional Ocean Modeling System).
* $\vec{V}_{\text{wind}}$: 3.0% to 3.5% of the 10-meter surface wind vector (from ECMWF ERA5 reanalysis).
* By integrating this equation backwards in time from the detection timestamp ($T$), the system reconstructs the particle trajectory back to its release origin ($T - \Delta t$).

### 3. Origin Uncertainty Ellipses vs Point Sources
In real oceans, turbulent horizontal diffusion and wind gustiness spread drifting oil:
$$r(t) = \sqrt{2 \cdot K_h \cdot t}$$
NAVIKA-SAR refuses to display a false-precision point source. Instead, it models the origin as a hydrodynamic uncertainty ellipse ($\pm 6.4\text{ km}$ radius), representing the physical boundaries of where the release could have originated.

### 4. Non-Accusatory Evidentiary Scoring
In maritime law, circumstantial evidence must be transparent and explainable. NAVIKA-SAR does not label vessels as "guilty" or "accused". It calculates an **Attribution Score (0–100)** broken into independent physical dimensions:
* **Spatial Proximity:** Distance from the origin centroid at closest approach.
* **Temporal Window:** Synchronization with the backtracked release window.
* **Drift Consistency:** Alignment with the upstream drift vector.
* **Trajectory Consistency:** Presence of evasive maneuvers, course alterations, or throttle dips.

### 5. CFAR Screening for "Dark Contacts"
Vessels conducting illicit discharges may intentionally deactivate AIS transponders. NAVIKA-SAR applies a **2D Cell-Averaging Constant False Alarm Rate (CA-CFAR)** filter directly to the radar imagery:
* Identifies localized high-reflectivity metallic point targets.
* Correlates target coordinates against live terrestrial/satellite AIS feeds.
* If a strong radar return has zero corresponding AIS signals within 25 km, it is flagged as an **Unmatched Contact Lead (`#SAR-017`)** for Coast Guard patrol interception.

---

## 6. Cloud Deployment & Offline Operation Guide

### How to Run Locally (Offline Mode)
1. **Prerequisites:** Install [Node.js](https://nodejs.org/) (version 18 or higher).
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Launch Local Server:**
   ```bash
   npm run dev
   ```
4. **Access:** Open your browser to `http://localhost:5173`.

### How to Deploy Online (Free 1-Click Hosting on Vercel)
To host the application live on the web for demonstrations or hackathon judging without needing Node.js on client machines:
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) using GitHub.
3. Click **"Add New Project"** and select the repository.
4. Set the project configuration:
   * **Framework Preset:** `Vite`
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
   * **Install Command:** `npm install`
5. Click **"Deploy"**. Within 60 seconds, a live public URL (e.g., `https://navika-sar.vercel.app`) is generated.
