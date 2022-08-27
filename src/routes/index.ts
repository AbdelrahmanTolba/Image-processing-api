import express, { Response } from 'express';
import images from './api/image.route';

const routes = express.Router();

routes.get('/', (_, res: Response) => {
  res.status(200).send('<h1>Connected!</h1>');
});
routes.use('/images', images);
routes.all('*', (_, res) => {
  res.redirect('/images');
});
export default routes;
