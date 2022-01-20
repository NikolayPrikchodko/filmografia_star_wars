export function render(data, renderPage) {
  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4');
  let count = 0;

  for (const films of data.results) {
    const episodes = document.createElement('div');
    const episodeBody = document.createElement('div');
    const title = document.createElement('h2');
    const episodeNumber = document.createElement('h3');
    const prologue = document.createElement('p');
    const episodeBtn = document.createElement('a');

    episodes.style.width = '49%';
    episodes.style.opacity = '0.9';
    episodes.classList.add('card', 'my-2');
    episodeBody.classList.add('card-body');
    title.classList.add('card-title');
    episodeNumber.classList.add('card-title');
    prologue.classList.add('card-text');
    episodeBtn.classList.add('btn', 'btn-primary', 'btn-detailed');

    episodes.append(episodeBody);
    episodeBody.append(title);
    episodeBody.append(episodeNumber);
    episodeBody.append(prologue);
    episodeBody.append(episodeBtn);

    title.textContent = films.title;
    episodeNumber.textContent = `Episode ${films.episode_id}`
    prologue.textContent = films.opening_crawl;
    episodeBtn.textContent = 'More detailed...';
    episodeBtn.id = `${count += 1}`;
    episodeBtn.href = `?films_Id=${episodeBtn.id}`;

    episodeBtn.addEventListener('click', event => {
      event.preventDefault();
      history.pushState(null, '', episodeBtn.href);
      renderPage('./episode.js', `https://swapi.dev/api/films/${episodeBtn.id}`, 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css')
    });    

    container.append(episodes);
  };


  return container;
};