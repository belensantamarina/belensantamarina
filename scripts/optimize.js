const shell = require('shelljs');

const { readDirectory } = require('./utils/filesHandler');
const { PICTURE_SIZES, IMAGE_EXTENSIONS } = require('./utils/constants');

const optimizeMedia = (mediaInfo) => {
  console.log(`Processing ${mediaInfo.path}`);

  for (let pictureSize of Object.keys(PICTURE_SIZES)) {
    for (let resolution of PICTURE_SIZES[pictureSize]) {
      const destinationPath = `static/media/${pictureSize}/${mediaInfo.name}${resolution.tag}.jpg`;

      if (mediaInfo.action === 'delete') {
        console.log(`- Deleting ${destinationPath}`);
        shell.exec(`rm -f ${destinationPath}`);
      } else {
        console.log(`- Creating ${destinationPath}`);
        shell.exec(
          `convert -strip -resize x${resolution.size}^ -quality 80 -density ${resolution.density} -sampling-factor 4:2:0 -colorspace sRGB -interlace JPEG ${mediaInfo.path} ${destinationPath}`
        );
      }
    }
  }
};

const optimizeLastCommit = () => {
  shell.exec(
    'git diff-tree --no-commit-id --summary -r $GITHUB_SHA',
    (code, stdout, stderr) => {
      if (code != 0 || stderr) return;

      const modifiedMediaList = stdout
        .split('\n')
        .filter((modifiedMediaItem) =>
          IMAGE_EXTENSIONS.some((imageExtension) =>
            modifiedMediaItem.toLowerCase().includes(imageExtension)
          )
        );
      for (let modifiedMediaItem of modifiedMediaList) {
        const modifiedMedia = modifiedMediaItem.split(' ');
        const modifiedMediaInfo = {
          action: modifiedMedia[1],
          path: modifiedMedia[4],
          name: modifiedMedia[4].split('/').pop().split('.').shift(),
        };

        optimizeMedia(modifiedMediaInfo);
      }
    }
  );
};

const optimizeAll = async () => {
  let mediaFiles = await readDirectory('content/media');
  for (let mediaFile of mediaFiles) {
    const mediaInfo = {
      action: 'update',
      path: `content/media/${mediaFile}`,
      name: mediaFile.split('.').shift(),
    };
    optimizeMedia(mediaInfo);
  }
};

module.exports = { optimizeLastCommit, optimizeAll };
