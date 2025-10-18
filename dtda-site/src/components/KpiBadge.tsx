import React from 'react';

export type Variant = 'ok' | 'warn' | 'bad';

interface KpiBadgeProps {
  label: string;
  value: string;
  variant?: Variant;
}

const variantConfig = {
  ok: {
    color: '#16a34a',
    backgroundColor: '#f0fdf4',
    darkBackgroundColor: '#14532d',
  },
  warn: {
    color: '#f59e0b',
    backgroundColor: '#fffbeb',
    darkBackgroundColor: '#78350f',
  },
  bad: {
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    darkBackgroundColor: '#7f1d1d',
  },
};

export default function KpiBadge({ label, value, variant = 'ok' }: KpiBadgeProps): JSX.Element {
  const config = variantConfig[variant];

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.375rem 0.875rem',
        margin: '0.25rem',
        borderRadius: '6px',
        border: `1px solid ${config.color}`,
        backgroundColor: config.backgroundColor,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
      }}
    >
      {label}: <strong style={{ color: config.color, fontWeight: 700 }}>{value}</strong>
    </span>
  );
}
