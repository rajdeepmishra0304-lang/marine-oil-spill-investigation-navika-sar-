import React, { createContext, useContext, useState, useEffect } from 'react';
import { InvestigationCase, AOIDefinition, SensorConfig } from '../types/investigation';
import { investigationService } from '../services/mockInvestigationService';

export type NavigationPage = 
  | 'dashboard' 
  | 'new-investigation' 
  | 'processing' 
  | 'spill-detection' 
  | 'incident-analysis'
  | 'spill-forecast'
  | 'vessel-attribution' 
  | 'report';


interface InvestigationContextType {
  activeCase: InvestigationCase;
  allCases: InvestigationCase[];
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  selectCase: (caseId: string) => void;
  startNewInvestigation: (params: { aoi: AOIDefinition; timeWindow: { start: string; end: string }; sensor: SensorConfig }) => void;
  completeProcessing: () => void;
  verifySpill: () => void;
  refreshCases: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCases, setAllCases] = useState<InvestigationCase[]>(investigationService.getCases());
  const [activeCase, setActiveCase] = useState<InvestigationCase>(investigationService.getActiveCase());
  const [activePage, setActivePage] = useState<NavigationPage>('dashboard');

  const refreshCases = () => {
    const cases = investigationService.getCases();
    setAllCases(cases);
    setActiveCase(investigationService.getActiveCase());
  };

  const selectCase = (caseId: string) => {
    investigationService.setActiveCaseId(caseId);
    const c = investigationService.getCaseById(caseId);
    if (c) {
      setActiveCase({ ...c });
      if (c.status === 'Processing') {
        setActivePage('processing');
      } else if (c.status === 'Analysis Available' || c.isProcessed) {
        setActivePage('spill-detection');
      } else if (c.status === 'Report Generated') {
        setActivePage('report');
      } else {
        setActivePage('processing');
      }
    }
  };

  const startNewInvestigation = (params: {
    aoi: AOIDefinition;
    timeWindow: { start: string; end: string };
    sensor: SensorConfig;
  }) => {
    const created = investigationService.createInvestigation(params);
    refreshCases();
    setActiveCase({ ...created });
    setActivePage('processing');
  };

  const completeProcessing = () => {
    const updated = investigationService.updateCaseStatus(activeCase.id, {
      status: 'Analysis Available',
      isProcessed: true,
      currentStageIndex: activeCase.pipelineStages.length - 1,
      pipelineStages: activeCase.pipelineStages.map(s => ({ ...s, status: 'completed' }))
    });
    if (updated) {
      setActiveCase({ ...updated });
      refreshCases();
    }
    setActivePage('spill-detection');
  };

  const verifySpill = () => {
    const updated = investigationService.updateCaseStatus(activeCase.id, {
      isVerified: true
    });
    if (updated) {
      setActiveCase({ ...updated });
      refreshCases();
    }
    setActivePage('incident-analysis');
  };

  // Keep state updated
  useEffect(() => {
    const curr = investigationService.getActiveCase();
    if (curr) {
      setActiveCase({ ...curr });
    }
  }, []);

  return (
    <InvestigationContext.Provider
      value={{
        activeCase,
        allCases,
        activePage,
        setActivePage,
        selectCase,
        startNewInvestigation,
        completeProcessing,
        verifySpill,
        refreshCases
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = (): InvestigationContextType => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
