import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import urlshort_route from './routes/urlshort_route.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose connect
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', urlshort_route);

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));