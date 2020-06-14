const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//so that we can have environment varial in .env file
require('dotenv').config();
//create a expres server
const app = express();
const port = process.env.PORT || 5000;//port of the server
//cors middleware
app.use(cors());
//our server is going to send or receive json files so the line below will help to parse json
app.use(express.json());
//connect to mongo db...here the uri will be taken from the mongo db atlas dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }// MongoClient constructor.
);
//useNewUrlParser: true:- it is a flag,mongodb node js driver rewrote the tool that prse mongodb connection strings,just becoz this is a big change,they put the new connnection string parser behind a flag.
//useCreateIndex: true:- it is a flag,it is used with the mongodb,dericating the index fxn
//useUnifiedTopology: true :- To use the new Server Discover and Monitoring engine
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
//tell the server to use the router
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const signupsRouter = require('./routes/signups');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/signups', signupsRouter);
//this is going to start our server (listen to constant port which is having vaue 5000 stored in it)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
