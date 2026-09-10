import { InvestigationCase, AOIDefinition, SensorConfig } from '../types/investigation';
import { SpillFeature, MetoceanConditions } from '../types/spill';
import { CandidateVessel } from '../types/vessel';
import { SARContact } from '../types/contact';
import { InvestigationReportData } from '../types/evidence';
import { MOCK_CASES } from '../data/mockCases';
import { MOCK_SPILL_IND_0261 } from '../data/mockSpill';
import { MOCK_METOCEAN_IND_0261 } from '../data/mockMetocean';
import { MOCK_VESSELS_IND_0261 } from '../data/mockVessels';
import { MOCK_CONTACTS_IND_0261 } from '../data/mockContacts';
import { INITIAL_PIPELINE_STAGES } from '../data/mockProcessing';

class MockInvestigationService {
  private cases: InvestigationCase[] = [...MOCK_CASES];
  private activeCaseId: string = 'IND-0261';

  public getCases(): InvestigationCase[] {
    return [...this.cases];
  }

  public getCaseById(id: string): InvestigationCase | undefined {
    return this.cases.find(c => c.id === id);
  }

  public getActiveCase(): InvestigationCase {
    const active = this.cases.find(c => c.id === this.activeCaseId);
    return active || this.cases[0];
  }

  public setActiveCaseId(id: string): void {
    this.activeCaseId = id;
  }

  public createInvestigation(params: {
    aoi: AOIDefinition;
    timeWindow: { start: string; end: string };
    sensor: SensorConfig;
    title?: string;
  }): InvestigationCase {
    const newCase: InvestigationCase = {
      id: 'IND-0261', // Use hero demonstration case ID as specified
      title: params.title || 'Arabian Sea Offshore Incident Analysis',
      region: params.aoi.region,
      status: 'Processing',
      priority: 'Critical',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      incidentDate: '2026-09-08',
      timeWindow: params.timeWindow,
      aoi: params.aoi,
      sensor: params.sensor,
      pipelineStages: INITIAL_PIPELINE_STAGES.map(s => ({ ...s, status: 'pending' })),
      currentStageIndex: 0,
      isProcessed: false,
      isVerified: false
    };

    // Update existing or add
    const existingIndex = this.cases.findIndex(c => c.id === newCase.id);
    if (existingIndex >= 0) {
      this.cases[existingIndex] = newCase;
    } else {
      this.cases.unshift(newCase);
    }
    this.activeCaseId = newCase.id;
    return newCase;
  }

  public updateCaseStatus(id: string, updates: Partial<InvestigationCase>): InvestigationCase | undefined {
    const target = this.cases.find(c => c.id === id);
    if (target) {
      Object.assign(target, updates);
      return target;
    }
    return undefined;
  }

  public getSpillData(_caseId: string): SpillFeature {
    return MOCK_SPILL_IND_0261;
  }

  public getMetoceanData(_caseId: string): MetoceanConditions {
    return MOCK_METOCEAN_IND_0261;
  }

  public getCandidateVessels(_caseId: string): CandidateVessel[] {
    return MOCK_VESSELS_IND_0261;
  }

  public getUnmatchedContacts(_caseId: string): SARContact[] {
    return MOCK_CONTACTS_IND_0261;
  }

  public generateReportData(caseId: string): InvestigationReportData {
    const caseInfo = this.getCaseById(caseId) || this.getActiveCase();
    const spill = this.getSpillData(caseId);
    const metocean = this.getMetoceanData(caseId);
    const rankedVessels = this.getCandidateVessels(caseId);
    const unmatchedContacts = this.getUnmatchedContacts(caseId);

    return {
      caseInfo,
      spill,
      metocean,
      rankedVessels,
      unmatchedContacts,
      generatedAt: new Date().toUTCString(),
      leadInvestigator: 'CDR R. K. Sharma (Investigative Analyst)',
      authorityAgency: 'Maritime Environmental Surveillance & Intelligence Authority (MESIA)',
      verdictClassification: 'Actionable Intelligence Lead',
      investigativeSummary: `Satellite-based SAR reconnaissance over AOI [${caseInfo.aoi.name}] revealed a contiguous low-backscatter anomaly measuring 18.7 km² with -6.2 dB surface damping contrast, consistent with heavy hydrocarbon discharge. Lagrangian metocean backtracking reconstructed an upstream release window between 08-SEP-2026 06:00 and 10:00 UTC centered at 18°19.2'N, 70°58.4'E (uncertainty ±6.4 km). AIS trajectory cross-correlation isolated 3 merchant vessels, with Vessel A (MT Ocean Glory) emerging as top candidate (Attribution Score: 89/100; closest approach 1.2 km at 07:45 UTC). In addition, an unmatched SAR radar contact (#SAR-017) exhibiting zero AIS broadcast was detected 9.8 km from the origin, representing a concurrent investigative lead requiring maritime patrol corroboration.`,
      evidentiaryChain: [
        {
          step: '1. SAR Satellite Detection',
          factor: 'Capillary wave suppression / radar backscatter contrast (-6.2 dB)',
          finding: '18.7 km² contiguous slick confirmed (91% model confidence)',
          confidenceLevel: 'High'
        },
        {
          step: '2. Environmental Backtracking',
          factor: 'ECMWF ERA5 wind (12.4 kts @ 240°) & INCOIS current (0.45 m/s @ 070°)',
          finding: 'Release window 08-SEP-2026 06:00–10:00 UTC; origin uncertainty ±6.4 km',
          confidenceLevel: 'High'
        },
        {
          step: '3. AIS Trajectory Correlation',
          factor: 'Spatial-temporal intersection with reconstructed release ellipse',
          finding: 'Vessel A passed within 1.2 km of centroid at 07:45 UTC with minor course alteration',
          confidenceLevel: 'High'
        },
        {
          step: '4. Multi-Factor Evidence Scoring',
          factor: 'Spatial (92), Temporal (88), Drift (94), Trajectory (79)',
          finding: 'Attribution score 89/100 establishes Vessel A as primary candidate lead',
          confidenceLevel: 'Moderate'
        },
        {
          step: '5. Dark Contact Verification',
          factor: 'CFAR metallic point-target detection without AIS broadcast',
          finding: 'SAR Contact #SAR-017 isolated 9.8 km from origin; requires active patrol query',
          confidenceLevel: 'Moderate'
        }
      ],
      statutoryLimitations: [
        'Attribution scores represent investigative correlation factors and do not constitute autonomous judicial proof of liability.',
        'Drift calculations are subject to ±6.4 km hydrodynamic dispersion uncertainty under moderate sea state.',
        'Absence of AIS broadcast on SAR Contact #SAR-017 does not verify intentional spoofing or non-compliance; atmospheric conditions, satellite receiver collision, or small craft exemption may apply.',
        'This intelligence package is certified for operational interdiction prioritization, port-state control boarding, and environmental forensic sampling.'
      ]
    };
  }
}

export const investigationService = new MockInvestigationService();
