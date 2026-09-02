'use client';

// Each team feature plugs itself into this card by replacing its own marker
// line below. The markers are kept apart by the label comments above them so
// two feature branches never edit neighbouring lines, and merges stay clean.

/* idea status */
// import:status
/* upvoting */
import UpvoteButton from '@/components/UpvoteButton';
/* comments */
import CommentThread from '@/components/CommentThread';

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
      <UpvoteButton idea={idea} onChange={onChange} />

      {/* comments */}
      <CommentThread idea={idea} onChange={onChange} />
    </article>
  );
}
