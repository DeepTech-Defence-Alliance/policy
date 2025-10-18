import React from 'react';

interface MatrixProps {
  rows: Array<[string, string, string]>;
  headers?: [string, string, string];
}

export default function Matrix({
  rows,
  headers = ['Domein', 'Oud frame', 'Nieuw frame']
}: MatrixProps): JSX.Element {
  return (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '2px solid var(--ifm-color-primary-dark)',
            }}>
              {headers[0]}
            </th>
            <th style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '2px solid #dc2626',
            }}>
              {headers[1]}
            </th>
            <th style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '2px solid #15803d',
            }}>
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([domein, oud, nieuw], i) => (
            <tr
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--ifm-background-surface-color)',
              }}
            >
              <td style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--ifm-table-border-color)',
                fontWeight: 600,
                color: 'var(--ifm-color-primary)',
              }}>
                {domein}
              </td>
              <td style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--ifm-table-border-color)',
                color: 'var(--ifm-color-emphasis-700)',
                textDecoration: 'line-through',
                opacity: 0.7,
              }}>
                {oud}
              </td>
              <td style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--ifm-table-border-color)',
                fontWeight: 500,
              }}>
                {nieuw}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
