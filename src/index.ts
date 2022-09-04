import express from 'express';

import routes from './routes';
const app: express.Application = express();
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const port: number = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

export default app;
