const DOMAIN = 'https://belensantamarina.com';

const LANGUAGES = [
  {
    language: 'english',
    index: '/index.html',
    social: '/social.html',
    route: 'work',
    link: 'Website in English',
    abbreviation: 'ENG',
    code: 'en-GB',
  },
  {
    language: 'spanish',
    index: '/index.es.html',
    social: '/social.es.html',
    route: 'obra',
    link: 'Sitio web en español',
    abbreviation: 'ESP',
    code: 'es-AR',
  },
];

const IMAGE_RESOLUTIONS = [
  { tag: '', width: 720, height: 320, density: 72 },
  { tag: '@1.5x', width: 1080, height: 480, density: 96 },
  { tag: '@2x', width: 1440, height: 640, density: 150 },
  { tag: '@3x', width: 2160, height: 960, density: 300 },
];

module.exports = { DOMAIN, LANGUAGES, IMAGE_RESOLUTIONS };
