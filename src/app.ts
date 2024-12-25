import * as express from 'express';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import walletRoutes from './routes/wallet.routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import * as cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/wallet', walletRoutes);

app.use(errorHandler);

export default app;
