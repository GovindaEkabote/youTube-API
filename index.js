const express= require('express');
const connectDB = require('./config/dbConfig');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
connectDB()

const userRegister = require('./Routes/user.routes');
app.use('/api/v1', userRegister);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);  
})