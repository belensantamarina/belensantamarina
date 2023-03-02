const shell = require('shelljs');

const { readDirectory } = require('./utils/filesHandler');
const { IMAGE_RESOLUTIONS } = require('./utils/constants');

const optimiseMedia = (mediaInfo) => {
  console.log(`Processing ${mediaInfo.path}`);

  for (let imageResolution of IMAGE_RESOLUTIONS) {
    const destinationPath = `static/media/${mediaInfo.name}${imageResolution.tag}.webp`;

    if (mediaInfo.action === 'delete') {
      console.log(`- Deleting ${destinationPath}`);
      shell.exec(`rm -f ${destinationPath}`);
    } else {
      console.log(`- Creating ${destinationPath}`);
      shell.exec(
        `convert -strip -resize ${imageResolution.width}x${imageResolution.height} -quality 80 -density ${imageResolution.density} -sampling-factor 4:2:0 -colorspace sRGB -interlace JPEG -define webp:lossless=false ${mediaInfo.path} ${destinationPath}`
      );
    }
  }
};

const optimiseLastCommit = () => {
  shell.exec(
    'git diff-tree --no-commit-id --summary -r $GITHUB_SHA',
    (code, stdout, stderr) => {
      if (code != 0 || stderr) return;

      const modifiedMediaList = stdout
        .split('\n')
        .filter((modifiedMediaItem) =>
          modifiedMediaItem.toLowerCase().includes('.jpg')
        );
      for (let modifiedMediaItem of modifiedMediaList) {
        const modifiedMedia = modifiedMediaItem.split(' ');
        const modifiedMediaInfo = {
          action: modifiedMedia[1],
          path: modifiedMedia[4],
          name: modifiedMedia[4].split('/').pop().split('.').shift(),
        };

        optimiseMedia(modifiedMediaInfo);
      }
    }
  );
};

const optimiseAll = async () => {
  let mediaFiles = await readDirectory('content/media');
  for (let mediaFile of mediaFiles) {
    const mediaInfo = {
      action: 'update',
      path: `content/media/${mediaFile}`,
      name: mediaFile.split('.').shift(),
    };
    optimiseMedia(mediaInfo);
  }
};

module.exports = { optimiseLastCommit, optimiseAll };
