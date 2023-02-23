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

// const mongoose = require('mongoose');
// // Replace <dbuser>, <dbpassword>, <dbname>, and <cluster> with your own database information 
// const uri = "mongodb+srv://bansalakash160:vo6mA9OPyVwrRTPz@cluster0.5p59uek.mongodb.net/mycontacts-backend?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection; 
// db.on('error', console.error.bind(console, 'connection error:')); 
// db.once('open', function () { console.log('Connected to MongoDB database'); });

// module.exports = db;