const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
} = require("graphql");
const productData = require("../data/productData");
const categories = require("../data/categoryData");

const categoryType = new GraphQLObjectType({
  name: "categoryType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const productType = new GraphQLObjectType({
  name: "productType",
  fields: {
    sold: { type: GraphQLInt },
    ratingsQuantity: { type: GraphQLInt },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLInt },
    imageCover: { type: GraphQLString },
    category: {
      type: categoryType,
      resolve: (parent, args) => {
          console.log(parent);
        return categories.find((item) => item.id == parent.category);
      },
    },
    ratingsAverage: { type: GraphQLFloat },
  },
});



const itiQuery = new GraphQLObjectType({
  name: "itiQuery",
  fields: {
    products: {
      type: new GraphQLList(productType),
      resolve: (parent, args) => {
        return productData;
      },
    },
    product: {
      type: productType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return productData.find((item) => item.id == args.id);
      },
    },
    categories: {
      type: new GraphQLList(categoryType),
      resolve: (parent, args) => {
        return categories;
      },
    },
  },
});

const itiMuatation = new GraphQLObjectType({
    name:'itiMuatation',
    fields:{
        addCategory:{
            type:new GraphQLList(categoryType),
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString}
            },
            resolve:(parent,args)=>{
                categories.push(args);
                return categories
            }
        },
        updateCategory:{
            type:categoryType,
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString}
            },
            resolve:(parent,args)=>{
                const category = categories.find(item => item.id == args.id);
                if(!category){
                    throw new Error("category id was not found")
                }
                category.name = args.name;
                return category;
            }
        },
        deleteCategory:{
            type:categoryType,
            args:{
                id:{type:GraphQLID}
            },
            resolve:(parent,args)=>{
                const categoryIndex = categories.findIndex(
                  (category) => category.id === args.id
                );
                if (categoryIndex === -1) {
                  throw new Error("Category not found");
                }
                const deleteCategory = categories.splice(categoryIndex, 1)[0];
                return deleteCategory;
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: itiQuery,
  mutation: itiMuatation,
});
