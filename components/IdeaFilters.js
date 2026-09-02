'use client';

import { CATEGORIES } from '@/lib/insights';
import styles from './IdeaFilters.module.css';

// Filters sit in one row above the board. The category chips carry the same
// colour the charts use, so a colour means the same thing everywhere on screen.
export default function IdeaFilters({ category, onCategory, sort, onSort }) {
  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={category === null ? `${styles.chip} ${styles.active}` : styles.chip}
        onClick={() => onCategory(null)}
      >
        All
      </button>

      {CATEGORIES.map(item => (
        <button
          key={item.name}
          type="button"
          className={category === item.name ? `${styles.chip} ${styles.active}` : styles.chip}
          onClick={() => onCategory(category === item.name ? null : item.name)}
        >
          <span className={styles.dot} style={{ background: item.color }} aria-hidden="true" />
          {item.name}
        </button>
      ))}

      <span className={styles.spacer} />

      <select
        className={styles.sort}
        value={sort}
        onChange={e => onSort(e.target.value)}
        aria-label="Sort ideas"
      >
        <option value="newest">Newest first</option>
        <option value="votes">Most voted</option>
        <option value="discussed">Most discussed</option>
      </select>
    </div>
  );
}
