// Aggregations behind the insights panel, kept apart from the components so
// the numbers can be reasoned about (and tested) on their own.

// Colour follows the entity, never its rank: a category keeps its colour when a
// filter changes which ones are on screen. Hexes are the validated categorical
// slots 1-5 (adjacent CVD ΔE 9.1, normal-vision ΔE 19.6 on a light surface).
export const CATEGORIES = [
  { name: 'Digital Banking', color: '#2a78d6' },
  { name: 'Customer Experience', color: '#eb6834' },
  { name: 'Operations', color: '#1baf7a' },
  { name: 'Sustainability', color: '#eda100' },
  { name: 'Risk & Compliance', color: '#e87ba4' },
];

export const CATEGORY_COLORS = Object.fromEntries(
  CATEGORIES.map(category => [category.name, category.color])
);

// Stages are ordered, not unrelated, so they take one hue stepped light to dark
// rather than five unrelated colours. The lightest step still clears the surface.
export const STAGE_ORDER = ['Submitted', 'Under Review', 'Approved', 'Implemented'];

export const STAGE_COLORS = {
  Submitted: '#86b6ef',
  'Under Review': '#3987e5',
  Approved: '#1c5cab',
  Implemented: '#0d366b',
};

export function summarise(ideas) {
  return {
    ideas: ideas.length,
    votes: ideas.reduce((total, idea) => total + (idea.votes || 0), 0),
    comments: ideas.reduce((total, idea) => total + (idea.comments?.length || 0), 0),
    implemented: ideas.filter(idea => idea.status === 'Implemented').length,
  };
}

export function byStage(ideas) {
  return STAGE_ORDER.map(stage => ({
    label: stage,
    value: ideas.filter(idea => (idea.status || 'Submitted') === stage).length,
    color: STAGE_COLORS[stage],
  }));
}

export function byCategory(ideas) {
  return CATEGORIES
    .map(category => ({
      label: category.name,
      value: ideas.filter(idea => idea.category === category.name).length,
      color: category.color,
    }))
    .filter(row => row.value > 0)
    .sort((a, b) => b.value - a.value);
}

// Submissions per week for the last `weeks` weeks, oldest first. Weeks are
// anchored to the most recent Sunday so the final bucket is the current week.
export function byWeek(ideas, weeks = 8) {
  const startOfWeek = date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  };

  const thisWeek = startOfWeek(new Date());
  const buckets = [];

  for (let i = weeks - 1; i >= 0; i -= 1) {
    const start = new Date(thisWeek);
    start.setDate(start.getDate() - i * 7);
    buckets.push({ start, value: 0 });
  }

  for (const idea of ideas) {
    const week = startOfWeek(idea.created_at).getTime();
    const bucket = buckets.find(b => b.start.getTime() === week);
    if (bucket) bucket.value += 1;
  }

  return buckets.map(bucket => ({
    label: bucket.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: bucket.value,
  }));
}
