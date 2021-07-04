const LANGUAGES = [
  {
    language: 'english',
    index: 'index.html',
    route: 'work',
    link: 'Website in English',
    abbreviation: 'ENG',
    code: 'en-GB',
  },
  {
    language: 'spanish',
    index: 'index.es.html',
    route: 'obra',
    link: 'Sitio web en español',
    abbreviation: 'ESP',
    code: 'es-AR',
  },
];

const PICTURE_SIZES = {
  thumbnail: [
    { tag: '', size: 40, density: 72 },
    { tag: '@1.5x', size: 60, density: 96 },
    { tag: '@2x', size: 80, density: 150 },
    { tag: '@3x', size: 120, density: 300 },
  ],
  small: [
    { tag: '', size: 320, density: 72 },
    { tag: '@1.5x', size: 480, density: 96 },
    { tag: '@2x', size: 640, density: 150 },
    { tag: '@3x', size: 960, density: 300 },
  ],
  large: [
    { tag: '', size: 480, density: 72 },
    { tag: '@1.5x', size: 720, density: 96 },
    { tag: '@2x', size: 960, density: 150 },
    { tag: '@3x', size: 1440, density: 300 },
  ],
};

module.exports = { LANGUAGES, PICTURE_SIZES };
