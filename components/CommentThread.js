'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './CommentThread.module.css';

// Comment rows arrive joined onto the idea by the query in app/page.js.
export default function CommentThread({ idea, onChange }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const comments = [...(idea.comments || [])].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('comments').insert({
      idea_id: idea.id,
      author: author.trim(),
      text: text.trim(),
    });

    setSaving(false);
    if (error) {
      console.error('Could not post comment:', error.message);
      return;
    }

    setText('');
    setOpen(true);
    await onChange();
  }

  const label = comments.length
    ? `${comments.length} comment${comments.length > 1 ? 's' : ''}`
    : 'No comments yet';

  return (
    <div className={styles.thread}>
      <button type="button" className={styles.toggle} onClick={() => setOpen(!open)}>
        {label}
        {comments.length > 0 && (open ? ' · hide' : ' · show')}
      </button>

      {open && comments.length > 0 && (
        <ul className={styles.list}>
          {comments.map(comment => (
            <li key={comment.id} className={styles.comment}>
              <span className={styles.avatar} aria-hidden="true">
                {comment.author.trim().charAt(0).toUpperCase()}
              </span>
              <div>
                <span className={styles.author}>{comment.author}</span>
                <span className={styles.when}>
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
                <p className={styles.text}>{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Your name"
          maxLength={40}
          required
        />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment"
          maxLength={200}
          required
        />
        <button type="submit" disabled={saving}>
          {saving ? 'Posting…' : 'Post'}
        </button>
      </form>
    </div>
  );
}
