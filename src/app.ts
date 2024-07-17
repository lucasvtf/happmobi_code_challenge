import express from 'express';
import 'express-async-errors';
import userRoutes from './routers/UserRoutes';
import vehicleRoutes from './routers/VehicleRoutes';
import reservationRoutes from './routers/ReservationRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(vehicleRoutes);
app.use(reservationRoutes);

app.use(errorMiddleware);

export default app;
