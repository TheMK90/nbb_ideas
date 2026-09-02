'use client';

import { byCategory, byStage, byWeek, summarise } from '@/lib/insights';
import BarRows from '@/components/charts/BarRows';
import TrendChart from '@/components/charts/TrendChart';
import styles from './Insights.module.css';

function Tile({ value, label, accent }) {
  return (
    <div className={styles.tile}>
      <span className={`${styles.tileValue} ${accent ? styles.accent : ''}`}>{value}</span>
      <span className={styles.tileLabel}>{label}</span>
    </div>
  );
}

// The panel always describes the whole board, not the filtered view — a filter
// is for finding an idea, and a number that moves when you filter is a number
// nobody can quote in a meeting.
export default function Insights({ ideas }) {
  if (!ideas.length) return null;

  const totals = summarise(ideas);
  const stages = byStage(ideas);
  const categories = byCategory(ideas);
  const weeks = byWeek(ideas);

  return (
    <div className={styles.panel}>
      <div className={styles.tiles}>
        <Tile value={totals.ideas} label="Ideas" />
        <Tile value={totals.votes} label="Votes" />
        <Tile value={totals.comments} label="Comments" />
        <Tile value={totals.implemented} label="Implemented" accent />
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Where ideas stand</h3>
          <p className={styles.chartNote}>Submitted through to implemented</p>
          <BarRows rows={stages} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>What they are about</h3>
          <p className={styles.chartNote}>Ideas by category</p>
          <BarRows rows={categories} />
        </div>

        <div className={`${styles.chartCard} ${styles.wide}`}>
          <h3 className={styles.chartTitle}>Ideas submitted per week</h3>
          <p className={styles.chartNote}>Last eight weeks</p>
          <TrendChart points={weeks} />
        </div>
      </div>
    </div>
  );
}
