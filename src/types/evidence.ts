import { CandidateVessel } from './vessel';
import { SARContact } from './contact';
import { SpillFeature, MetoceanConditions } from './spill';
import { InvestigationCase } from './investigation';

export interface InvestigationReportData {
  caseInfo: InvestigationCase;
  spill: SpillFeature;
  metocean: MetoceanConditions;
  rankedVessels: CandidateVessel[];
  unmatchedContacts: SARContact[];
  generatedAt: string;
  leadInvestigator: string;
  authorityAgency: string;
  verdictClassification: 'Actionable Intelligence Lead' | 'Inconclusive' | 'Low Risk';
  investigativeSummary: string;
  evidentiaryChain: Array<{
    step: string;
    factor: string;
    finding: string;
    confidenceLevel: 'High' | 'Moderate' | 'Low';
  }>;
  statutoryLimitations: string[];
}
