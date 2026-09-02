// Shared data layer for Bank Ideas, backed by Supabase.
// The anon key is a public, client-side key — row level security in
// supabase.sql is what controls access, not secrecy of this string.
const Store = (() => {
  const SUPABASE_URL = 'https://jiazzcfvegzbuhddlucu.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYXp6Y2Z2ZWd6YnVoZGRsdWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNDI1NjUsImV4cCI6MjEwMzkxODU2NX0.ZMuu4E1Bxp2MOiyyDoXoV1dJ1d9CMW2PXXWjRWTEIIE';

  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  let cache = [];

  // Pulls every idea with its comments and normalises the column names the
  // rest of the app reads.
  async function refresh() {
    const { data, error } = await db
      .from('ideas')
      .select('*, comments(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Could not load ideas:', error.message);
      return cache;
    }
    cache = data.map(row => ({ ...row, createdAt: row.created_at }));
    return cache;
  }

  const all = () => cache;

  async function add(idea) {
    const { error } = await db.from('ideas').insert(idea);
    if (error) console.error('Could not save idea:', error.message);
    return refresh();
  }

  async function update(id, patch) {
    const { error } = await db.from('ideas').update(patch).eq('id', id);
    if (error) console.error('Could not update idea:', error.message);
    return refresh();
  }

  async function insert(table, row) {
    const { error } = await db.from(table).insert(row);
    if (error) console.error(`Could not save to ${table}:`, error.message);
    return refresh();
  }

  return { refresh, all, add, update, insert };
})();
