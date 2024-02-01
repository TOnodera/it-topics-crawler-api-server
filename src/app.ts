import Express from 'express';
import helmet from 'helmet';
import { privateRouter } from './routers/private';
import { errorHandler } from './errorHandler';
import bodyParser from 'body-parser';

export const app = Express();

// セキュリティ対策
app.use(helmet());
// JSONを扱えるようにする
app.use(bodyParser.json());
// ルータ設定
app.use('/api-private', privateRouter);
// エラーハンドラー
app.use(errorHandler);
