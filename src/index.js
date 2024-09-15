import express from 'express';
import {PORT} from './config/config.js';
import morgan from 'morgan';
import  userRotes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import imagesRutes from './routes/images.routes.js';
import { validateCORS } from './middlewares/middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(validateCORS)

app.use('/api/users', userRotes)
app.use('/api/auth', authRoutes)
app.use('/api/images', imagesRutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))