import express from "express"
import dotenv from 'dotenv'
import dataBaseConnection from "./DataBase/databaseConnect.js";
import userAuthRout from './Routs/userAuthRoute.js';
import shoeRout from './Routs/shoeRout.js'
import bidRout from './Routs/bidRout.js'
import categoryRout from './Routs/categoryRout.js'
import cookieParser from "cookie-parser";
import path from 'path'

;
const __dirname = path.resolve()
const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json())



app.use('/api/auth',userAuthRout)
app.use('/api/shoe',shoeRout)
app.use('/api/bid',bidRout)
app.use('/api/category',categoryRout)

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})





const PORT = process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`Server is Working At ${PORT}`);
    dataBaseConnection()
})