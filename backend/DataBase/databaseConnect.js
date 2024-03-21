import mongoose from "mongoose";

const dataBaseConnection=async()=>{
    try {
        mongoose.connect(process.env.MONGOOSEDBURL),
        console.log("DataBase Connected Succesfully");
    } catch (error) {
        console.log(`Error while DataBase Connection ${error}`);
    }
}

export default dataBaseConnection