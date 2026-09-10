import React from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import { investigationService } from '../services/mockInvestigationService';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { DossierView } from '../components/report/DossierView';

export const InvestigationReport: React.FC = () => {
  const { activeCase } = useInvestigation();
  const reportData = investigationService.generateReportData(activeCase.id);

  return (
    <div className="page-wrapper" style={{ maxWidth: '1300px' }}>
      <div className="no-print">
        <WorkflowBreadcrumb />
      </div>

      <DossierView report={reportData} />
    </div>
  );
};
