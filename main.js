

const cssPromises = {};
const appContainer = document.getElementById('app');
const cssStyle = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  };

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  };

  return fetch(src).then(res => res.json());
};

const searchParams = new URLSearchParams(location.search);
const filmsId = searchParams.get('films_Id');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageEpisode, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageEpisode.render(data, renderPage));
    });
};

if (filmsId) {
  renderPage(
    './episode.js',
    `https://swapi.dev/api/films/${filmsId}`,
    `${cssStyle}`
  );
} else {
  renderPage(
    './filmography.js',
    'https://swapi.dev/api/films/',
    `${cssStyle}`
  )
}


// window.addEventListener('popstate', function () {
//   renderPage(moduleName, apiUrl, css);
// });


