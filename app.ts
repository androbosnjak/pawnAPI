import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import pawnRoutes from './src/pawn/pawn';
import * as swaggerDocument from './swagger.json';
import { seed } from './prisma/seed';

export const app: Application = express();

//seed database with placeholder users
seed();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/pawn', pawnRoutes);

app.listen(3000, () => console.log('API is running on port 3000'));
