const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dontenv = require('dotenv');
dontenv.config();

app.use(cors({
    origin: ['http://localhost:5174','https://nann-mudhalvan-cl4dmw64h-shriharitechs-projects.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
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