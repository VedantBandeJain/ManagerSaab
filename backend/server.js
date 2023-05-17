const express=require('express')
const dotenv=require('dotenv').config();
const errorHandler=require('./middlewares/errorHandler')
const dbConnection=require('./config/dbConnection');

const app=express();

const port=process.env.PORT || 5000 ;

dbConnection();
app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use('/api/users',require('./routes/userRoutes'));

app.listen(port,()=>{
    console.log("Server is running on port : " +port)
})
app.use(errorHandler);