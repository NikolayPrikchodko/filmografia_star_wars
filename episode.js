export function render(data, renderPage) {
  const container = document.createElement('div');
  const episodes = document.createElement('div');
  const btnBackToEpisodes = document.createElement('a');
  const title = document.createElement('h1');
  const episodeNumber = document.createElement('h2');
  const prologue = document.createElement('p');
  const director = document.createElement('h3');
  const planets = document.createElement('h2');
  const planetsList = document.createElement('ul');  
  const species = document.createElement('h2');
  const speciesList = document.createElement('ul');

  container.classList.add('container', 'py-4');
  episodes.style.opacity = '0.9';
  episodes.classList.add('card', 'm-4', 'p-5');
  btnBackToEpisodes.classList.add('btn', 'btn-primary', 'btn-detailed', 'mb-5', 'w-25');
  title.classList.add('card-title');
  episodeNumber.classList.add('card-title');
  prologue.classList.add('card-text');
  director.classList.add('card-title');
  planets.classList.add('card-title');
  planetsList.classList.add('d-flex', 'flex-column', 'flex-wrap', 'py-4');
  species.classList.add('card-title');
  speciesList.classList.add('d-flex', 'flex-column', 'flex-wrap', 'py-4');

  episodes.append(btnBackToEpisodes);
  episodes.append(title);
  episodes.append(episodeNumber);
  episodes.append(prologue);
  episodes.append(director);
  episodes.append(planets);
  episodes.append(planetsList);  
  episodes.append(species);
  episodes.append(speciesList);

  btnBackToEpisodes.textContent = 'Back to episodes';
  btnBackToEpisodes.href = `?films_Id${''}`;
  title.textContent = data.title;
  episodeNumber.textContent = `Episode ${data.episode_id}`
  prologue.textContent = data.opening_crawl;
  director.textContent = `Director: ${data.director}`;
  planets.textContent = 'Planets';
  species.textContent = 'Species';

  btnBackToEpisodes.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', btnBackToEpisodes.href);
    renderPage('./filmography.js', 'https://swapi.dev/api/films/', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css')
  });

  for (const planets of data.planets) {
    const planetsItem = document.createElement('li');
    planetsList.append(planetsItem);
    fetch(planets).then(res => res.json()).then(data => planetsItem.textContent = JSON.stringify(data.name));
  }

  for (const species of data.species) {
    const speciesItem = document.createElement('li');
    speciesList.append(speciesItem);
    fetch(species).then(res => res.json()).then(data => speciesItem.textContent = JSON.stringify(data.name));    
  }

  container.append(episodes);

  return container;

  
};
