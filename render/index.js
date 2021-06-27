const mustache = require('mustache');
const showdown = require('showdown');

const {
  readFile,
  writeFile,
  readDirectory,
  prepareDirectory,
} = require('./utils/filesHandler');

const showdownConverter = new showdown.Converter();

const render = async () => {
  let baseTemplate = await readFile('index.html');
  let websiteConstants = await readFile('content/english_constants.json', true);

  const navItems = websiteConstants.menu.map((itemString) => ({
    name: itemString.split('|')[0],
    reference: itemString.split('|')[1],
  }));

  const websiteData = {
    language: websiteConstants.language,
    title: websiteConstants.title,
    description: websiteConstants.description,
    i18n_string_language: websiteConstants.i18n_string_language,
    i18n_string_menu: websiteConstants.i18n_string_menu,
    nav_items: navItems,
  };

  let workFiles = await readDirectory('content/work');
  await prepareDirectory('build/work');
  for (let fileName of workFiles) {
    let pageConstants = await readFile(`content/work/${fileName}`, true);

    const galleryItems = pageConstants.gallery.map((galleryItem, index) => ({
      id: index,
      ...galleryItem,
    }));

    const pageBody = showdownConverter.makeHtml(pageConstants.body);
    const pageData = {
      ...websiteData,
      body: pageBody,
      name: pageConstants.name,
      gallery: pageConstants.gallery.length > 0,
      gallery_items: galleryItems,
    };

    const pageOutput = mustache.render(baseTemplate, pageData);
    writeFile(`build/work/${fileName.replace('json', 'html')}`, pageOutput);
  }

  const homeGalleryItems = websiteConstants.gallery.map(
    (galleryItem, index) => ({
      id: index,
      ...galleryItem,
    })
  );

  const homeData = {
    ...websiteData,
    gallery: websiteConstants.gallery.length > 0,
    gallery_items: homeGalleryItems,
    gallery_nav: 'hidden',
  };

  const homeOutput = mustache.render(baseTemplate, homeData);
  writeFile('build/index.html', homeOutput);
};

render();
