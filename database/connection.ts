import mongoose from "mongoose";

const MONGODBCS =process.env.MONGODB_CS 

if(!MONGODBCS){
    throw new Error('No MongoDB connection string found')
}
const dbConnect = async()=>{
  if(mongoose.connection.readyState === 1){
    console.log('Database already connected')
    return  // already connected to the database
  }
    try{
      await  mongoose.connect(MONGODBCS)
      console.log("Database connection established")
    }catch(error){
      console.error('Error while connecting to MongoDB....',error)
      process.exit(1)
    }
}
export default dbConnect