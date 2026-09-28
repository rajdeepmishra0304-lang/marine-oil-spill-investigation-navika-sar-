import React from 'react';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { NewInvestigation } from './pages/NewInvestigation';
import { Processing } from './pages/Processing';
import { SpillDetection } from './pages/SpillDetection';
import { IncidentAnalysis } from './pages/IncidentAnalysis';
import { SpillForecastPage } from './pages/SpillForecastPage';
import { VesselAttribution } from './pages/VesselAttribution';
import { InvestigationReport } from './pages/InvestigationReport';


const MainRouter: React.FC = () => {
  const { activePage } = useInvestigation();

  switch (activePage) {
    case 'dashboard':
      return <Dashboard />;
    case 'new-investigation':
      return <NewInvestigation />;
    case 'processing':
      return <Processing />;
    case 'spill-detection':
      return <SpillDetection />;
    case 'incident-analysis':
      return <IncidentAnalysis />;
    case 'spill-forecast':
      return <SpillForecastPage />;
    case 'vessel-attribution':
      return <VesselAttribution />;

    case 'report':
      return <InvestigationReport />;
    default:
      return <Dashboard />;
  }
};

export function App() {
  return (
    <InvestigationProvider>
      <AppShell>
        <MainRouter />
      </AppShell>
    </InvestigationProvider>
  );
}

export default App;
