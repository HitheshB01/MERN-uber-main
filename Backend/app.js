const dotenv= require('dotenv').config()
const express= require('express')
const app= express();
const userRoutes= require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');

const cookieParser= require('cookie-parser')

const cors= require('cors')
app.use(cors())

const connectDB= require('./db/db')
connectDB();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRoutes)
app.use('/captains', captainRoutes);



app.get('/',(req,res)=>{
    res.send("hello")
})

module.exports=app

