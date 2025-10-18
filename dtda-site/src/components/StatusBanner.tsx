import React from 'react';

export type Status = 'concept' | 'vastgesteld' | 'verouderd';

interface StatusBannerProps {
  status: Status;
  versie?: string;
  datum?: string;
}

const statusConfig = {
  concept: {
    label: 'Concept',
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    darkBackgroundColor: '#1e3a8a',
  },
  vastgesteld: {
    label: 'Vastgesteld',
    color: '#16a34a',
    backgroundColor: '#f0fdf4',
    darkBackgroundColor: '#14532d',
  },
  verouderd: {
    label: 'Verouderd',
    color: '#9ca3af',
    backgroundColor: '#f9fafb',
    darkBackgroundColor: '#374151',
  },
};

export default function StatusBanner({ status, versie, datum }: StatusBannerProps): JSX.Element {
  const config = statusConfig[status];

  return (
    <div
      style={{
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        borderRadius: '8px',
        borderLeft: `4px solid ${config.color}`,
        backgroundColor: 'var(--ifm-background-color)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            backgroundColor: config.color,
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {config.label}
        </span>
        {versie && (
          <span style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
            Versie: <strong>{versie}</strong>
          </span>
        )}
        {datum && (
          <span style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
            Datum: <strong>{datum}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
