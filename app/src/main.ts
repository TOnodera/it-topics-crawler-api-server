import { app } from './app';

app.listen(process.env.API_SERVICE_PORT, () => {
  console.log('server started ...');
});
