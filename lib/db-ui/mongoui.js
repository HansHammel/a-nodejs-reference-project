import mongoExpress from 'mongo-express/lib/middleware';
import mongoExpressConfig from './mongo_express_config';
import express from 'express';
let app = express();
app.use('/mongoexpress', mongoExpress(mongoExpressConfig));
app.listen();
