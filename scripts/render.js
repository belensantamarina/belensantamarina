const mustache = require('mustache');
const showdown = require('showdown');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const {
  readFile,
  writeFile,
  readDirectory,
  prepareDirectory,
} = require('./utils/filesHandler');
const { DOMAIN, LANGUAGES, IMAGE_RESOLUTIONS } = require('./utils/constants');

const showdownConverter = new showdown.Converter();

const renderLanguage = async ({
  language,
  index,
  social,
  route,
  link,
  abbreviation,
}) => {
  const renderedLinks = [];

  const parseGalleryItem = (galleryItem) => {
    const fileName = galleryItem.file.split('.')[0];
    const sourceSet = IMAGE_RESOLUTIONS.map(({ tag }) =>
      tag
        ? `/media/${fileName}${tag}.jpg ${tag.replace('@', '')}`
        : `/media/${fileName}.jpg`
    );
    let galleryItemResult = {
      source_set: sourceSet,
      source: sourceSet[0],
      description: galleryItem.description,
    };
    if (galleryItem.work) {
      galleryItemResult.work_link = `/${route}/${galleryItem.work}.html`;
    }
    return galleryItemResult;
  };

  const parseMenuItem = (itemString) => ({
    name: itemString.split('|')[0],
    reference: `/${route}/${itemString.split('|')[1]}.html`,
  });

  let baseTemplate = await readFile('index.html');
  let websiteConstants = await readFile(
    `content/${language}_constants.json`,
    true
  );

  const navItems = websiteConstants.menu.map(parseMenuItem);
  const secondaryNavItems = websiteConstants.secondary_menu.map(parseMenuItem);

  const websiteFooter = showdownConverter.makeHtml(websiteConstants.footer);
  const otherLanguage = LANGUAGES.find(
    (element) => element.language !== language
  );

  const websiteData = {
    language: websiteConstants.language,
    title: websiteConstants.title,
    html_title: websiteConstants.title,
    footer: websiteFooter,
    description: websiteConstants.description,
    nav_items: navItems,
    secondary_nav_items: secondaryNavItems,
    i18n_string_menu: websiteConstants.i18n_string_menu,
    i18n_string_gallery_action: websiteConstants.i18n_string_gallery_action,
    i18n_string_social: websiteConstants.i18n_string_social,
    i18n_string_social_action: websiteConstants.i18n_string_social_action,
    i18n_string_current_language: link,
    current_language_abbr: abbreviation,
    other_language_abbr: otherLanguage.abbreviation,
    other_language_index: otherLanguage.index,
    current_language_index: index,
    current_language_social: social,
    i18n_string_other_language: otherLanguage.link,
    other_language: otherLanguage.code,
    meta_url: `${DOMAIN}${index}`,
  };

  let workFiles = await readDirectory(`content/${route}`);
  await prepareDirectory(`build/${route}`);
  for (let fileName of workFiles) {
    let pageConstants = await readFile(`content/${route}/${fileName}`, true);

    const galleryItems = pageConstants.gallery.map(
      (galleryItem, galleryItemIndex) => ({
        ...parseGalleryItem(galleryItem),
        id: galleryItemIndex,
      })
    );

    const pageBody = showdownConverter.makeHtml(pageConstants.body);
    const pagePath = `/${route}/${fileName.replace('json', 'html')}`;
    const pageData = {
      ...websiteData,
      html_title: `${websiteData.title}: ${pageConstants.name}`,
      description: pageConstants.description,
      body: pageBody,
      name: pageConstants.name,
      gallery: galleryItems.length > 0,
      gallery_items: galleryItems,
      gallery_with_nav: true,
      meta_url: `${DOMAIN}${pagePath}`,
      meta_image:
        galleryItems.length > 0 ? `${DOMAIN}${galleryItems[0].source}` : '',
    };

    const pageOutput = mustache.render(baseTemplate, pageData);
    writeFile(`build${pagePath}`, pageOutput);

    renderedLinks.push({
      url: pagePath,
      changefreq: 'yearly',
      priority: 0.75,
    });
  }

  const socialData = {
    ...websiteData,
    html_title: `${websiteData.title}: ${websiteData.i18n_string_social.replace(
      /(<([^>]+)>)/gi,
      ''
    )}`,
    social: true,
    meta_url: `${DOMAIN}${social}`,
  };

  const socialOutput = mustache.render(baseTemplate, socialData);
  writeFile(`build${social}`, socialOutput);

  renderedLinks.push({
    url: social,
    changefreq: 'always',
    priority: 0.5,
  });

  const homeGalleryItems = websiteConstants.gallery.map(
    (galleryItem, galleryItemIndex) => ({
      ...parseGalleryItem(galleryItem),
      id: galleryItemIndex,
    })
  );

  const homeData = {
    ...websiteData,
    gallery: homeGalleryItems.length > 0,
    gallery_items: homeGalleryItems,
    meta_image:
      homeGalleryItems.length > 0
        ? `${DOMAIN}${homeGalleryItems[0].source}`
        : '',
  };

  const homeOutput = mustache.render(baseTemplate, homeData);
  writeFile(`build${index}`, homeOutput);

  renderedLinks.push({
    url: index,
    changefreq: 'monthly',
    priority: 1,
  });

  return renderedLinks;
};

const generateSitemap = (renderedLinksGroups) => {
  const renderedLinks = renderedLinksGroups
    .flat()
    .sort((a, b) => b.priority - a.priority);
  const stream = new SitemapStream({ hostname: DOMAIN });
  streamToPromise(Readable.from(renderedLinks).pipe(stream))
    .then((data) => data.toString())
    .then((result) => {
      writeFile('build/sitemap.xml', result);
    });
};

const render = () => {
  const renderedLinksGroups = [];
  LANGUAGES.forEach((language) => {
    renderLanguage(language).then((newlyRenderedLinks) => {
      renderedLinksGroups.push(newlyRenderedLinks);
      if (renderedLinksGroups.length === LANGUAGES.length) {
        generateSitemap(renderedLinksGroups);
      }
    });
  });
};

render();
