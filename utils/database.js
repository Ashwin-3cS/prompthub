import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true) //setting it to true to avoid warnings

    if(isConnected){
        console.log("mongo db is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        isConnected = true;
        console.log('MongoDb connected');
    } catch (error) {
        console.log(error)
    }
}