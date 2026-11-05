const graphql = require('graphql');
const Todo = require('../models/Todo');
const User = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

//Schema defines data on the Graph like object types(todo type), relation between
//these object types and descibes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    user: { type: GraphQLString },
  }),
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all users, get all todos, get a particular todo
//or get a particular user.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todo: {
      type: TodoType,
      //argument passed by the user while making the query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Here we define how to get data from database source

        //this will return the book with id passed in argument by the user
        return Todo.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find({});
      },
    },
  },
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
  query: RootQuery,
});
