import express, { Response } from 'express';
import images from './api/image.route';

const routes = express.Router();

routes.get('/', (_, res: Response) => {
  res.send('Connected!');
});
routes.use('/images', images);

export default routes;
