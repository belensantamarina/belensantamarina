const mustache = require('mustache');

const { readDirectory, readFile, writeFile } = require('./utils/filesHandler');

const render = async () => {
  let baseTemplate = await readFile('index.html');
  let websiteConstants = await readFile('content/english_constants.json', true);
  let websiteMenu = await readFile('content/english_menu.json', true);

  const navItems = websiteMenu.items.map((itemString) => ({
    name: itemString.split('|')[0],
    reference: itemString.split('|')[1],
  }));

  templateData = {
    ...websiteConstants,
    nav_items: navItems,
  };

  const templateOutput = mustache.render(baseTemplate, templateData);

  writeFile('build/index.html', templateOutput);
};

render();
