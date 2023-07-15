const express = require("express");
const dotenv = require("dotenv");
const mongoose =require("mongoose");
const schema = require("./graphql/schema");
const {graphqlHTTP} = require("express-graphql");

const app = express();
dotenv.config({path:`${__dirname}/config.env`});


app.use("/graphql",new graphqlHTTP({
    schema,
    graphiql:true   
}))


mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    family:4
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connection successfully");
    });
    console.log("connection to database");
  }).catch(err=> console.log(err));

