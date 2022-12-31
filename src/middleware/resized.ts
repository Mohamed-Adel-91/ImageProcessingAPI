import { promises as fs } from 'fs';
import sharp from 'sharp';

interface resizeImage {
  fullImagePath: string;
  resizedImagePath: string;
  width: number;
  height: number;
}

const resizedImage = async ({
  fullImagePath,
  resizedImagePath,
  width,
  height,
}: resizeImage) => {
  const files = await fs.readFile(fullImagePath).catch(() => {
    return;
  });
  if (!files) {
    return Promise.reject();
  }
  // sharp function
  const imgResize = await sharp(files)
    .resize(width, height, { fit: 'contain' })
    .toBuffer()
    .catch(() => {
      null;
    });
  if (!imgResize) {
    return Promise.reject();
  }
  return fs
    .writeFile(resizedImagePath, imgResize)
    .then(() => {
      return imgResize;
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default resizedImage;
