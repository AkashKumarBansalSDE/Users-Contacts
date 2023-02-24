const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log("Database connected:",connect.connection.host,connect.connection.name);
    }catch(err){
        console.log("error: ", err); 
        process.exit(1);
    }
};

module.exports = connectDb;  
