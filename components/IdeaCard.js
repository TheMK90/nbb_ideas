'use client';

// Each team feature plugs itself into this card by replacing its own marker
// line below. The markers are kept apart by the label comments above them so
// two feature branches never edit neighbouring lines, and merges stay clean.

/* idea status */
// import:status
/* upvoting */
// import:upvoting
/* comments */
// import:comments

export default function IdeaCard({ idea, onChange }) {
  const created = new Date(idea.created_at).toLocaleDateString();

  return (
    <article className="idea">
      <h3>
        {idea.title}
        {/* idea status */}
        {/* slot:status-badge */}
      </h3>

      <p className="body">{idea.description}</p>
      <div className="meta">
        {idea.author} · {created}
      </div>

      {/* idea status */}
      {/* slot:status-control */}

      {/* upvoting */}
      {/* slot:upvote */}

      {/* comments */}
      {/* slot:comments */}
    </article>
  );
}
