import Express from 'express';
import helmet from 'helmet';
import { privateRouter } from './routers/private';
import { errorHandler } from './errorHandler';

const app = Express();
const port = 3000;
// セキュリティ対策
app.use(helmet());
// ルータ設定
app.use('api.private', privateRouter);
// エラーハンドラー
app.use(errorHandler);
// 起動
app.listen(port, () => {
  console.log('server started ...');
});
