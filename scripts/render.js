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
const { readWebpSize } = require('./utils/imageSize');

const showdownConverter = new showdown.Converter();

const renderLanguage = async ({
  language,
  index,
  social,
  about,
  route,
  link,
  abbreviation,
}) => {
  const renderedLinks = [];

  const parseGalleryItem = (galleryItem, galleryItemIndex) => {
    const fileName = galleryItem.file.split('.')[0];
    const sourceSet = IMAGE_RESOLUTIONS.map(({ tag }) =>
      tag
        ? `/media/${fileName}${tag}.webp ${tag.replace('@', '')}`
        : `/media/${fileName}.webp`,
    );
    const imageSize = readWebpSize(`static${sourceSet[0]}`);
    if (!imageSize) {
      console.warn(`Could not read image size of ${sourceSet[0]}`);
    }
    let galleryItemResult = {
      source_set: sourceSet,
      source: sourceSet[0],
      description: galleryItem.description,
      width: imageSize ? imageSize.width : '',
      height: imageSize ? imageSize.height : '',
      loading: galleryItemIndex === 0 ? 'eager' : 'lazy',
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
    true,
  );

  const navItems = websiteConstants.menu.map(parseMenuItem);

  const websiteFooter = showdownConverter.makeHtml(websiteConstants.footer);
  const otherLanguages = LANGUAGES.filter(
    (otherLanguage) => otherLanguage.language !== language,
  ).map((otherLanguage) => ({
    i18n_string: otherLanguage.link,
    language: otherLanguage.code,
    abbr: otherLanguage.abbreviation,
    index: otherLanguage.index,
  }));

  const websiteData = {
    language: websiteConstants.language,
    title: websiteConstants.title,
    html_title: websiteConstants.title,
    footer: websiteFooter,
    description: websiteConstants.description,
    nav_items: navItems,
    i18n_string_menu: websiteConstants.i18n_string_menu,
    i18n_string_social: websiteConstants.i18n_string_social,
    i18n_string_social_action: websiteConstants.i18n_string_social_action,
    i18n_string_about: websiteConstants.i18n_string_about,
    i18n_string_contact: websiteConstants.i18n_string_contact,
    i18n_string_contact_copied: websiteConstants.i18n_string_contact_copied,
    about: websiteConstants.about,
    i18n_string_current_language: link,
    current_language_abbr: abbreviation,
    current_language_index: index,
    current_language_social: social,
    current_language_about: about,
    other_languages: otherLanguages,
    meta_url: `${DOMAIN}${index}`,
  };

  let workFiles = await readDirectory(`content/${route}`);
  await prepareDirectory(`build/${route}`);
  for (let fileName of workFiles) {
    let pageConstants = await readFile(`content/${route}/${fileName}`, true);

    const galleryItems = pageConstants.gallery
      ? pageConstants.gallery.map(parseGalleryItem)
      : [];

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
      meta_url: `${DOMAIN}${pagePath}`,
      meta_image:
        galleryItems.length > 0 ? `${DOMAIN}${galleryItems[0].source}` : '',
      plugin_form: pageConstants.plugin === 'form',
    };

    const pageOutput = mustache.render(baseTemplate, pageData);
    await writeFile(`build${pagePath}`, pageOutput);

    renderedLinks.push({
      url: pagePath,
      changefreq: 'yearly',
      priority: 0.75,
    });
  }

  ////
  // SOCIAL
  ////

  const socialData = {
    ...websiteData,
    html_title: `${websiteData.title}: ${websiteData.i18n_string_social}`,
    social: true,
    meta_url: `${DOMAIN}${social}`,
  };

  const socialOutput = mustache.render(baseTemplate, socialData);
  await writeFile(`build${social}`, socialOutput);

  renderedLinks.push({
    url: social,
    changefreq: 'always',
    priority: 0.5,
  });

  ////
  // ABOUT
  ////

  const aboutBody = showdownConverter.makeHtml(websiteData.about);
  const aboutData = {
    ...websiteData,
    html_title: `${websiteData.i18n_string_about} ${websiteData.title}`,
    description: `${websiteData.i18n_string_about} ${websiteConstants.description}`,
    meta_url: `${DOMAIN}${about}`,
    name: websiteData.i18n_string_about,
    body: aboutBody,
  };

  const aboutOutput = mustache.render(baseTemplate, aboutData);
  await writeFile(`build${about}`, aboutOutput);

  renderedLinks.push({
    url: about,
    changefreq: 'yearly',
    priority: 0.95,
  });

  ////
  // HOMEPAGE
  ////

  const homeImage = websiteConstants.image
    ? parseGalleryItem(websiteConstants.image, 0)
    : null;

  const homeData = {
    ...websiteData,
    gallery: Boolean(homeImage),
    gallery_items: homeImage ? [homeImage] : [],
    meta_image: homeImage ? `${DOMAIN}${homeImage.source}` : '',
    hidden_body: aboutBody,
  };

  const homeOutput = mustache.render(baseTemplate, homeData);
  await writeFile(`build${index}`, homeOutput);

  renderedLinks.push({
    url: index,
    changefreq: 'monthly',
    priority: 1,
  });

  return renderedLinks;
};

const generateSitemap = async (renderedLinksGroups) => {
  const renderedLinks = renderedLinksGroups
    .flat()
    .sort((a, b) => b.priority - a.priority);
  const stream = new SitemapStream({ hostname: DOMAIN });
  const data = await streamToPromise(Readable.from(renderedLinks).pipe(stream));
  await writeFile('build/sitemap.xml', data.toString());
};

const render = async () => {
  const renderedLinksGroups = await Promise.all(LANGUAGES.map(renderLanguage));
  await generateSitemap(renderedLinksGroups);
};

render().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
