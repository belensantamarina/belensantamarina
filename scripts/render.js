const mustache = require('mustache');
const showdown = require('showdown');

const {
  readFile,
  writeFile,
  readDirectory,
  prepareDirectory,
} = require('./utils/filesHandler');
const { LANGUAGES, PICTURE_SIZES } = require('./utils/constants');

const showdownConverter = new showdown.Converter();

const parseGalleryItem = (galleryItem) => {
  const fileName = galleryItem.file.split('.')[0];
  const sourceSet = PICTURE_SIZES.thumbnail.map(({ tag }) =>
    tag
      ? `/media/thumbnail/${fileName}${tag}.jpg ${tag.replace('@', '')}`
      : `/media/thumbnail/${fileName}.jpg`
  );
  return {
    source_set: sourceSet,
    source: sourceSet[0],
    description: galleryItem.description,
  };
};

const render = async ({ language, index, route }) => {
  let baseTemplate = await readFile('index.html');
  let websiteConstants = await readFile(
    `content/${language}_constants.json`,
    true
  );

  const navItems = websiteConstants.menu.map((itemString) => ({
    name: itemString.split('|')[0],
    reference: `/${route}/${itemString.split('|')[1]}.html`,
  }));

  const websiteFooter = showdownConverter.makeHtml(websiteConstants.footer);

  const websiteData = {
    language: websiteConstants.language,
    title: websiteConstants.title,
    html_title: websiteConstants.title,
    footer: websiteFooter,
    description: websiteConstants.description,
    i18n_string_language: websiteConstants.i18n_string_language,
    i18n_string_menu: websiteConstants.i18n_string_menu,
    nav_items: navItems,
  };

  let workFiles = await readDirectory(`content/${route}`);
  await prepareDirectory(`build/${route}`);
  for (let fileName of workFiles) {
    let pageConstants = await readFile(`content/${route}/${fileName}`, true);

    const galleryItems = pageConstants.gallery.map((galleryItem, index) => ({
      ...parseGalleryItem(galleryItem),
      id: index,
    }));

    const pageBody = showdownConverter.makeHtml(pageConstants.body);
    const pageData = {
      ...websiteData,
      html_title: `${websiteData.title}: ${pageConstants.name}`,
      description: pageConstants.description,
      body: pageBody,
      name: pageConstants.name,
      gallery: pageConstants.gallery.length > 0,
      gallery_items: galleryItems,
    };

    const pageOutput = mustache.render(baseTemplate, pageData);
    writeFile(`build/${route}/${fileName.replace('json', 'html')}`, pageOutput);
  }

  const homeGalleryItems = websiteConstants.gallery.map(
    (galleryItem, index) => ({
      ...parseGalleryItem(galleryItem),
      id: index,
    })
  );

  const homeData = {
    ...websiteData,
    gallery: websiteConstants.gallery.length > 0,
    gallery_items: homeGalleryItems,
    gallery_nav: 'hidden',
  };

  const homeOutput = mustache.render(baseTemplate, homeData);
  writeFile(`build/${index}`, homeOutput);
};

LANGUAGES.forEach((language) => {
  render(language);
});
