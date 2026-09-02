'use client';

import styles from './Tooltip.module.css';

// Shared hover readout. Charts position it by placing it inside a relatively
// positioned mark, so there is no measuring or portal to keep in sync.
export default function Tooltip({ children, style }) {
  return (
    <span className={styles.tooltip} style={style} role="status">
      {children}
    </span>
  );
}
