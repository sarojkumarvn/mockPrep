import mongoose from "mongoose"

import {ENV} from "./env.js"

  const connectDB = async ()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined!")
        }
        const conn = await mongoose.connect(ENV.DB_URL);


    }
    catch(err) {
        // console.error(err);
        process.exit(1);

    }
}

export default connectDB
