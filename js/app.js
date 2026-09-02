// Renders the idea list. Features attach extra UI through App.cardExtras:
// each hook gets (idea, cardElement) and may append its own controls.
// App is defined before the feature scripts load, and the first render waits
// for DOMContentLoaded so every feature has registered its hook by then.
const App = (() => {
  const cardExtras = [];

  function render() {
    const list = document.getElementById('ideas');
    const ideas = Store.all();
    document.getElementById('count').textContent = ideas.length ? `(${ideas.length})` : '';
    list.innerHTML = '';

    if (!ideas.length) {
      list.innerHTML = '<div class="empty">No ideas yet. Be the first to submit one.</div>';
      return;
    }

    for (const idea of ideas) {
      const card = document.createElement('div');
      card.className = 'idea';
      card.innerHTML = '<h3></h3><p class="body"></p><div class="meta"></div>';
      card.querySelector('h3').textContent = idea.title;
      card.querySelector('.body').textContent = idea.description;
      card.querySelector('.meta').textContent =
        `${idea.author} · ${new Date(idea.createdAt).toLocaleDateString()}`;

      for (const hook of cardExtras) hook(idea, card);
      list.appendChild(card);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('idea-form');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      await Store.add({
        title: form.querySelector('#title').value.trim(),
        description: form.querySelector('#description').value.trim(),
        author: form.querySelector('#author').value.trim(),
      });
      form.reset();
      render();
    });

    await Store.refresh();
    render();
  });

  return { render, cardExtras };
})();
