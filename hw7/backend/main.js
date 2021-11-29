const express = require('express');
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import scoreCardRoute from './routes/index';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use('/api', scoreCardRoute);

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true}, ()=> console.log('connect to DB!')
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is up on port ${PORT}`);
});