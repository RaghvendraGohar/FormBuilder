import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv"
import formRoutes from './routes/formRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/forms', formRoutes);

export default app;
