import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import errorMiddleware from './middleware/error.middleware';
import routes from './routes';
import resizedImage from './middleware/resized';
import images_routes from './routes/api/imagesProcessing';
import logger from './utilities/logger';

// application object instance using express
const app: Application = express();

// specify port
const port = 3000;

// app uses the image routes
app.use(routes);
app.use(images_routes);
app.use(resizedImage);
app.use(express.json());
app.use(morgan('common'));
app.use(errorMiddleware);
app.use(logger);

// listen to port
//start server
app.listen(port, async (): Promise<void> => {
  const resizedPath: string = path.resolve(__dirname, `../assets/resizedPath`);
  if (!fs.existsSync(resizedPath)) {
    fs.mkdir(resizedPath, (err) => {
      if (err) throw err;
    });
  }
  await resizedImage;
  console.log(`server is starting at http://localhost:${port}`);
});

export default app;
