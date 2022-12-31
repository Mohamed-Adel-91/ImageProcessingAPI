import express from 'express';
import images_routes from './api/imagesProcessing';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to Image Processing API');
});

routes.use('/image', images_routes);

export default routes;
