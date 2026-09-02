'use client';

import { useState } from 'react';
import styles from './BarRows.module.css';
import Tooltip from './Tooltip';

// One horizontal bar per row. Every row carries a visible label and value, so
// identity never rests on colour alone — which is also what lets the lighter
// categorical hues be used on a light surface.
export default function BarRows({ rows, unit = 'ideas' }) {
  const [hovered, setHovered] = useState(null);

  if (!rows.length) return <p className={styles.empty}>Nothing to show yet.</p>;

  const max = Math.max(...rows.map(row => row.value), 1);
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className={styles.chart}>
      {rows.map(row => (
        <div
          key={row.label}
          className={styles.row}
          onMouseEnter={() => setHovered(row.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={styles.label}>{row.label}</span>

          <span className={styles.track}>
            <span
              className={styles.fill}
              style={{ width: `${(row.value / max) * 100}%`, background: row.color }}
            />
            {hovered === row.label && (
              <Tooltip>
                <strong>{row.label}</strong>
                {row.value} {unit}
                {total > 0 && ` · ${Math.round((row.value / total) * 100)}%`}
              </Tooltip>
            )}
          </span>

          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
