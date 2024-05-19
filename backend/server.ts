// @ts-ignore
import express from 'express';
import mongoose from 'mongoose';
// @ts-ignore
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://admin:GdGlPlqXGhEuM1234!@events-registration-app.ai1eojj.mongodb.net/?retryWrites=true&w=majority&appName=Events-Registration-App",)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});