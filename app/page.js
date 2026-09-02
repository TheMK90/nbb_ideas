'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import IdeaForm from '@/components/IdeaForm';
import IdeaCard from '@/components/IdeaCard';
import IdeaFilters from '@/components/IdeaFilters';
import Insights from '@/components/Insights';

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState('newest');

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

  const visible = useMemo(() => {
    const filtered = category ? ideas.filter(idea => idea.category === category) : ideas;

    const sorted = [...filtered];
    if (sort === 'votes') sorted.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    if (sort === 'discussed') {
      sorted.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    }
    return sorted;
  }, [ideas, category, sort]);

  return (
    <>
      {!loading && !error && ideas.length > 0 && (
        <section>
          <h2>At a glance</h2>
          <Insights ideas={ideas} />
        </section>
      )}

      <section className="card">
        <h2>Submit an idea</h2>
        <IdeaForm onSubmitted={refresh} />
      </section>

      <section>
        <h2>
          {category ? category : 'All ideas'}{' '}
          {visible.length > 0 && <span className="muted">({visible.length})</span>}
        </h2>

        {ideas.length > 0 && (
          <IdeaFilters
            category={category}
            onCategory={setCategory}
            sort={sort}
            onSort={setSort}
          />
        )}

        {error && <p className="error">Could not load ideas: {error}</p>}
        {loading && <p className="empty">Loading ideas…</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="empty">
            {category ? `No ideas in ${category} yet.` : 'No ideas yet. Be the first to submit one.'}
          </p>
        )}

        {visible.map(idea => (
          <IdeaCard key={idea.id} idea={idea} onChange={refresh} />
        ))}
      </section>
    </>
  );
}
