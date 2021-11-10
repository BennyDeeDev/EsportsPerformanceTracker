import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import Sentry from '@sentry/serverless';
import { checkJwt } from './middleware/auth';
import matches from './routes/valorant/matches';
import notes from './routes/valorant/notes';
import rank from './routes/valorant/rank';
import journal from './routes/journal';
import { startMongoDb } from './config/db';

const app = express();
const port = 3123;

startMongoDb();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(checkJwt); */

app.use('/api/valorant/matches', matches);
app.use('/api/valorant/notes', notes);
app.use('/api/valorant/rank', rank);
app.use('/api/journal', journal);
app.listen(port, () => console.log(`REST API on http://localhost:${port}/api`));
