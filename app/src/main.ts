import { app } from './app';
import { apiServicePort } from './config';

app.listen(apiServicePort, () => {
  console.log('server started ...');
});
