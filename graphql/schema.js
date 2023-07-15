const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");


const itiQuery = new GraphQLObjectType({
    name: "itiQuery",
    fields: {
        hello:{
            type:GraphQLString,
            resolve:(parent,args)=>{
                return "hello world"
            }            
        }
    }
});

module.exports = new GraphQLSchema({
    query:itiQuery
})