import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'amber' | 'cyan' | 'emerald' | 'rose' | 'muted';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'cyan',
  size = 'md' 
}) => {
  let resolvedVariant = variant;
  const lower = status.toLowerCase();

  if (lower.includes('critical') || lower.includes('requires investigation') || lower.includes('alert')) {
    resolvedVariant = 'rose';
  } else if (lower.includes('ready') || lower.includes('verified') || lower.includes('completed')) {
    resolvedVariant = 'emerald';
  } else if (lower.includes('processing') || lower.includes('elevated') || lower.includes('pending')) {
    resolvedVariant = 'amber';
  } else if (lower.includes('standard') || lower.includes('correlated')) {
    resolvedVariant = 'cyan';
  }

  const paddingStyle = size === 'sm' ? '2px 6px' : '3px 9px';
  const fontSizeStyle = size === 'sm' ? '10px' : '11px';

  return (
    <span 
      className={`badge badge-${resolvedVariant}`}
      style={{ padding: paddingStyle, fontSize: fontSizeStyle }}
    >
      <span style={{ 
        width: 6, 
        height: 6, 
        borderRadius: '50%', 
        backgroundColor: 'currentColor',
        display: 'inline-block' 
      }} />
      {status}
    </span>
  );
};
