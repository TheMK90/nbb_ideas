'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import IdeaForm from '@/components/IdeaForm';
import IdeaCard from '@/components/IdeaCard';

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Every feature calls this after it writes, so one function owns reloading.
  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('ideas')
      .select('*, comments(*)')
      .order('created_at', { ascending: false });

    if (error) setError(error.message);
    else {
      setError(null);
      setIdeas(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <>
      <section className="card">
        <h2>Submit an idea</h2>
        <IdeaForm onSubmitted={refresh} />
      </section>

      <section>
        <h2>
          Ideas {ideas.length > 0 && <span className="muted">({ideas.length})</span>}
        </h2>

        {error && <p className="error">Could not load ideas: {error}</p>}
        {loading && <p className="empty">Loading ideas…</p>}
        {!loading && !error && ideas.length === 0 && (
          <p className="empty">No ideas yet. Be the first to submit one.</p>
        )}

        {ideas.map(idea => (
          <IdeaCard key={idea.id} idea={idea} onChange={refresh} />
        ))}
      </section>
    </>
  );
}
