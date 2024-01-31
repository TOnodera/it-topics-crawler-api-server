import Express from 'express';
import helmet from 'helmet';
import { privateRouter } from './routers/private';
import { errorHandler } from './errorHandler';

export const app = Express();

// セキュリティ対策
app.use(helmet());
// ルータ設定
app.use('api.private', privateRouter);
// エラーハンドラー
app.use(errorHandler);
