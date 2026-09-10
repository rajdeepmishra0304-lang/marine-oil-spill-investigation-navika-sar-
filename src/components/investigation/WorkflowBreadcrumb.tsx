import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useInvestigation, NavigationPage } from '../../context/InvestigationContext';

interface WorkflowStep {
  id: NavigationPage;
  label: string;
  sublabel: string;
}

export const WorkflowBreadcrumb: React.FC = () => {
  const { activePage, setActivePage, activeCase } = useInvestigation();

  const steps: WorkflowStep[] = [
    { id: 'processing', label: '1. Ingestion & Pipeline', sublabel: 'L1 GRD Calibration' },
    { id: 'spill-detection', label: '2. Spill Detection', sublabel: '18.7 km² Segmentation' },
    { id: 'incident-analysis', label: '3. Drift & Origin', sublabel: 'Lagrangian Backtrack' },
    { id: 'vessel-attribution', label: '4. Vessel Attribution', sublabel: 'AIS Matrix & CFAR' },
    { id: 'report', label: '5. Investigation Dossier', sublabel: 'Actionable Intelligence' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === activePage);

  return (
    <div className="stepper-container" style={{ marginBottom: '20px' }}>
      {steps.map((step, index) => {
        const isActive = activePage === step.id;
        const isCompleted = index < currentStepIndex || (activeCase.isProcessed && index === 0);

        return (
          <React.Fragment key={step.id}>
            <div
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => setActivePage(step.id)}
            >
              <div className="step-number">
                {isCompleted && !isActive ? <Check size={14} /> : index + 1}
              </div>
              <div>
                <div className="step-label">{step.label}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{step.sublabel}</div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="step-separator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={14} color="var(--border-medium)" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
