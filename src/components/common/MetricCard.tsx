import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: React.ReactNode;
  variant?: 'normal' | 'highlight' | 'amber' | 'emerald';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  icon,
  variant = 'normal'
}) => {
  let borderColor = 'var(--border-subtle)';
  let valueColor = 'var(--text-primary)';

  if (variant === 'highlight') {
    borderColor = 'var(--accent-cyan)';
    valueColor = 'var(--accent-cyan)';
  } else if (variant === 'amber') {
    borderColor = 'rgba(245, 158, 11, 0.4)';
    valueColor = 'var(--accent-amber)';
  } else if (variant === 'emerald') {
    borderColor = 'rgba(16, 185, 129, 0.4)';
    valueColor = 'var(--accent-emerald)';
  }

  return (
    <div 
      className="card" 
      style={{ 
        padding: '16px', 
        borderColor,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {label}
        </span>
        {icon && <div style={{ color: 'var(--text-muted)' }}>{icon}</div>}
      </div>

      <div style={{ marginTop: '10px', marginBottom: '4px' }}>
        <span className="mono" style={{ fontSize: '24px', fontWeight: 700, color: valueColor }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '6px', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>

      {subtext && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {subtext}
        </span>
      )}
    </div>
  );
};
