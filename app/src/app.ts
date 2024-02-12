import Express, { Response } from 'express';
import helmet from 'helmet';
import { privateRouter } from './routers/private';
import { errorHandler } from './errorHandler';
import bodyParser from 'body-parser';
import { publicRouter } from './routers/public';
import cors from 'cors';
import { corsOptions } from './config';

export const app = Express();

// セキュリティ対策
app.use(helmet());
// CORS
app.use(cors(corsOptions));
// JSONを扱えるようにする
app.use(bodyParser.json({ limit: '10mb' }));
// ルータ設定
app.use('/api-private', privateRouter);
app.use('/', publicRouter);
app.use('*', (_, res: Response) => res.redirect('/'));
// エラーハンドラー
app.use(errorHandler);
