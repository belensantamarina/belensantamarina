const DOMAIN = 'https://belensantamarina.com';

const LANGUAGES = [
  {
    language: 'english',
    index: '/index.html',
    social: '/social.html',
    about: '/about.html',
    shows: '/shows.html',
    route: 'work',
    link: 'Website in English',
    abbreviation: 'EN',
    code: 'en-GB',
  },
  {
    language: 'spanish',
    index: '/index.es.html',
    social: '/social.es.html',
    about: '/acerca.html',
    shows: '/muestras.html',
    route: 'obra',
    link: 'Sitio web en español',
    abbreviation: 'ES',
    code: 'es-AR',
  },
  {
    language: 'chinese',
    index: '/index.zh.html',
    social: '/social.zh.html',
    about: '/关于.html',
    shows: '/艺术展览.html',
    route: '艺术品',
    link: '中网站',
    abbreviation: '中',
    code: 'zh-CN',
  },
];

const IMAGE_RESOLUTIONS = [
  { tag: '', width: 720, height: 720, density: 72 },
  { tag: '@1.5x', width: 1080, height: 1080, density: 96 },
  { tag: '@2x', width: 1440, height: 1440, density: 150 },
  { tag: '@3x', width: 2160, height: 2160, density: 300 },
];

module.exports = { DOMAIN, LANGUAGES, IMAGE_RESOLUTIONS };
