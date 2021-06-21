const fs = require('fs');

const readDirectory = (directoryPath) =>
  new Promise((resolve, reject) => {
    const fullDirectoryPath = `${process.cwd()}/${directoryPath}`;
    fs.readdir(fullDirectoryPath, (directoryError, directoryFiles) => {
      if (directoryError) {
        reject(new ReferenceError(`Directory not found on ${fullDirectoryPath}`));
      }
      resolve(directoryFiles);
    });
  });

const readFile = (filePath, parseFile = false) =>
  new Promise((resolve, reject) => {
    const fullFilePath = `${process.cwd()}/${filePath}`;
    fs.readFile(fullFilePath, 'utf8', (fileError, fileData) => {
      if (fileError) {
        reject(new ReferenceError(`File not found on ${fullFilePath}`));
      }
      if (parseFile) {
        try {
          const parseData = JSON.parse(fileData);
          resolve(parseData);
        } catch (parseError) {
          reject(new SyntaxError(`Wrong syntax on ${fullFilePath}`));
        }
      }
      resolve(fileData);
    });
  });

const writeFile = (filePath, fileContent) =>
  new Promise((resolve, reject) => {
    const fullFilePath = `${process.cwd()}/${filePath}`;
    fs.writeFile(fullFilePath, fileContent, (fileError) => {
      if (fileError) {
        reject(new Error(`Could not write on ${fullFilePath}`));
      }
      resolve();
    });
  });

module.exports = { readDirectory, readFile, writeFile };
