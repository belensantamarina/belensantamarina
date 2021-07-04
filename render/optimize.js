const shell = require('shelljs');

const TARGET_SIZES = ['1280', '640', '320'];

const optimize = async () => {
  shell.exec(
    'git diff-tree --no-commit-id --name-only -r $GITHUB_SHA| xargs',
    (code, stdout, stderr) => {
      if (code != 0 || stderr) return;

      const modifiedMediaFiles = stdout
        .split('\n')
        .filter((filePath) => filePath.includes('content/media')); // Filtering only the modified media files

      console.log(modifiedMediaFiles);

      for (let modifiedMediaFile of modifiedMediaFiles) {
        console.log(`Processing ${modifiedMediaFile}`);
        const modifiedMediaFileName = modifiedMediaFile
          .split('/')
          .pop()
          .split('.')
          .shift(); // Getting the file name without the extension
        for (let targetSize of TARGET_SIZES) {
          console.log(
            `- static/media/${targetSize}/${modifiedMediaFileName}.jpg`
          );
          shell.exec(
            `convert -strip -resize x${targetSize}^ -quality 80 -density 72 -sampling-factor 4:2:0 -colorspace sRGB -interlace JPEG ${modifiedMediaFile} static/media/${targetSize}/${modifiedMediaFileName}.jpg`
          );
        }
      }
    }
  );
};

optimize();
