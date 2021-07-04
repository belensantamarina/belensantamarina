const shell = require('shelljs');

const TARGET_SIZES = ['1280', '640', '320'];

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

      if (modifiedMediaInfo.action === 'delete') {
        for (let targetSize of TARGET_SIZES) {
          const optimizedFilePath = `static/media/${targetSize}/${modifiedMediaInfo.name}.jpg`;
          console.log(`- Deleting ${optimizedFilePath}`);
          shell.exec(`rm -f ${optimizedFilePath}`);
        }
      } else {
        for (let targetSize of TARGET_SIZES) {
          const optimizedFilePath = `static/media/${targetSize}/${modifiedMediaInfo.name}.jpg`;
          console.log(`- Creating ${optimizedFilePath}`);
          shell.exec(
            `convert -strip -resize x${targetSize}^ -quality 80 -density 72 -sampling-factor 4:2:0 -colorspace sRGB -interlace JPEG ${modifiedMediaInfo.path} ${optimizedFilePath}`
          );
        }
      }
    }
  );
};

optimize();
