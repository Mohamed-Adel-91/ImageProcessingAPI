import express, { Router } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import resizedImage from '../../middleware/resized';
import imagesData from '../../utilities/imageData';

const images_routes: Router = express.Router();

images_routes.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try{
    const filename: string = req.query.filename as string;
    const images: boolean = imagesData.includes(filename as string);
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);
    const resizedPath: string = path.resolve(__dirname, `../../../assets/resizedPath`);
    const fullImagePath: string = path.resolve(
      __dirname,
      `../../../assets/images/${filename}.jpg`
    );
    const resizedImagePath: string = path.resolve(
      __dirname,
      `../../../assets/resizedPath/${filename}-${width}x${height}.jpg`
    );
  
    if (!resizedPath ) {
      await fs.mkdir('resizedPath', resizedPath);
    }
  
    // If the query wasn't provided return and end function
    if (!filename || !width || !height) {
       res
        .status(400)
        .send(
          'Bad request, Please fill query parameter (filename, width, height)'
        );
        return;
    }
    if (filename === undefined) {
       res
        .status(400)
        .send('Bad request, query parameter (filename) is required.');
        return;
    }
    if (isNaN(width) || width < 1) {
       res
        .status(400)
        .send(
          'Bad request, query parameter (width) is required in Positive value.'
        );
        return;
    }
    if (isNaN(height) || height < 1) {
        res
        .status(400)
        .send(
          'Bad request, query parameter (height) is required in Positive value.'
        );
        return;
    }
    if (images === false) {
       res
        .status(404)
        .send('Resource not found, this image does not exist!');
        return;
    }
    //checking if image is found in the full path or not
    const checkFullPathImage = await fs.stat(fullImagePath).catch(() => {
      res.send(`Error no image found in the assets file`);
      return null;
    });
    if (!checkFullPathImage) {
      return;
    }
    // cashing files
    const fileIsCashed = await fs.stat(resizedImagePath).catch(() => {
      return null;
    });
    if (fileIsCashed) {
      fs.readFile(resizedImagePath)
        .then((resizedImage: Buffer) => {
          res.status(200).contentType('jpg').send(resizedImage);
        })
        .catch(() => {
          res.send('Error, what do you do ? :o');
        });
    } else {
      resizedImage({
        fullImagePath,
        resizedImagePath,
        width,
        height,
      })
        .then((resizedImage: Buffer) => {
          res.status(200).contentType('jpg').send(resizedImage);
        })
        .catch(() => {
          res.send(alert('Error when resized image'));
        });
    }}catch(Error){
      res.send(Error)
    }
});

export default images_routes;
