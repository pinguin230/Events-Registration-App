// @ts-ignore
import express from 'express';
import mongoose from 'mongoose';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import dotenv from 'dotenv';
import eventRoutes from './routes/events';
import registrationRoutes from './routes/registrations';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://admin:GdGlPlqXGhEuM1234!@events-registration-app.ai1eojj.mongodb.net/?retryWrites=true&w=majority&appName=Events-Registration-App",)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});