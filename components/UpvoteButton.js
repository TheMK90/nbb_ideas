'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './UpvoteButton.module.css';

const VOTED_KEY = 'nbb_ideas_voted';

function readVoted() {
  try {
    return JSON.parse(window.localStorage.getItem(VOTED_KEY)) || [];
  } catch {
    return [];
  }
}

// The vote count lives on the idea in Supabase. Which ideas this person has
// already backed is kept in the browser, so one person cannot stack votes by
// clicking the button twice.
export default function UpvoteButton({ idea, onChange }) {
  const [voted, setVoted] = useState(false);
  const [busy, setBusy] = useState(false);

  // Read after mount: localStorage does not exist while the page is prerendered.
  useEffect(() => {
    setVoted(readVoted().includes(idea.id));
  }, [idea.id]);

  async function toggleVote() {
    setBusy(true);

    const next = !voted;
    const stored = readVoted();
    window.localStorage.setItem(
      VOTED_KEY,
      JSON.stringify(next ? [...stored, idea.id] : stored.filter(id => id !== idea.id))
    );
    setVoted(next);

    const { error } = await supabase
      .from('ideas')
      .update({ votes: (idea.votes || 0) + (next ? 1 : -1) })
      .eq('id', idea.id);

    if (error) console.error('Could not save vote:', error.message);
    await onChange();
    setBusy(false);
  }

  return (
    <button
      type="button"
      className={voted ? `${styles.vote} ${styles.voted}` : styles.vote}
      onClick={toggleVote}
      disabled={busy}
      aria-pressed={voted}
      aria-label={`Upvote "${idea.title}"`}
    >
      <span className={styles.arrow} aria-hidden="true">▲</span>
      <span>{idea.votes || 0}</span>
    </button>
  );
}
