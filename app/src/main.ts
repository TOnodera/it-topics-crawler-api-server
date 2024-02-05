import { app } from './app';

app.listen(process.env.SERVICE_PORT, () => {
  console.log('server started ...');
});
