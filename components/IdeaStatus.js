'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './IdeaStatus.module.css';

// These stages match the check constraint on the ideas table in supabase.sql,
// so anything the dropdown offers is a value the database will accept.
export const STAGES = ['Submitted', 'Under Review', 'Approved', 'Implemented'];

const TONE = {
  'Under Review': styles.review,
  Approved: styles.approved,
  Implemented: styles.implemented,
};

export function StatusBadge({ status }) {
  const stage = status || STAGES[0];
  return (
    <span className={`${styles.badge} ${TONE[stage] || ''}`}>
      <span className={styles.dot} aria-hidden="true" />
      {stage}
    </span>
  );
}

export function StatusControl({ idea, onChange }) {
  const [saving, setSaving] = useState(false);

  async function handleChange(event) {
    setSaving(true);

    const { error } = await supabase
      .from('ideas')
      .update({ status: event.target.value })
      .eq('id', idea.id);

    if (error) console.error('Could not update status:', error.message);
    await onChange();
    setSaving(false);
  }

  return (
    <div className={styles.control}>
      <label className={styles.label} htmlFor={`status-${idea.id}`}>
        Status
      </label>
      <select
        id={`status-${idea.id}`}
        className={styles.select}
        value={idea.status || STAGES[0]}
        onChange={handleChange}
        disabled={saving}
      >
        {STAGES.map(stage => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  );
}
