'use client';

import { useState } from 'react';
import styles from './TrendChart.module.css';

const WIDTH = 320;
const HEIGHT = 100;
const PAD = 6;

// One series, so no legend — the panel heading names it. Hovering anywhere on
// the plot snaps a crosshair to the nearest week, which is easier to hit than
// the dots themselves.
export default function TrendChart({ points }) {
  const [active, setActive] = useState(null);

  const max = Math.max(...points.map(p => p.value), 1);
  const stepX = points.length > 1 ? (WIDTH - PAD * 2) / (points.length - 1) : 0;

  const x = i => PAD + i * stepX;
  const y = value => HEIGHT - PAD - (value / max) * (HEIGHT - PAD * 2);

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.value)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${HEIGHT} L${x(0)},${HEIGHT} Z`;

  function handleMove(event) {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - box.left) / box.width;
    const index = Math.round(ratio * (points.length - 1));
    setActive(Math.min(Math.max(index, 0), points.length - 1));
  }

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Ideas submitted per week over the last ${points.length} weeks`}
      >
        <defs>
          <linearGradient id="trendFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a78d6" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2a78d6" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line className={styles.axis} x1="0" y1={HEIGHT} x2={WIDTH} y2={HEIGHT} />
        <path className={styles.area} d={area} />
        <path className={styles.line} d={line} vectorEffect="non-scaling-stroke" />

        {active !== null && (
          <>
            <line
              className={styles.crosshair}
              x1={x(active)}
              y1="0"
              x2={x(active)}
              y2={HEIGHT}
              vectorEffect="non-scaling-stroke"
            />
            <circle className={styles.dot} cx={x(active)} cy={y(points[active].value)} r="4" />
          </>
        )}

        <rect
          className={styles.hit}
          x="0"
          y="0"
          width={WIDTH}
          height={HEIGHT}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
        />
      </svg>

      {active !== null && (
        <span
          className={styles.tip}
          style={{ left: `${(active / Math.max(points.length - 1, 1)) * 100}%` }}
          role="status"
        >
          <strong>Week of {points[active].label}</strong>
          {points[active].value} {points[active].value === 1 ? 'idea' : 'ideas'}
        </span>
      )}

      <div className={styles.ticks}>
        <span>{points[0]?.label}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
    </div>
  );
}
