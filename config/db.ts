import mongoose from 'mongoose';
require('dotenv').config()

const DB = process.env.DB_PROD


mongoose.connect(DB as string, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
});

export const startMongoDb = () => {
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function () {
      console.log('connected');
   });
};
