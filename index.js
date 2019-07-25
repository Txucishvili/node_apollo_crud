import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import Mongoose from './mongoose/mongoose';
import Apollo from "./apollo/apollo";
import * as Schemas from './mongoose/schemas';

// app
const API_PORT = 3001;
const DatabaseURL = "mongodb://txucishvili:tornikee122@ds351455.mlab.com:51455/vobi";

const app = express();
const mongoose = new Mongoose;
const apollo = new Apollo();

// init app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));

// init mongoose
mongoose.init(DatabaseURL);

// init ApolloSet
apollo.init(API_PORT, Schemas);
apollo.server.applyMiddleware({
  app: app
});


// start
app.listen(API_PORT, () => {
  console.log(`🚀 LISTENING ON PORT http://localhost:${API_PORT}`);
});
