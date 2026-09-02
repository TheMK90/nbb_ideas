'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CATEGORIES } from '@/lib/insights';
import styles from './IdeaForm.module.css';

export default function IdeaForm({ onSubmitted }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('ideas').insert({
      title: title.trim(),
      description: description.trim(),
      author: author.trim(),
      category,
    });

    setSaving(false);
    if (error) {
      console.error('Could not save idea:', error.message);
      return;
    }

    setTitle('');
    setDescription('');
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Idea title"
        maxLength={80}
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe your idea"
        rows={3}
        required
      />
      <div className={styles.row}>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Your name"
          maxLength={40}
          required
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          aria-label="Category"
        >
          {CATEGORIES.map(item => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Submit idea'}
      </button>
    </form>
  );
}
