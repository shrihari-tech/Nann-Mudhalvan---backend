const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dontenv = require('dotenv');
dontenv.config();


app.use(cors());
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