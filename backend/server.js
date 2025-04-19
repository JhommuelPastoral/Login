import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/authRoutes.js';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';



dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/',router );
app.listen(port, ()=>{

  console.log(`Listening to port  ${port}`);
  connectDb();

});