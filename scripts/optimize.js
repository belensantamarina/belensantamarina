const shell = require('shelljs');

const { PICTURE_SIZES } = require('./utils/constants');

const optimize = async () => {
  shell.exec(
    'git diff-tree --no-commit-id --summary -r $GITHUB_SHA',
    (code, stdout, stderr) => {
      if (code != 0 || stderr) return;

      const modifiedMedia = stdout.split('\n')[0].split(' ');
      const modifiedMediaInfo = {
        action: modifiedMedia[1],
        path: modifiedMedia[4],
        name: modifiedMedia[4].split('/').pop().split('.').shift(),
      };

      console.log(`Processing ${modifiedMediaInfo.path}`);

      for (let pictureSize of Object.keys(PICTURE_SIZES)) {
        for (let resolution of PICTURE_SIZES[pictureSize]) {
          const destinationPath = `static/media/${pictureSize}/${modifiedMediaInfo.name}${resolution.tag}.jpg`;

          if (modifiedMediaInfo.action === 'delete') {
            console.log(`- Deleting ${destinationPath}`);
            shell.exec(`rm -f ${destinationPath}`);
          } else {
            console.log(`- Creating ${destinationPath}`);
            shell.exec(
              `convert -strip -resize x${resolution.size}^ -quality 80 -density ${resolution.density} -sampling-factor 4:2:0 -colorspace sRGB -interlace JPEG ${modifiedMediaInfo.path} ${destinationPath}`
            );
          }
        }
      }
    }
  );
};

optimize();
