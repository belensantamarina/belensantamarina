const LANGUAGES = [
  {
    language: 'english',
    index: '/index.html',
    route: 'work',
    link: 'Website in English',
    abbreviation: 'ENG',
    code: 'en-GB',
  },
  {
    language: 'spanish',
    index: '/index.es.html',
    route: 'obra',
    link: 'Sitio web en español',
    abbreviation: 'ESP',
    code: 'es-AR',
  },
];

const IMAGE_RESOLUTIONS = [
  { tag: '', size: 480, density: 72 },
  { tag: '@1.5x', size: 720, density: 96 },
  { tag: '@2x', size: 960, density: 150 },
  { tag: '@3x', size: 1440, density: 300 },
];

module.exports = { LANGUAGES, IMAGE_RESOLUTIONS };
