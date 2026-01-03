import mongoose from "mongoose"

import {ENV} from "./env.js"

  const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(ENV.DB_URL);
        // console.log("Connected to" , conn);


    }
    catch(err) {
        // console.error(err);
        process.exit(1);

    }
}

export default connectDB
