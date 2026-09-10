import React, { useState, useEffect } from 'react';
import { 
  Satellite, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ArrowRight, 
  Play, 
  RotateCw, 
  ShieldCheck,
  FastForward
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { WorkflowBreadcrumb } from '../components/investigation/WorkflowBreadcrumb';
import { PipelineStage } from '../types/investigation';

export const Processing: React.FC = () => {
  const { activeCase, completeProcessing } = useInvestigation();
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [stages, setStages] = useState<PipelineStage[]>(activeCase.pipelineStages);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing NAVIKA-SAR operational processing pipeline...',
    `Target AOI: ${activeCase.aoi.name} [Pass: ${activeCase.sensor.orbit}]`,
    'Mounting high-performance GPU compute cluster for SAR inference...'
  ]);

  // Simulated Auto-Progress
  useEffect(() => {
    if (!isAutoRunning) return;
    if (currentStageIdx >= stages.length) {
      setIsAutoRunning(false);
      return;
    }

    const stage = stages[currentStageIdx];
    // Mark current stage as 'processing'
    setStages(prev => prev.map((s, i) => i === currentStageIdx ? { ...s, status: 'processing' } : s));

    // Append logs
    if (stage.logMessages && stage.logMessages.length > 0) {
      stage.logMessages.forEach((msg, mIdx) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev.slice(-30), `[${stage.name}] ${msg}`]);
        }, mIdx * 250);
      });
    }

    // Advance to next stage after simulated duration
    const timer = setTimeout(() => {
      setStages(prev => prev.map((s, i) => i === currentStageIdx ? { ...s, status: 'completed' } : s));
      setCurrentStageIdx(prev => prev + 1);
    }, stage.durationMs || 900);

    return () => clearTimeout(timer);
  }, [currentStageIdx, isAutoRunning, stages.length]);

  const isAllComplete = currentStageIdx >= stages.length;

  const handleSkipToComplete = () => {
    setIsAutoRunning(false);
    setStages(prev => prev.map(s => ({ ...s, status: 'completed' })));
    setCurrentStageIdx(stages.length);
    setTerminalLogs(prev => [
      ...prev,
      '[System] Pipeline accelerated by operator command.',
      '[Detection] Contiguous 18.7 km² slick segmented. High confidence (91%).',
      '[AIS] 3 Candidate merchant tracks correlated. CFAR Contact #SAR-017 flagged.'
    ]);
  };

  const handleProceedToDetection = () => {
    completeProcessing();
  };

  return (
    <div className="page-wrapper">
      <WorkflowBreadcrumb />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            SAR Ingestion & Analytical Pipeline Tracker
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Case {activeCase.id} • {activeCase.sensor.name} ({activeCase.sensor.mode})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {!isAllComplete && (
            <button
              className="btn btn-secondary"
              onClick={handleSkipToComplete}
              title="Fast-forward simulation to complete"
            >
              <FastForward size={14} />
              <span>Fast-Forward Pipeline</span>
            </button>
          )}

          {isAllComplete && (
            <button
              className="btn btn-primary btn-lg"
              onClick={handleProceedToDetection}
            >
              <span>View Spill Detection (Hero SAR Screen)</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Pipeline Stages Stepper + Real-time Diagnostic Terminal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Stages List Card */}
        <div className="card" style={{ padding: '24px' }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <div className="card-title">
              <Satellite size={16} color="var(--accent-cyan)" />
              <span>Processing Stages ({currentStageIdx} of {stages.length} Complete)</span>
            </div>
            <span className={`badge ${isAllComplete ? 'badge-emerald' : 'badge-amber'}`}>
              {isAllComplete ? 'PIPELINE COMPLETE' : 'PROCESSING IN PROGRESS'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stages.map((stage, idx) => {
              const isDone = stage.status === 'completed';
              const isCurrent = stage.status === 'processing';
              const isPending = stage.status === 'pending';

              let borderColor = 'var(--border-subtle)';
              let iconColor = 'var(--text-muted)';
              let bgColor = 'var(--bg-card-muted)';

              if (isDone) {
                borderColor = 'rgba(16, 185, 129, 0.4)';
                iconColor = '#10B981';
                bgColor = 'rgba(16, 185, 129, 0.05)';
              } else if (isCurrent) {
                borderColor = 'var(--accent-cyan)';
                iconColor = 'var(--accent-cyan)';
                bgColor = 'rgba(56, 189, 248, 0.08)';
              }

              return (
                <div
                  key={stage.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: iconColor }}>
                      {isDone ? (
                        <CheckCircle2 size={18} />
                      ) : isCurrent ? (
                        <RotateCw size={18} className="animate-spin" />
                      ) : (
                        <span className="mono" style={{ fontSize: '13px', fontWeight: 600 }}>0{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: isPending ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                        {stage.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {stage.shortDesc}
                      </div>
                    </div>
                  </div>

                  <div className="mono" style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, color: iconColor }}>
                    {stage.status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Callout */}
          {isAllComplete && (
            <div style={{
              marginTop: '20px',
              padding: '14px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontSize: '13px', fontWeight: 600 }}>
                <ShieldCheck size={18} />
                <span>All 9 Analytical Stages Finished Successfully. Ready for Inspection.</span>
              </div>
              <button
                className="btn btn-emerald btn-sm"
                onClick={handleProceedToDetection}
              >
                <span>Proceed to Detection</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Real-time Diagnostic Terminal Logs */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '620px' }}>
          <div className="card-header" style={{ padding: '12px 18px', margin: 0, backgroundColor: 'var(--bg-card-muted)' }}>
            <div className="card-title" style={{ fontSize: '13px' }}>
              <Terminal size={15} color="var(--accent-cyan)" />
              <span>Diagnostic Execution Stream</span>
            </div>
            <span className="badge badge-muted mono">Live Stream</span>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: '#070B12',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            lineHeight: '1.7',
            color: '#94A3B8',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {terminalLogs.map((log, i) => {
              let color = '#94A3B8';
              if (log.includes('successfully') || log.includes('Finished') || log.includes('verified')) {
                color = '#34D399';
              } else if (log.includes('segmented') || log.includes('anomaly') || log.includes('UNMATCHED')) {
                color = '#F59E0B';
              } else if (log.includes('Pass') || log.includes('Orbit') || log.includes('Target')) {
                color = 'var(--accent-cyan)';
              }

              return (
                <div key={i} style={{ color, marginBottom: '2px', wordBreak: 'break-all' }}>
                  <span style={{ color: '#475569', marginRight: '8px' }}>&gt;</span>
                  {log}
                </div>
              );
            })}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', paddingTop: '10px' }}>
              <span className="animate-pulse" style={{ width: 8, height: 14, backgroundColor: 'var(--accent-cyan)', display: 'inline-block' }} />
              <span>{isAllComplete ? 'PIPELINE IDLE • AWAITING OPERATOR INPUT' : 'SYSTEM EXECUTING STAGES...'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
