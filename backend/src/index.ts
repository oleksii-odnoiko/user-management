import dotenv from 'dotenv';
import app from './app';
import { logger } from './utils';

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.log('info', `App listening on port ${port}!`);
});
