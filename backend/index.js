const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const corsOption = {
    origin: [
        'https://nann-mudhalvan-gov.vercel.app/',
        'https://nann-mudhalvan-kgm.vercel.app',
        'http://localhost:5174',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors(corsOption));

app.use(bodyParser.json());

app.options('*', cors(corsOption));

app.listen(port,()=>{
    console.log(`Backend is running on http://localhost:${port}`);
})
const user = require('./Routes/User');
app.use('/user',user);

const task = require('./Routes/Task');
app.use('/task',task);


app.get('/',(req,res)=>{
    res.send('Hello World');   
})

mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
    console.log("Connected to Database");
})