const fs = require('fs');

// Reads width and height from a WebP header (VP8, VP8L or VP8X)
const readWebpSize = (filePath) => {
  const fullFilePath = `${process.cwd()}/${filePath}`;
  let header;
  try {
    const fileDescriptor = fs.openSync(fullFilePath, 'r');
    header = Buffer.alloc(30);
    fs.readSync(fileDescriptor, header, 0, 30, 0);
    fs.closeSync(fileDescriptor);
  } catch (fileError) {
    return null;
  }

  if (
    header.toString('ascii', 0, 4) !== 'RIFF' ||
    header.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null;
  }

  switch (header.toString('ascii', 12, 16)) {
    case 'VP8 ':
      return {
        width: header.readUInt16LE(26) & 0x3fff,
        height: header.readUInt16LE(28) & 0x3fff,
      };
    case 'VP8L': {
      const bits = header.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    case 'VP8X':
      return {
        width: header.readUIntLE(24, 3) + 1,
        height: header.readUIntLE(27, 3) + 1,
      };
    default:
      return null;
  }
};

module.exports = { readWebpSize };
