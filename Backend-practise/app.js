const dotenv= require('dotenv').config()
const express= require('express')
const app= express();
const userRoutes= require('./userRoutes')


const connectDB= require('./db')
connectDB();

const cors= require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))   



app.use('/user',userRoutes)

app.get('/',(req,res)=>{
    res.send("hello")
})

module.exports=app