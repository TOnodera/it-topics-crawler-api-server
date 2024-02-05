import { app } from './app';
import { appPort } from './config';

app.listen(appPort, () => {
  console.log('server started ...');
});
